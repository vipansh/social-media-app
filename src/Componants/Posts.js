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
        console.log(feed)


    }, []);

    console.log(feed)
    return (
        <div>
            {feed
                ? feed.map((data, index) => <div><InPost data={data} key={index} /> </div>)
                : 'nothing'}
        </div>
    )
}
