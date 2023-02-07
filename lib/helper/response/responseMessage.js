exports.successResponse = function(messages = '', data = [], extras = {}) {
    var response = {
        success: true,
        data ,
        messages,
        time: Date.now(),
    }
    response = {...response, ...extras}
    return response
}

exports.errorResponse = function(messages = '', data = []) {
    var response = {
        success: false,
        data,
        messages, 
        time: Date.now()
    }
    return response
}