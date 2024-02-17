const crypto = require('crypto');
const salt = "f91f36afebd2879da69cccd0a13b353580164f620bba6696d3b7fc74a6c720081491402add94c646690a231b31d2d9a38bb6ad7b558fcfb7d43915c63e9ecffeacd3fab8e27798e69bfa5cc90f454c9d6a4f2f393594158233abd9a7aec13431953805ff78b94373eb7214049101c630db254fdb28abe7ecf8e878cebdb16ee9"
const iv = "7f00157593ac8252"
const iterations = 999;

executeDecode = async (encryptedString) => {
    try {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(process.env.DECODE_KEY, salt, iterations, 32, "sha512", (err, derivedKey) => {
                if (err) return reject(err);
                const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
                var decrypted = decipher.update(encryptedString, 'base64', 'utf-8');
                decrypted += decipher.final('utf-8');
                return resolve(decrypted);
            });
        });
    } catch (error) {
        throw (error)
    }
}

exports.decode = async (encryptedString) => {
    return await executeDecode(encryptedString);
}