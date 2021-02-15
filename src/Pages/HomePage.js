import React, { useContext } from 'react'
import { EnterPost } from '../Componants/EnterPost';
import { Posts } from '../Componants/Posts';
import { Welcome } from '../Componants/Welcome';
import { AuthContext } from '../Contaxts/AuthContext';
import { LogIn } from './LogIn'

export const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)

    if (currentUser) {

        return (
            <div>
                <Welcome />
                <EnterPost />
                <Posts />
            </div>
        )
    }
    return (
        <div>
            <LogIn />
        </div>
    )
}
