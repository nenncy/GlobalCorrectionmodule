const router=require('express').Router();
const {config,poolPromise}=require('../Dbconfig/db');
const sql=require('mssql');

var TableUser='tblState';
const sqlstring = require('sqlstring');


const APIErrorLog = require('../Text Log/AddErrorLogIntoText');
 const APIcallLog = require('../Text Log/AddCallLogintoText.js');


 const modelBuilder=require('../helpers/ModelBuilder');
 const ResponseModel=require('../Model/Responsemodel');

 const CurrentDateTime=require('../shared/Currentdate');



class State{

    async GetState (req,res){
        try{
            const pool = await poolPromise
            const result = await pool.request()
        
            .input('State_ID',req.params.id)
            .execute('sp_GetState')
         const statedata=result.recordsets;
         var successmsg = `Successfully get data`;

        APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
        //res.status(200).json({success:statedata});
        res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));

        }
        catch(err){
            console.log(err);
            var errMessage=`An error occured!`;
            APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);
    
        }
    }


    async AddState (req,res){
        var DateTime = CurrentDateTime()
        try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('StateName',req.body.statename)
            .input('StateShortCode',req.body.code)
            .execute('sp_AddState')
            //.query(`INSERT INTO tblState (StateName,StateShortCode,IsVerified,createddate,createdBy,isactive,isdeleted) VALUES (${req.body.statename},${req.body.code},1,${DateTime},null,1,0)`)
            
            //const statedata= result;
            if (result.rowsAffected<=0){
                res.status(400).json({err: 'Duplicate data not allowed!'})
            }
            else{
                var successmsg = `Successfully inserted data`;
                APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
                res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));
            }
            
            

        }
        catch(err){
            console.log(err);
            var errMessage=`An error occured!`;
            APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);
    
        }
    }


    async UpdateState(req,res){
        var successmsg = `Updated Data successfully`;
        try{

            const pool = await poolPromise
            const result = await pool.request()
            .input('State_Id',req.params.id)
            .input('StateName',req.body.statename)
            
    
              .execute('sp_UpdateState')
               const statedata= result;
                if (result.rowsAffected<=0){
                    res.status(400).json({err: 'Invalid data entry'})
                }
                else{
                    APIcallLog( result.recordset, req.headers, req.body, successmsg, req.method, req.params, req.query, req.url);
                   
                    res.status(200).send(new modelBuilder().buildModel({ status: 200, successmsg: successmsg, data: result.recordset }, new ResponseModel()));
                }

        }
        catch(err){
            console.log(err);
            var errMessage=`An error occured!`;
            APIErrorLog( err, req.headers, req.body, errMessage, req.method, req.params, req.query, req.url);
    
        }
    }
}
 


      





const state= new State();
module.exports=state;