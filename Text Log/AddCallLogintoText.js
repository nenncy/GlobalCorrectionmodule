var fs = require('fs');


var APIcallLog = ( result, headers, body, message, type, params, url) => {
        var myDate = new Date();
        date = myDate.getDate();
        Month = myDate.getMonth();
        Year = myDate.getFullYear();

        var Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
       var fileName = [date,Months[Month],Year]
        var textData = `****************************************\n\n=> Date : ${new Date()}\n=> Request Type : ${type}\n=> Request Header : ${JSON.stringify(headers)}\n=> result : ${JSON.stringify(result)}\n=> Request Body : ${JSON.stringify(body)}\n=> Message : ${message}\n=> URL : ${JSON.stringify(url)}\n=> Params : ${JSON.stringify(params)}\n=> \n\n****************************************\n\n`;
        fs.appendFileSync(`./ApiCallLog/${fileName} APIcallLog.txt`, textData); 
        
}
                                        
module.exports = APIcallLog;