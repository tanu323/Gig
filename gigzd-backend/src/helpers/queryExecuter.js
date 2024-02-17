const { connection } = require('./mysql')


queryPromise1 = (query) => {
    return new Promise((resolve, reject) => {
        const sql = query;
        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) return resolve([]);
            return resolve({ mail: results[0].email, phone_number: results[0].mobile, name: `${results[0].first_name} ${results[0].last_name}` });
        });
    });
};

exports.resolver = async (query) => {
    return await queryPromise1(query);
}

