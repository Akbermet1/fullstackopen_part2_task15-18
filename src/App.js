import React, { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'

const PersonForm = ({handleSubmit, input1_info, input2_info, button_info}) => {

  return(
    <form onSubmit={handleSubmit}>
      <div> {input1_info.text} <input value={input1_info.state} onChange={input1_info.eventHandler} /></div>
      <div> {input2_info.text} <input value={input2_info.state} onChange={input2_info.eventHandler}/></div>
      <div> <button type={button_info.type}> {button_info.text} </button> </div>
    </form>
  )
}

const Filter = ({persons, filterPattern}) => {
  const filtering = (contact) => {
    const contactName = contact.name.toLowerCase()
  
    if(contactName.indexOf(filterPattern.toLowerCase()) !== -1 && filterPattern !== "")
    {
      return true
    }
  }

  const filteredContactList = persons.filter(filtering)
  console.log("filtered: ", filteredContactList)

  return(
    <Contacts persons={filteredContactList}/>
  )
}

const Contacts = ({persons, handleDelete}) => {
  console.log(persons[4])
  return(
    <div>
      {persons.map(person => <p key={person.name}> {person.name} {person.phoneNumb} <button onClick={() => handleDelete(person.id)}> delete </button> </p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newPhoneNumb, setNewPhoneNumb ] = useState('')
  const [filterPattern, setFilterPattern ] = useState('')


  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled', response.data)
      setPersons(response.data) 
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()

    let contact_counter = persons.length + 1
    if(persons.find(person => person.name === newName) === undefined)
    {
      if(contact_counter !== 1)
      {
        contact_counter += 1
      }

      const nameObject = {
        name: newName,
        phoneNumb: newPhoneNumb,
        id: contact_counter
      }
      
      console.log("obj that's added to the persons state", nameObject)

      contactService
        .create(nameObject)
        .then(returnedContact => {
          console.log(`response data: ${returnedContact}`)
          setPersons(persons.concat(returnedContact))
        })
    }
    else
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const contact = persons.find(person => person.name === newName)
        // console.log(contact.name)
        contact['phoneNumb'] = newPhoneNumb
        contactService
          .update(contact.id, contact)
          .then(response => {
            setPersons(persons.map(person => person.id !== contact.id ? person : response.data))
          })
          .catch(error => {
            console.log('error happened when updating the number', error)
          })
      }
    }

    setNewName("")
    setNewPhoneNumb("")
  }

  const removeContact = (id) => {
    if(window.confirm('Do you really want to delete this contact?'))
    {
      contactService
      .remove(id)
      .then(status_code => {
        console.log(`successfully deleted person #${id}`)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.log(`couldn't delete person #${id}`)
      })   
    }
  }

  const handlePhoneNumbChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumb(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterPattern(event.target.value)
  } 

  const input1_details = {
    text: "name:",
    state: newName,
    eventHandler: handleNameChange
  }

  const input2_details = {
    text: "number: ",
    state: newPhoneNumb,
    eventHandler: handlePhoneNumbChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input type="text" value={filterPattern} onChange={handleFilterChange} /></div>
      {/* <Filter persons={persons} filterPattern={filterPattern} /> */}

      <h2> Add a new </h2>
      <PersonForm handleSubmit={addContact} input1_info={input1_details} input2_info={input2_details} button_info={{type: "submit", text: "add"}}/>

      <h2>Numbers</h2>
      <Contacts persons={persons} handleDelete={removeContact}/>
    </div>
  )
}

export default App
