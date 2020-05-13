import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css';

function New({ navigation }) {

    const history = useHistory()

    const [post, setPost] = useState({
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    })

    async function handlePost(event) {
        event.preventDefault()
        const data = new FormData()
        data.append('image', post.image)
        data.append('author', post.author)
        data.append('place', post.place)
        data.append('description', post.description)
        data.append('hashtags', post.hashtags)

        await api.post(`posts`, data)
        history.push('/')
    }



    return (
        <form id="new-post" onSubmit={handlePost}>
            <input type="file"
                name="image"
                onChange={e => setPost({ ...post, image: e.target.files[0] })}
            />

            <input
                type="text"
                name="author"
                value={post.author}
                onChange={e => setPost({ ...post, author: e.target.value })}
                placeholder="Autor do post" />

            <input
                type="text"
                name="place"
                value={post.place}
                onChange={e => setPost({ ...post, place: e.target.value })}
                placeholder="Local do post" />

            <input
                type="text"
                name="description"
                value={post.description}
                onChange={e => setPost({ ...post, description: e.target.value })}
                placeholder="Descrição do post" />

            <input
                type="text"
                name="hashtags"
                value={post.hashtags}
                onChange={e => setPost({ ...post, hashtags: e.target.value })}
                placeholder="Hashtags do post" />

            <button type="submit">Enviar</button>
        </form>
    )
}

export default New;