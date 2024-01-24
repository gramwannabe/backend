import { getValidateTokenData } from "../helpers/common.helper.js"
import { deletePost, initCreatePost, retrievePostDetail, retrievePosts, retrieveUserPosts, updatePostDescription } from "../models/post.model.js"

export async function createPost(req, res) {

    try {
        const { post_media, post_media_type } = req.body
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const post_id = await initCreatePost(this.db_pool, { user_id, post_media, post_media_type })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been created successfully',
            content: {
                id: post_id
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getPosts(req, res) {

    try {
        const { page = 1 } = req.query
        const posts = await retrievePosts(this.db_pool, { page: page <= 0 ? 1 : page })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been retrieved successfully',
            content: {
                posts
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getPostsMe(req, res) {

    try {
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const { page = 1 } = req.query
        const posts = await retrieveUserPosts(this.db_pool, { page: page <= 0 ? 1 : page, user_id: user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been retrieved successfully',
            content: {
                posts
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getUserPosts(req, res) {

    try {
        const { user_id } = req.params
        const { page = 1 } = req.query
        const posts = await retrieveUserPosts(this.db_pool, { page: page <= 0 ? 1 : page, user_id: user_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been retrieved successfully',
            content: {
                posts
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getPostDetail(req, res) {
    try {
        const { post_id } = req.params
        const post = await retrievePostDetail(this.db_pool, { post_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been retrieved successfully',
            content: {
                post
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function deletePostHandler(req, res) {
    try {
        const { post_id } = req.params
        deletePost(this.db_pool, { post_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been deleted successfully',
            content: {
                post_id
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function putPostDescription(req, res) {
    try {
        const { post_description } = req.body
        const { post_id } = req.params
        const post = await updatePostDescription(this.db_pool, { post_description, post_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Post has been updated successfully',
            content: {
                post
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}