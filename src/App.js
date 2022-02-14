import React, { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'
import Contacts from './components/contacts'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newPhoneNumb, setNewPhoneNumb ] = useState('')
  const [filterPattern, setFilterPattern ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


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
          setNotificationMessage(`Added ${nameObject.name} to phonebook`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    }
    else
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const contact = persons.find(person => person.name === newName)
        contact['phoneNumb'] = newPhoneNumb
        contactService
          .update(contact.id, contact)
          .then(response => {
            console.log("axios' response", response)
            setPersons(persons.map(person => person.id !== contact.id ? person : response))
            setNotificationMessage(`Added ${contact.name} to phonebook`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
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
      <Notification message={notificationMessage} />
      <div>filter shown with: <input type="text" value={filterPattern} onChange={handleFilterChange} /></div>
      <Filter persons={persons} filterPattern={filterPattern} handleDelete={removeContact}/>

      <h2> Add a new </h2>
      <PersonForm handleSubmit={addContact} input1_info={input1_details} input2_info={input2_details} button_info={{type: "submit", text: "add"}}/>

      <h2>Numbers</h2>
      <Contacts persons={persons} handleDelete={removeContact}/>
    </div>
  )
}

export default App
