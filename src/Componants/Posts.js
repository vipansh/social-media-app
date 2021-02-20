import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { firestore } from '../Firebase/Fire';
import { SinglePost } from './SinglePost';




export const Posts = () => {
    const [feed, setfeed] = useState([])

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        firestore.collection("posts").onSnapshot((snapshot) => {
            let allpost = (snapshot.docs.map(doc => ({
                id: doc.id, post: doc.data()
            })))

            allpost.sort((a, b) => { return b.post.timestamp - a.post.timestamp })

            setfeed(allpost)
        })


    }, []);

    return (

        <div className="feed-main-container">
            {feed
                ? feed.map((data, index) => <div><SinglePost data={data} key={index} /> </div>)
                : 'nothing'}
        </div>
    )
}
