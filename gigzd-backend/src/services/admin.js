const { getAllData } = require('../database/read')
const { updateData } = require('../database/updation')

exports.getData = async () => {
    return getAllData('provider_register')
}


exports.updateData = async (id) => {
    const query = `set is_approved = true `
    const is_approved = await getAllData('provider_register', `id = ${id} and is_approved = false`)
    if (is_approved.length === 0) return 'error'
    return updateData('provider_register', query, `id = ${id}`)
}