import React from 'react'
import Card from './Card'

const Home = (props) => {
    return (
        <div>
            <div className="home-container">
                <div className="posts-container">
                    {props.posts.map((post) => 
                        <div className="posts-wrapper" key={post.id}>
                            <Card post={post}></Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
