class ResponseModel {
    constructor(status, data, message, error, error_code) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error_code = error_code;
        this.error = error;
    }
}

module.exports = ResponseModel;