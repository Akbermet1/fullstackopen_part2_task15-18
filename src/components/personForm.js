import react from 'react'

const PersonForm = ({handleSubmit, input1_info, input2_info, button_info}) => {

    return(
      <form onSubmit={handleSubmit}>
        <div> {input1_info.text} <input value={input1_info.state} onChange={input1_info.eventHandler} /></div>
        <div> {input2_info.text} <input value={input2_info.state} onChange={input2_info.eventHandler}/></div>
        <div> <button type={button_info.type}> {button_info.text} </button> </div>
      </form>
    )
}

export default PersonForm