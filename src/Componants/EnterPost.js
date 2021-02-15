import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import fireDb from '../Firebase/Fire'

export const EnterPost = () => {
    const { currentUser } = useContext(AuthContext);
    const [post, setPost] = useState()




    const postThis = () => {
        const postRef = fireDb.database().ref("postList").child("allPost");
        postRef.push(post)
        console.log(post)
    }

    return (
        <div>
            <input type="text" value={post} onChange={(e) => { setPost(e.target.value) }} />
            <button onClick={postThis}>post</button>
        </div>
    )
}
