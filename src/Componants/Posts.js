import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import fireDb from '../Firebase/Fire';




export const Posts = () => {
    const [list, setList] = useState()

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const listRef = fireDb.database().ref('postList').child("allPost");
        listRef.on('value', (snapshot) => {
            const listValues = snapshot.val();

            const listarray = [];
            for (let id in listValues) {

                listarray.push(listValues[id]);
            }
            setList(listarray);
        });


        console.log(list)


    }, []);

    return (
        <div>
            {list
                ? list.map((todo, index) => <div>{todo}</div>)
                : 'nothing'}
        </div>
    )
}
