import React from 'react'

export const Comments = ({ comments  }) => {
    return (
        <div>
            {comments ? comments.map((data) => {
                return (<div>
                    <p>{data.comment}  <span style={{ fontWeight:"500" }}>by-{data.user}</span></p>

                </div>)
            }
            ) : ""}
        </div>
    )
}

