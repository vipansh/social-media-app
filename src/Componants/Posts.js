import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { firestore } from '../Firebase/Fire';
import { InPost } from './InPost';




export const Posts = () => {
    const [feed, setfeed] = useState([])

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        firestore.collection("posts").onSnapshot((snapshot) => {
            setfeed(snapshot.docs.map(doc => ({
                id: doc.id, post: doc.data()
            })))
        })


    }, []);

    return (

        <div className="feed-main-container">
            {feed
                ? feed.map((data, index) => <div><InPost data={data} key={index} /> </div>)
                : 'nothing'}
        </div>
    )
}
