const sql=require('mssql');

var config = {
    user: 'dotnet_dev',
    password: 'Esmsys-20$20',
    server: 'mssql.esmsys.in', 
    database: 'jn-common',
    options:{
        trustedconnection: true,
        // enableArithAbort : true, 
        trustServerCertificate: true
       
    },
    port : 14251
     
      
      
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


module.exports={
    config,poolPromise
}