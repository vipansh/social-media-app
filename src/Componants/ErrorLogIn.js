import React from 'react'
import "../styles/Error.css"
export const ErrorLogIn = ({ isError, message }) => {



    return (
        <div className={`msg msg-warning animate slide-in-down ${isError ? "active" : ""}`}>

            {message}
        </div>
    )
}
