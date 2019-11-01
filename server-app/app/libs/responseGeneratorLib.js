/* library to generate api response */
let generateResponse = (error, status, message, data) => {
    let response = {
      error: error,
      status: status,
      message: message,
      data: data
    };
    return response;
  };
  
  module.exports = { generateResponse: generateResponse };