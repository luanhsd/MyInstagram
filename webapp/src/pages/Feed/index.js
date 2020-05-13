import React, { useState, useEffect } from 'react';
import './styles.css';
import io from 'socket.io-client'
import api from '../../services/api'
import more from '../../assets/more.svg'
import like from '../../assets/like.svg'
import comment from '../../assets/comment.svg'
import send from '../../assets/send.svg'

function Feed() {
    const [feed, setFeed] = useState([])

    useEffect(() => {
        api.get(`posts`)
            .then(response => setFeed(response.data))
    }, [])

    useEffect(() => {
        const socket = io(`http://localhost:3001`)
        socket.on('post', post => {
            setFeed([post, ...feed])
        })

        socket.on('like', liked => {
            setFeed(feed.map(post => post._id === liked._id ? liked : post))
        })
    }, [feed])

    function handleLike(id) {
        console.log(id)
        api.post(`posts/${id}/like`)
    }

    return (
        <section id="post-list">
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais" />
                    </header>
                    <img src={`http://localhost:3001/files/${post.image}`} alt="" />

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => handleLike(post._id)}>
                                <img src={like} alt="curtir" />
                            </button>
                            <img src={comment} alt="comentar" />
                            <img src={send} alt="compartilhar" />
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            ))}
        </section>
    )
}

export default Feed;