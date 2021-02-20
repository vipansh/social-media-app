import React from 'react'
import '../styles/Singlepost.css'
import { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../Contaxts/AuthContext';
import { firestore, storage } from '../Firebase/Fire';
import { AddComment } from './AddComment';
import { Comments } from './Comments';
import { MdDelete } from 'react-icons/md';
import { AiOutlineHeart } from "react-icons/ai"
import { FaRegCommentDots } from "react-icons/fa"
import { FcLike } from "react-icons/fc"


export const SinglePost = ({ data }) => {

    const { currentUser } = useContext(AuthContext);
    const [canDelete, setcanDelete] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [hasLiked, setHasLiked] = useState(data.post.like ? data.post.like.includes(currentUser.uid) : false)
    const [alreadyLike, setAlreadyLike] = useState(data.post.like ? data.post.like : [])

    const getFuzzyTime = (nanosec) => {

        var millisec = (nanosec * 1000)

        let res = "";

        const t_second = 1000;
        const t_minute = t_second * 60;
        const t_hour = t_minute * 60;
        const t_day = t_hour * 24;
        const t_week = t_day * 7;
        const t_month = Math.floor(t_day * 30.4);
        const t_year = t_month * 12;

        const now = Date.now();
        const dif = now - millisec;

        const fuzzy_string = (time_ref, time_str) => {
            const fuzzy = Math.floor(dif / time_ref);

            res += `${fuzzy} ${time_str}`;
            if (fuzzy !== 1) res += "s";
            res += " ago";
        };
        if (dif >= t_year) fuzzy_string(t_year, "year");
        else if (dif >= t_month) fuzzy_string(t_month, "month");
        else if (dif >= t_week) fuzzy_string(t_week, "week");
        else if (dif >= t_day) fuzzy_string(t_day, "day");
        else if (dif >= t_hour) fuzzy_string(t_hour, "hour");
        else if (dif >= t_minute) fuzzy_string(t_minute, "minute");
        else if (dif >= t_second) fuzzy_string(t_second, "second");
        else res = "now";

        return res;
    };
    useEffect(() => {
        if (currentUser.email === data.post.user) {
            setcanDelete(true)
        }
        else {
            setcanDelete(false)
        }



    }, [currentUser.email, data])



    const deletePost = () => {
        if (data.post.postimgUrl) {

            let imgRef = storage.refFromURL(data.post.postimgUrl)
            imgRef
                .delete()
                .then(function () {
                    console.log("deletePost")
                })
                .catch(function (error) {
                    console.log(error)

                });

        }
        // delete from storage

        let storageRef = firestore.collection("posts").doc(data.id)

        storageRef.delete()
            .then(() => {
                console.log("deletePost from storage")
            })
            .catch((error) => {
                console.log(error)
            });



    }


    const sendLike = () => {
        setHasLiked(!hasLiked)
        if (hasLiked) {
            let newarray = alreadyLike.filter(data => (data !== currentUser.uid))

            setAlreadyLike(newarray)
            firestore.collection("posts").doc(data.id).update({
                like: newarray
            })
        }

        else {
            let newarray = [...alreadyLike, currentUser.uid]

            setAlreadyLike(newarray)
            firestore.collection("posts").doc(data.id).update({
                like: newarray
            })

        }
    }

    return (
        <div class="common-post">
            <header class="common-post-header u-flex">
                <img src="https://assets.codepen.io/65740/internal/avatars/users/default.png" class="user-image" width="40" height="40" alt="" />
                <div class="common-post-info">
                    <div class="user-and-group u-flex">
                        <span style={{ color: "blue" }}>{data.post.user.replace("@gmail.com", "")} </span>
                    </div>
                    <div class="time-and-privacy">{data.post.timestamp ? getFuzzyTime(data.post.timestamp.seconds) : "now"}<span class="icon icon-privacy">🌎</span></div>
                </div>
                {canDelete ? <span onClick={deletePost} className=" u-margin-inline-start action-dlt-btn" ><MdDelete className="dlt-icon" /></span> : ""}

            </header>

            <div class="common-post-content common-content">
                <p>
                    {data.post.caption ? data.post.caption : ""}
                </p>
                <p>
                    {data.post.postimgUrl ? <img src={data.post.postimgUrl} alt="img" className="post-img" /> : ""}
                </p>

            </div>
            <div class="summary justify-flex u-flex ">
                <div class="u-flex ">
                    {alreadyLike.length > 0 ? <>
                        <div class="reactions">{!hasLiked ? <AiOutlineHeart /> : <FcLike />} </div>
                        <div class="reactions-total">{alreadyLike.length > 0 ? alreadyLike.length : ""}</div>
                    </> : ""}

                </div>
                {data.post.comments && data.post.comments.length > 0 ? <div class="" onClick={() => { setOpenComment(!openComment) }}><FaRegCommentDots /><span>{data.post.comments ? data.post.comments.length : ""}</span></div> : ""}


            </div>

            <section class="actions-buttons">
                <div class="actions-buttons-list u-flex">
                    <button class="reactions actions-button" onClick={() => { sendLike() }}>{!hasLiked ? <AiOutlineHeart /> : <FcLike />} Like</button>
                    <button class="reactions actions-button" onClick={() => { setOpenComment(!openComment) }}><FaRegCommentDots />comments</button>
                </div>
            </section>

            {
                openComment ? <section>
                    <Comments comments={data.post.comments} />
                    <AddComment id={data.id} comments={data.post.comments} setOpenComment={setOpenComment} />
                </section> : ""
            }
        </div >
    )
}
