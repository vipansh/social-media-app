import React, { useState, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { firestore } from '../Firebase/Fire';

export const AddComment = ({ id, comments }) => {
    const [commentText, setCommentText] = useState()
    const [commemtArray, setCommemtArray] = useState(comments ? comments : [])
    const { currentUser } = useContext(AuthContext);

    const updateComment = () => {


        let newarray = [...commemtArray, { comment: commentText, user: currentUser.email.replace("@gmail.com", "") }]
        console.log(newarray)
        setCommemtArray(newarray)
        firestore.collection("posts").doc(id).update({
            comments: newarray
        })
    }
    return (
        <div>
            <input type="text" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
            <button onClick={updateComment}>comment</button>
        </div>
    )
}
