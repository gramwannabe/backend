import AppError from "../helpers/common.exception.js"

const tbl_auth_mst_user = "public.auth_mst_user"

export async function createUser(db_pool, { user_email, user_name, user_password }) {
    const client = await db_pool.connect()
    try {
        const result = await client.query(`
            INSERT INTO ${tbl_auth_mst_user} (user_email, user_name, user_password)
            VALUES ($1, $2, $3) RETURNING *
        `, [user_email, user_name, user_password])
        await client.query('COMMIT')
        return result.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function findUserByEmail(db_pool, { user_email }) {
    const client = await db_pool.connect()
    try {
        const queries = await client.query(`SELECT * FROM ${tbl_auth_mst_user} WHERE user_email=$1`, [user_email])
        return queries.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function findUserByEmailAndPassword(db_pool, { user_email, user_password }) {
    const client = await db_pool.connect()
    try {
        const queries = await client.query(`SELECT * FROM ${tbl_auth_mst_user} WHERE user_email=$1 and user_password=$2`, [user_email, user_password])
        return queries.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function updateProfile(db_pool, { user_fullname, user_bio_profile, user_id }) {
    const client = await db_pool.connect()
    try {
        const queries = await client.query(`
            UPDATE ${tbl_auth_mst_user}
            SET user_fullname = $1, user_bio_profile = $2
            WHERE user_id = $3
            RETURNING *
            `, [user_fullname, user_bio_profile, user_id])
        await client.query('COMMIT')
        return queries.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function getProfileDetail(db_pool, { user_id }) {
    const client = await db_pool.connect()
    try {
        const queries = await client.query(`
            SELECT * FROM ${tbl_auth_mst_user} WHERE user_id = $1
            `, [user_id])
        return queries.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}

export async function updateProfilePicture(db_pool, { user_profile_picture, user_id }) {
    const client = await db_pool.connect()
    try {
        const queries = await client.query(`
            UPDATE ${tbl_auth_mst_user} 
            SET user_profile_picture = $1
            WHERE user_id = $2
            RETURNING *
            `, [user_profile_picture, user_id])
        await client.query('COMMIT')
        return queries.rows[0]
    } catch (error) {
        console.error(error)
        throw new AppError(500, `Database error: ${error.message}`)
    } finally {
        client.release()
    }
}