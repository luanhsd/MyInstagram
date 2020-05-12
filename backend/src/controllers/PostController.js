const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
    async index(request, response) {
        const posts = await Post.find().sort('-createdAt')
        return response.json(posts)
    },
    async store(request, response) {
        const { author, place, description, hastags } = request.body;
        const { filename: image } = request.file;

        const [name] = image.split('.')
        const fileName = `${name}.jpg`

        await sharp(request.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(request.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(request.file.path)

        const post = await Post.create({
            author,
            place,
            description,
            hastags,
            image: fileName
        })
        request.io.emit('post', post)
        return response.json(post)
    }
}