import React from 'react'

const Card = (props) => {
    const post = props.post;
    return (
        <a href={"/"+post.slug}>
            <div className="card-wrapper">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
            </div>
        </a>
    )
}

export default Card
