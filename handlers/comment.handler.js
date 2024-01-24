import { getValidateTokenData } from "../helpers/common.helper.js";
import { createComment, deleteComment, getComments } from "../models/comment.model.js";

export async function createCommentHandler(req, res) {
    try {
        const { comment } = req.body;
        const { post_id } = req.params
        const { user_id } = await getValidateTokenData(req.headers, this.validateToken)
        const comment_id = await createComment(this.db_pool, { user_id, post_id, comment })
        return res.code(200).send({
            status_code: 200,
            message: 'Comment has been created successfully',
            content: {
                id: comment_id,
                ...req.body
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function getCommentsHandler(req, res) {
    try {
        const { page = 1 } = req.query
        const { post_id } = req.params
        const comments = await getComments(this.db_pool, { post_id,  page: page <= 0 ? 1 : page })
        return res.code(200).send({
            status_code: 200,
            message: 'Comment has been retrieved successfully',
            content: {
                comments
            }
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}

export async function deleteCommentHandler(req, res) {
    try {
        const { comment_id } = req.params
        await deleteComment(this.db_pool, { comment_id })
        return res.code(200).send({
            status_code: 200,
            message: 'Comment has been deleted successfully'
        })
    } catch (error) {
        console.error(error)
        return res.code(error.code ? error.code : 500).send({ status_code: error.code ? error.code : 500, message: error.message ? error.message : 'Internal error!' });
    }
}