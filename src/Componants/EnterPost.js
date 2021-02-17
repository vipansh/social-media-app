import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { storage } from '../Firebase/Fire'
import { firestore } from '../Firebase/Fire'
import firebase from 'firebase'

import makeid from './MakeId';

export const EnterPost = () => {
    const { currentUser } = useContext(AuthContext);
    const [caption, setCaption] = useState()
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)



    const postThis = () => {

        let imageName = makeid(10)
        const uploadTask = storage.ref(`images/${imageName}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(imageName)
                    .getDownloadURL()
                    .then(url => {
                        firestore.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            user: currentUser.email,
                            postimgUrl: url,

                        })


                    });
            }
        );
        setCaption(null)
        setImage(null)
    };





    const handelChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }

    }

    return (
        <div className="enter-post-container">
            <label>Write Caption</label>  <input type="text" value={caption} onChange={(e) => { setCaption(e.target.value) }} />
            <input type="file" onChange={handelChange} />
            <button onClick={postThis}>post</button>
            {progress > 0 ? <progress value={progress} max="100" /> : ""}
        </div>
    )
}
