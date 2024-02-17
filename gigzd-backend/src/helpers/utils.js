
class controller {
    errorFormat(message, status = 400) {
        return {
            error: true,
            status,
            message
        }

    }
    successFormat(message, data = [], status = 200) {
        return {
            error: false,
            status,
            message,
            data
        }
    }
}

module.exports = new controller