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
        <div className="u-flex comments-container justify-flex">



            <textarea type="text" class="input  comment-textarea" placeholder="Write a comment" v-model="newItem" value={commentText} onChange={(e) => { setCommentText(e.target.value) }}></textarea>
            <button onClick={updateComment} class='primaryContained' type="submit">Add</button>
        </div >
    )
}
