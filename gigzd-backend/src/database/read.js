const { db } = require('./main')


exports.getAllData = async (table_name, condition, join, select) => {
    try {
        let query = select ? `select ${select} from ${table_name} ` : `select * from ${table_name} `
        query += join ? `${join} ` : ' ';
        query += condition ? `where ${condition};` : ';';
        console.log("query: ", query);
        const result = await db.query(query)
        return result.rows;
    } catch (error) {
        throw error;
    }
}

exports.getSpecificData = async (table_name, condition) => {
    try {
        let query = `select * from ${table_name} `
        query += condition ? ` where ${condition};` : ';';
        const result = await db.query(query)
        return result.rows;
    } catch (error) {
        throw error;
    }
}

