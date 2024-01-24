import { LIMIT } from "../helpers/common.constant.js"
import AppError from "../helpers/common.exception.js"

const app_mst_post = "public.app_mst_post"

export async function initCreatePost(db_pool, { user_id, post_media_type, post_media }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            INSERT INTO ${app_mst_post} (user_id, post_media_type, post_media)
            VALUES ($1, $2, $3) RETURNING post_id
        `, [user_id, post_media_type, post_media])
        await client.query('COMMIT')
        return result.rows[0].post_id
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function retrievePosts(db_pool, { page = 1 }) {
    const client = await db_pool.connect()
    const offset = (page - 1) * LIMIT;

    try {
        const result = await client.query(`
            SELECT * FROM ${app_mst_post} as post
            JOIN public.auth_mst_user as mstuser ON post.user_id = mstuser.user_id
            ORDER BY post.created_at DESC
            LIMIT $1 OFFSET $2
        `,[LIMIT, offset])
        return result.rows
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function retrieveUserPosts(db_pool, { page = 1, user_id }) {
    const client = await db_pool.connect()
    const offset = (page - 1) * LIMIT;

    try {
        const result = await client.query(`
            SELECT * FROM ${app_mst_post} as post
            JOIN public.auth_mst_user as mstuser ON post.user_id = mstuser.user_id
            WHERE post.user_id = $1
            ORDER BY post.created_at DESC
            LIMIT $2 OFFSET $3
        `,[user_id, LIMIT, offset])
        return result.rows
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function retrievePostDetail(db_pool, { post_id }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            SELECT * FROM ${app_mst_post} WHERE post_id = $1
        `, [post_id])
        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function deletePost(db_pool, { post_id }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            DELETE FROM ${app_mst_post} WHERE post_id = $1
        `, [post_id])
        return post_id
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function updatePostDescription(db_pool, { post_description, post_id }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            UPDATE ${app_mst_post} 
            SET post_description = $1
            WHERE post_id = $2
            RETURNING *
        `, [post_description, post_id])
        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}