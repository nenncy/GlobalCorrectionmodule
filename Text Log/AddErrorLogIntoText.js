var fs = require('fs');
var Toggle = {
        // Error mode in text file
          ErrorLogMode: true,
          SecurityMode: false 
        }

var APIErrorLog = (Query,err, headers, body, message, type, params, query, url) => {
        var myDate = new Date();
        date = myDate.getDate();
        Month = myDate.getMonth();
        Year = myDate.getFullYear();
        var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var fileName = [date, Months[Month], Year]
        if (Toggle.ErrorLogMode === true) {
                var textData = `****************************************\n\n=> Date : ${new Date()}\n=> Request Type : ${type}\n=> Request Header : ${JSON.stringify(headers)}\n=> Query : ${Query}\n=> Error : ${err}\n=> Request Body : ${JSON.stringify(body)}\n=> Message : ${message}\n=> URL : ${url}\n=> Params : ${JSON.stringify(params)}\n=> Query Params: ${JSON.stringify(query)}\n\n****************************************\n\n`;

                fs.appendFileSync(`./ApiErrorLog/${fileName} APIerrorLog.txt`, textData);
        }
}

module.exports = APIErrorLog;