import { LIMIT } from "../helpers/common.constant.js"
import AppError from "../helpers/common.exception.js"

const app_mst_comment = "public.app_mst_comment"

export async function deleteComment(db_pool, { comment_id }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            DELETE FROM ${app_mst_comment} WHERE comment_id = $1
        `, [comment_id])
        return comment_id
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function createComment(db_pool, { user_id, post_id, comment }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            INSERT INTO ${app_mst_comment} (user_id, post_id, comment)
            VALUES ($1, $2, $3) RETURNING comment_id
        `, [user_id, post_id, comment])
        await client.query('COMMIT')
        return result.rows[0].comment_id
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function getComments(db_pool, { post_id,  page = 1 }) {
    const client = await db_pool.connect()
    const offset = (page - 1) * LIMIT;

    try {
        const result = await client.query(`
            SELECT * FROM ${app_mst_comment} as comment
            JOIN public.auth_mst_user as mstuser ON comment.user_id = mstuser.user_id
            WHERE comment.post_id = $1
            ORDER BY comment.created_at ASC
            LIMIT $2 OFFSET $3
        `,[post_id, LIMIT, offset])
        return result.rows
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}