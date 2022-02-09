import react from 'react'
import Contacts from './contacts'

const Filter = ({persons, filterPattern, handleDelete}) => {
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
      <Contacts persons={filteredContactList} handleDelete={handleDelete}/>
    )
}

export default Filter