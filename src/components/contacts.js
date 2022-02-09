import react from 'react'

const Contacts = ({persons, handleDelete}) => {
    console.log(persons)
    return(
      <div>
        {persons.map(person => <p key={person.name}> {person.name} {person.phoneNumb} <button onClick={() => handleDelete(person.id)}> delete </button> </p>)}
      </div>
    )
}

export default Contacts