import React, { useContext, useState } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { storage } from '../Firebase/Fire'
import { firestore } from '../Firebase/Fire'
import firebase from 'firebase'
import { FcCameraIdentification } from 'react-icons/fc';
import { FaPencilAlt } from 'react-icons/fa';


import makeid from './MakeId';
import "../styles/post.css"

export const EnterPost = () => {
    const { currentUser } = useContext(AuthContext);
    const [caption, setCaption] = useState()
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [disableBtn, setDisableBtn] = useState(false)


    const postThis = () => {
        setDisableBtn(true)
        let imageName = makeid(10)

        if (image) {

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
                    setProgress(0)
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

                            setCaption("")
                            setImage(null)
                            setProgress(0)
                            setDisableBtn(false)

                        });
                }
            );
        }
        else {

            firestore.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                user: currentUser.email,

            })

            setCaption("")
            setImage(null)
            setProgress(0)
            setDisableBtn(false)


        }
    };





    const handelChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }

    }

    return (

        <div className="enter-post-container">
            <label className="messageBox-label">Write Caption<FaPencilAlt style={{ marginLeft: "5px" }} /></label>
            <textarea type="text" className="messageBox" value={caption} onChange={(e) => { setCaption(e.target.value) }} />

            {image ? <div className="img-in-post"><img src={URL.createObjectURL(image)} className="img-in-post-img" alt="img" /></div> : ""}
            <div className="custom-file-input">

                <label for="imgfile" className="upload-img-label btn-first">upload Img <span className="upload-img-icon"><FcCameraIdentification className="upload-img-icon" style={{ marginLeft: "5px" }} /></span></label>
                <input id="imgfile" type="file" onChange={handelChange} />
                <button onClick={postThis} className="post-btn btn-first"
                    disabled={disableBtn}
                >{disableBtn ? "posting..." : "post"}</button>
            </div>

        </div>
    )
}
