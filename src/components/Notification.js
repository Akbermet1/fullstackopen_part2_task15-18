import React from 'react'

// a notification can be of types: success or fail
const Notification = ({message, notificationColor}) => {
    if (message === null) {
        return null
    }

    notificationColor = notificationColor == null ? 'black': notificationColor

    const notificationStyles = 
    {
        color: notificationColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }


    return(
        <div style={notificationStyles}>
            {message}
        </div>
    )
}

export default Notification