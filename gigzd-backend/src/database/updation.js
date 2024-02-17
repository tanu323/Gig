const { db } = require('./main')


exports.updateData = async (table_name, update_query, condition) => {
    try {
        let query = `update ${table_name} `
        query += update_query ? update_query : '';
        query += condition ? ` where ${condition};` : ';';
        const result = await db.query(query)
        return result;
    } catch (error) {
        throw error;
    }
}