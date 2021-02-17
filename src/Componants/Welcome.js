import React from 'react'
import { auth } from '../Firebase/Fire'
import { BsFillEyeFill } from 'react-icons/bs';
import { FaBeer } from 'react-icons/fa';


export const Welcome = () => {


    return (


        <div>
            {BsFillEyeFill}
            <h3> Lets go for a <FaBeer />? </h3>
            welcome
            <span onClick={() => auth.signOut()}>Log Out</span>
        </div>
    )
}



