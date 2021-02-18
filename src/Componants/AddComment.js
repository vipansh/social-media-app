import React, { useState, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { firestore } from '../Firebase/Fire';

export const AddComment = ({ id, comments, setOpenComment }) => {
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
        setOpenComment(false)
    }


    
    return (
        <div>
            <input type="text" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
            <button onClick={updateComment} className="btn-primary">comment</button>
        </div>
    )
}
