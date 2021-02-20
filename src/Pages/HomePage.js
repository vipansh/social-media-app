import React, { useContext } from 'react'
import { EnterPost } from '../Componants/EnterPost';
import { Posts } from '../Componants/Posts';
import { SinglePost } from '../Componants/SinglePost';
import { Welcome } from '../Componants/Welcome';
import { AuthContext } from '../Contaxts/AuthContext';
import { LogIn } from './LogIn'

export const HomePage = () => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {

        return (
            <>
                <Welcome />
                <div className="home-container">
                    <div className="post-main-container">
                        <EnterPost />
                        <Posts />
                    </div>
                </div>
            </>
        )
    }
    return (
        <div>
            <LogIn />
        </div>
    )
}
