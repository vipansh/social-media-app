import React from 'react'
import '../styles/welcome.css'

import { auth } from '../Firebase/Fire'
import { FaBeer } from 'react-icons/fa';
import { AuthContext } from '../Contaxts/AuthContext';


export const Welcome = () => {

    const { currentUser } = React.useContext(AuthContext);
    return (


        <div class="header">

            <div> Lets go for a <FaBeer />?

            </div>
            <div className="header-user-card">

                <span>Welcome <span className="header-user"> {currentUser.email.replace("@gmail.com", "")}</span>     </span>
                <span></span>
                <button class="logout" onClick={() => auth.signOut()}>Log Out</button>
            </div>
        </div>
    )
}


