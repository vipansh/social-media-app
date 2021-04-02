import React from 'react'
import '../styles/welcome.css'

import { auth } from '../Firebase/Fire'
import { FaBeer } from 'react-icons/fa';
import { AuthContext } from '../Contaxts/AuthContext';


export const Welcome = () => {

    const { currentUser } = React.useContext(AuthContext);
    return (


        <div className="header">

            <div className="header-container">
                <div className="header-title"> Lets go for a <FaBeer />?</div>
                <div className="header-user-box">

                    <div>  <span>Welcome <div className="header-user"> {currentUser.email.replace("@gmail.com", "")}</div>     </span></div>
                    <div class="logout" onClick={() => auth.signOut()}>Log Out</div>
                </div>
            </div>
        </div>
    )
}


