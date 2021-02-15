import React from 'react'
import { auth } from '../Firebase/Fire'


export const Welcome = () => {


    return (


        <div>

            welcome
            <span onClick={() => auth.signOut()}>Log Out</span>
        </div>
    )
}



