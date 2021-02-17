import React from 'react'

export const Comments = ({ comments }) => {
    console.log(comments)
    return (
        <div>
            {comments ? comments.map((data) => {
                return (<div>
                    <p>{data.comment}  <span>by-{data.user}</span></p>

                </div>)
            }
            ) : ""}
        </div>
    )
}

