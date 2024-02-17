const { db } = require('./main')


exports.removeSpecificData = async (table_name, condition) => {
    try {
        let query = `delete from ${table_name} `
        query += condition ? `where ${condition};` : ';';
        const result = await db.query(query)
        return result.rowCount;
    } catch (error) {
        throw error;
    }
}