export async function healthcheckHandler(req, res) {
    try {
        const client = await this.db_pool.connect()
        await client.query('SELECT 1 as healtcheck')
        return res.code(200).send({ status_code: 200, app: true, db: true });
    } catch (error) {
        console.error(error);
        return res.code(500).send({ status_code: 500, app: false, db: false, message: error.message });
    }
    finally {
        client.release()
    }
}