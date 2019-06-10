process.env.TZ = 'Asia/Taipei' 
// Get the packages we need
var express = require('express');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var inBoundDetailDataController = require('./controllers/inBoundDetailData');
var inBoundDetailDataInsertController = require('./controllers/inBoundDetailDataInsert');
var inBoundDetailDataUpdateController = require('./controllers/inBoundDetailDataUpdate');
var inBoundDetailDataDeleteController = require('./controllers/inBoundDetailDataDelete');
//var loadTestController = require('./controllers/loadtest');
var inBoundOrderDataController = require('./controllers/inBoundOrderData');
var inBoundOrderDataInsertController = require('./controllers/inBoundOrderDataInsert');
var inBoundOrderDataUpdateController = require('./controllers/inBoundOrderDataUpdate');
var inBoundOrderDataDeleteController = require('./controllers/inBoundOrderDataDelete');
var outBoundDetailDataController = require('./controllers/outBoundDetailData');
var outBoundDetailDataInsertController = require('./controllers/outBoundDetailDataInsert');
var outBoundDetailDataUpdateController = require('./controllers/outBoundDetailDataUpdate');
var outBoundDetailDataDeleteController = require('./controllers/outBoundDetailDataDelete');
var outBoundOrderDataController = require('./controllers/outBoundOrderData');
var outBoundOrderDataInsertController = require('./controllers/outBoundOrderDataInsert');
var outBoundOrderDataUpdateController = require('./controllers/outBoundOrderDataUpdate');
var outBoundOrderDataDeleteController=  require('./controllers/outBoundOrderDataDelete');
var outBoundOrderExportController = require('./controllers/outBoundOrderExport');
var inBoundOrderExportController = require('./controllers/inBoundOrderExport');
var inBoundOrderAutoExportController = require('./controllers/inBoundOrderAutoExport');
var outBoundOrderAutoExportController = require('./controllers/outBoundOrderAutoExport');
var productDataController = require('./controllers/productData');
var productDataInsertController = require('./controllers/productDataInsert');
var productDataUpdateController = require('./controllers/productDataUpdate');
var productDataDeleteController = require('./controllers/productDataDelete');
var boundProductDataController = require('./controllers/boundProductData');
var workerDataController = require('./controllers/workerData');
var workerDataInsertController = require('./controllers/workerDataInsert');
var workerDataUpdateController = require('./controllers/workerDataUpdate');
var workerDataDeleteController = require('./controllers/workerDataDelete');
var eslLightUpdateController = require('./controllers/eslLightUpdate');
var eslIsUpdateCheckController = require('./controllers/eslIsUpdateCheck');
var eslLightCompleteUpdateController = require('./controllers/eslLightCompleteUpdate');
var eslLightUpdateFailController = require('./controllers/eslLightUpdateFail');
var eslLightOffCheckController = require('./controllers/eslLightOffCheck');
var eslDataController = require('./controllers/eslData');
var eslResetAPController = require('./controllers/eslResetAP');
var eslAPCheckController = require('./controllers/eslAPCheck');
var eslEmptyCheckController = require('./controllers/eslEmptyCheck');
var APDataInsertController = require('./controllers/APDataInsert');
var APDataController = require('./controllers/APData');
var loginController = require('./controllers/login');
var inBoundOrdersApiController = require('./controllers/inBoundOrdersApi');
var boundCountApiController = require('./controllers/BoundCountApi');
var inBoundDetailDataApiController = require('./controllers/inBoundDetailDataApi');
var inBoundDetailStatusApiController = require('./controllers/inBoundDetailStatusApi');
var inBoundOrderStatusApiController = require('./controllers/inBoundOrderStatusApi');
var outBoundOrdersApiController = require('./controllers/outBoundOrdersApi');
var outBoundDetailDataApiController = require('./controllers/outBoundDetailDataApi');
var outBoundDetailStatusApiController = require('./controllers/outBoundDetailStatusApi');
var outBoundOrderStatusApiController = require('./controllers/outBoundOrderStatusApi');


var config = require('./config101'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var mime = require('mime');
//file upload
var multer  = require('multer');
var upload = multer();
var done=false; 
var app = express();
app.set('http_port', 9010);
app.set('ip', "localhost");

//app.set('ip', "10.1.1.77");
//app.set('ip', "1.163.240.170");
//app.set('ip', "127.0.0.1");

app.set('MySuperSecret', config.secret); // secret variable
//handle for jsonp
app.set("jsonp callback", true);
// http
var http = require('http');
var httpServer = http.createServer(app);
var aaa =0;
var socket=require("socket.io");
var io = socket.listen(app.listen(9011));
var fs = require('fs');
//io.set('transports', ['Long polling', 'websocket']);
app.use("/registration/v1/img",express.static(__dirname + "/public/img"));


	io.sockets.on('connection', function(socket) {
	
	
	/*var stateUpdate = setInterval(function() {
		var inBoundOrderInstance= require('./models/inboundorder'); 
		var outBoundOrderInstance= require('./models/outboundorder'); 
		//var sql = "SELECT inboundorder.id,inboundorder.state FROM warehouse.inboundorder left join inbound_detail on inboundorder.id = inbound_detail.inboundId WHERE inboundorder.isDelete =0 and inbound_detail.isDelete = 0 group by inboundorder.id;";
		var sql = "SELECT inboundorder.id,inboundorder.state FROM inboundorder WHERE isDelete = 0 AND state = 0;"
		var apiResult ={};
			inBoundOrderInstance.query(sql,function(err, inboundrows, fields) {
				if(err) 
				{
					console.log(JSON.stringify(err));
					customErr.status = 503;
					customErr.message = "db query error";		
					next(customErr);			
					
				}
				apiResult.inbound = inboundrows;
			});
		
			//sql = "SELECT outboundorder.id,outboundorder.state FROM warehouse.outboundorder left join outbound_detail on outboundorder.id = outbound_detail.outboundId WHERE outboundorder.isDelete =0 and outbound_detail.isDelete = 0 group by outboundorder.id;";
		    sql = "SELECT outboundorder.id,outboundorder.state FROM outboundorder WHERE isDelete = 0 AND state = 0;"
			outBoundOrderInstance.query(sql,function(err, outboundrows, fields) {
				if(err) 
				{
					console.log(JSON.stringify(err));
					customErr.status = 503;
					customErr.message = "db query error";		
					next(customErr);			
				}
				apiResult.outbound = outboundrows;
				socket.emit('message',apiResult);
			});
	}, 5000);*/
	
		var stateCheck = setInterval(function() {
		var eslInstance= require('./models/esl'); 
		var sql = "SELECT id,APId,lightStatus,product_id  FROM esl WHERE isUpdate = 0 and failCount < 3;";
		var apiResult ={};
			eslInstance.query(sql,function(err, eslrows, fields) {
				if(err) 
				{
					console.log(JSON.stringify(err));
					customErr.status = 503;
					customErr.message = "db query error";		
					next(customErr);			
					
				}
				//apiResult.eslUpdate = eslrows;
				socket.emit('eslUpdate',eslrows);
			});
		
	}, 1000);
	
	socket.on('inbounderror', function(data) {
      console.log('Got inbounderror!');
	  socket.emit('IErrorMessage',data);
   });
   
   	socket.on('inboundDetailerror', function(data) {
      console.log('Got inbounderror!');
	  socket.emit('IDErrorMessage',data);
   });
   
   	socket.on('outbounderror', function(data) {
      console.log('Got outbounderror!');
	  socket.emit('OErrorMessage',data);
   });
   
   	socket.on('outboundDetailerror', function(data) {
      console.log('Got outbounderror!');
	  socket.emit('ODErrorMessage',data);
   });   
		
	socket.on('disconnect', function() {
      console.log('Got disconnect!');
	  clearImmediate(stateCheck);
   });
});
io.sockets.on('disconnection', function(socket) {
	
});



//handle for jsonp
app.set("jsonp callback", true);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(flash());
app.use(passport.initialize());
app.use(session({
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.session());

app.set("views", __dirname + "/views");
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');





//APP API
var apiRoutes = express.Router(); 
app.use('/warehouse/api', apiRoutes);


apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('MySuperSecret'), function(err, decoded) {            
            if (err) {   
                return res.json({ success: false, message: 'Failed to authenticate token.', error:err.message });       
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;  
                var myDecoded = JSON.stringify(req.decoded);
				console.log('myDecoded = '+req.decoded);
                var myJsonString = myDecoded.replace('\"', '"');
                var myjson = JSON.parse(myJsonString);
                console.log('myDecoded = '+myDecoded);
				
                console.log('myjson = '+myjson.data);
				var tokenData = myjson.data.split('&&');

				console.log('myjson = '+tokenData[0]+tokenData[1]+req.body.wId);
                if(tokenData[1] == req.body.wId){
                    console.log('checkToken...username = token data');
                    next();
                }
                else{
                    console.log('checkToken...username != token data');
                    return res.json({ 'method': 'checkID', message: 'token not match username', 'result':'false' });
                }
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });
        
    }
    
});

apiRoutes.route('/BoundCountApi')
	.post(boundCountApiController.postBoundOrders)

apiRoutes.route('/InBoundOrdersApi')
	.post(inBoundOrdersApiController.postInBoundOrders)
	
apiRoutes.route('/InBoundDetailDataApi')
	.post(inBoundDetailDataApiController.postInBoundDetails)	
	
/*apiRoutes.route('/InBoundDetailStatusApi')
	.post(inBoundDetailStatusApiController.postInBoundDetails)
	
apiRoutes.route('/InBoundOrderStatusApi')
	.post(inBoundOrderStatusApiController.postInBoundOrders)
	*/
apiRoutes.route('/OutBoundOrdersApi')
	.post(outBoundOrdersApiController.postOutBoundOrders)
	
apiRoutes.route('/OutBoundDetailDataApi')
	.post(outBoundDetailDataApiController.postOutBoundDetails)	
	
/*apiRoutes.route('/OutBoundDetailStatusApi')
	.post(outBoundDetailStatusApiController.postOutBoundDetails)
	
apiRoutes.route('/OutBoundOrderStatusApi')
	.post(outBoundOrderStatusApiController.postOutBoundOrders)
*/


apiRoutes.post("/OutBoundOrderStatusApi", function(req, res) {
	var outBoundOrderInstance= require('./models/outboundorder');
	var customErr = new Error();
	var errorMessages = new Array();
	var outBoundId = req.body.outBoundId;
	var status = req.body.status;
	customErr.status = 400;
	//var outBoundOrderInstance = new OutBoundOrderInstance();	
	if(!outBoundId){
		customErr.message = "outBoundId    is   null";
	}
	
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
				if(status=="done")
		{
			status = 2;
		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		if(status==2)
			var sql = "UPDATE outboundorder SET state="+status+",updateTime = Now(),completeTime = Now() WHERE id = "+outBoundId+"";
		else
			var sql = "UPDATE outboundorder SET state="+status+",updateTime = Now() WHERE id = "+outBoundId+"";
		console.log("sqldetaillist" + sql);
		outBoundOrderInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "outboundorder status update";
								apiOutput.response = rows;	
								var apisocket = {};
								apisocket.id = outBoundId;
								apisocket.state = status;
								if(rows.affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								var date = new Date();
								var format = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

								apisocket.updateTime = format;	
								io.sockets.emit("OErrorMessage",apisocket);								
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "outboundorder status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});

apiRoutes.post("/OutBoundDetailStatusApi", function(req, res) {
	var outBoundDetailInstance= require('./models/outbound_detail'); 
	var customErr = new Error();
	var errorMessages = new Array();
	var outBoundDetailId = req.body.outBoundDetailId;
	var status = req.body.status;
	var product_id =  req.body.productId;
	customErr.status = 400;
	//var outBoundDetailInstance = new OutBoundDetailInstance();	
	if(!outBoundDetailId){
		customErr.message = "outBoundDetailId    is   null";
	}
	
	if(!product_id){
		customErr.message = "productId    is   null";

	}
	
	var prosql = null;
	
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
		if(status=="done")
		{
			status = 2;
			prosql = "UPDATE product,(select * from outbound_detail where id = '"+!outBoundDetailId+"') as outBound SET inStock = inStock - outBound.amount where product.id =outBound.product_id;"

		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
			prosql = "UPDATE product,(select * from outbound_detail where id = '"+!outBoundDetailId+"') as outBound SET inStock = inStock + outBound.amount where product.id =outBound.product_id;"

		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		var sql = "UPDATE outbound_detail SET state="+status+" WHERE id = "+outBoundDetailId+";Update esl set isUpdate = 0,lightStatus = 0,failCount = 0,remarks = null Where (select Count(id) from inbound_detail where inboundId IN(select id from inboundorder where date = CURDATE()) and product_id = '"+product_id+"' and state IN(1,0)) = 0 AND (select Count(id) from outbound_detail where outboundId IN(select id from outboundorder where date = CURDATE()) and product_id = '"+product_id+"' and state IN(1,0)) = 0 AND esl.product_id = '"+product_id+"';";
		if(prosql)
			sql = sql + prosql;
		
		console.log("sqldetaillist" + sql);
		outBoundDetailInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "outbounddetail status update";
								apiOutput.response = rows;		
								var apisocket = {};
								apisocket.id = outBoundDetailId;
								apisocket.state = status;
								if(rows[1].affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								io.sockets.emit("ODErrorMessage",apisocket);									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "outbounddetail status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});

apiRoutes.post("/InBoundOrderStatusApi", function(req, res) {
	var inBoundOrderInstance= require('./models/inboundorder'); 
		var customErr = new Error();
	var errorMessages = new Array();
	var inBoundId = req.body.inBoundId;
	var status = req.body.status;
	customErr.status = 400;
	//var inBoundOrderInstance = new InBoundOrderInstance();	
	if(!inBoundId){
		customErr.message = "inBoundId    is   null";
	}
	
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
		if(status=="done")
		{
			status = 2;
		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		if(status==2)
		{
					var sql = "UPDATE inboundorder SET state="+status+",updateTime = Now(),completeTime = Now() WHERE id = "+inBoundId+"";
		}
		else
		{
					var sql = "UPDATE inboundorder SET state="+status+",updateTime = Now() WHERE id = "+inBoundId+"";
		}

		console.log("sqldetaillist" + sql);
			inBoundOrderInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

					
								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "inboundorder status update";
								apiOutput.response = rows;	
								var date = new Date();
								var format = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

								var apisocket = {};
								apisocket.id = inBoundId;
								apisocket.state = status;
								if(rows.affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								apisocket.updateTime = format;				
								io.sockets.emit("IErrorMessage",apisocket);									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inboundorder status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});

apiRoutes.post("/InBoundDetailStatusApi", function(req, res) {
	var inBoundDetailInstance= require('./models/inbound_detail'); 
	var productInstance= require('./models/product'); 
	var customErr = new Error();
	var errorMessages = new Array();
	var inBoundDetailId = req.body.inBoundDetailId;
	var status = req.body.status;
	var product_id =  req.body.productId;
	customErr.status = 400;
	//var inBoundDetailInstance = new InBoundDetailInstance();	
	if(!inBoundDetailId){
		customErr.message = "inBoundDetailId    is   null";
	}
	
	if(!product_id){
		customErr.message = "productId    is   null";

	}
	
	var prosql = null;
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
		if(status=="done")
		{
			status = 2;
			prosql = "UPDATE product,(select * from inbound_detail where id = '"+inBoundDetailId+"') as inBound SET inStock = inStock + inBound.amount where product.id =inBound.product_id;"
		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
			prosql = "UPDATE product,(select * from inbound_detail where id = '"+inBoundDetailId+"') as inBound SET inStock = inStock - inBound.amount where product.id =inBound.product_id;"
		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{

		var sql = "UPDATE inbound_detail SET state="+status+" WHERE id = "+inBoundDetailId+";Update esl set isUpdate = 0,lightStatus = 0,failCount = 0,remarks = null Where (select Count(id) from inbound_detail where inboundId IN(select id from inboundorder where date = CURDATE()) and product_id = '"+product_id+"' and state IN(1,0)) = 0 AND (select Count(id) from outbound_detail where outboundId IN(select id from outboundorder where date = CURDATE()) and product_id = '"+product_id+"' and state IN(1,0)) = 0 AND esl.product_id = '"+product_id+"';";
		if(prosql)
			sql = sql + prosql;
		
		console.log("sqldetaillist" + sql);
		inBoundDetailInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "inbounddetail status update";
								apiOutput.response = rows;	
								var apisocket = {};
								apisocket.id = inBoundDetailId;
								apisocket.state = status;
								if(rows[1].affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								io.sockets.emit("IDErrorMessage",apisocket);									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inbounddetail status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});
	

//ESL SYSTEM
var routerRegistration = express.Router();
app.use('/warehouse', routerRegistration);

routerRegistration.route('/Login')
	.post(loginController.postLogin)

routerRegistration.route('/InBoundDetails')
	.post(inBoundDetailDataController.postInBoundDetails)

routerRegistration.route('/InBoundDetailsInsert')
	.post(inBoundDetailDataInsertController.postInBoundDetails)

routerRegistration.route('/InBoundDetailsUpdate')
	.post(inBoundDetailDataUpdateController.postInBoundDetails)

routerRegistration.route('/InBoundDetailsDelete')
	.post(inBoundDetailDataDeleteController.postInBoundDetails)

routerRegistration.route('/InBoundOrder')
	.get(inBoundOrderDataController.getInBoundOrders)

routerRegistration.route('/InBoundOrderInsert')
	.post(inBoundOrderDataInsertController.postInBoundOrders)

routerRegistration.route('/InBoundOrderUpdate')
	.post(inBoundOrderDataUpdateController.postInBoundOrders)

routerRegistration.route('/InBoundOrderDelete')
	.post(inBoundOrderDataDeleteController.postInBoundOrders)

routerRegistration.route('/OutBoundDetails')
	.post(outBoundDetailDataController.postOutBoundDetails)

routerRegistration.route('/OutBoundDetailsInsert')
	.post(outBoundDetailDataInsertController.postOutBoundDetails)

routerRegistration.route('/OutBoundDetailsUpdate')
	.post(outBoundDetailDataUpdateController.postOutBoundDetails)

routerRegistration.route('/OutBoundDetailsDelete')
	.post(outBoundDetailDataDeleteController.postOutBoundDetails)

routerRegistration.route('/OutBoundOrder')
	.get(outBoundOrderDataController.getOutBoundOrders)

routerRegistration.route('/OutBoundOrderInsert')
	.post(outBoundOrderDataInsertController.postOutBoundOrders)

routerRegistration.route('/OutBoundOrderUpdate')
	.post(outBoundOrderDataUpdateController.postOutBoundOrders)

routerRegistration.route('/OutBoundOrderDelete')
	.post(outBoundOrderDataDeleteController.postOutBoundOrders)
	
routerRegistration.route('/OutBoundOrderExport')
	.post(outBoundOrderExportController.postOutBoundOrders)
	
routerRegistration.route('/InBoundOrderExport')
	.post(inBoundOrderExportController.postInBoundOrders)
	
routerRegistration.route('/InBoundOrderAutoExport')
	.post(inBoundOrderAutoExportController.postInBoundOrders)
	
routerRegistration.route('/OutBoundOrderAutoExport')
	.post(outBoundOrderAutoExportController.postOutBoundOrders)

routerRegistration.route('/Product')
	.get(productDataController.getProducts)

routerRegistration.route('/ProductInsert')
	.post(productDataInsertController.postProducts)

routerRegistration.route('/ProductUpdate')
	.post(productDataUpdateController.postProducts)

routerRegistration.route('/ProductDelete')
	.post(productDataDeleteController.postProducts)
	
routerRegistration.route('/BoundProduct')
	.get(boundProductDataController.getProducts)

routerRegistration.route('/Worker')
	.get(workerDataController.getWorkers)

routerRegistration.route('/WorkerInsert')
	.post(workerDataInsertController.postWorkers)

routerRegistration.route('/WorkerUpdate')
	.post(workerDataUpdateController.postWorkers)

routerRegistration.route('/WorkerDelete')
	.post(workerDataDeleteController.postWorkers)	
	
routerRegistration.route('/EslLightUpdate')
	.post(eslLightUpdateController.postEsls)
	
routerRegistration.route('/EslIsUpdateCheck')
	.get(eslIsUpdateCheckController.getEsls)
	
routerRegistration.route('/EslLightCompleteUpdate')
	.post(eslLightCompleteUpdateController.postEsls)
	
routerRegistration.route('/EslLightUpdateFail')
	.post(eslLightUpdateFailController.postEsls)	
	
routerRegistration.route('/EslLightOffCheck')
	.post(eslLightOffCheckController.postEsls)
	
routerRegistration.route('/EslData')
	.get(eslDataController.getEsls)
	
routerRegistration.route('/EslResetAP')
	.post(eslResetAPController.postEsls)
	
routerRegistration.route('/EslAPCheck')
	.post(eslAPCheckController.postEsls)
	
routerRegistration.route('/EslEmptyCheck')
	.post(eslEmptyCheckController.postEsls)
		
routerRegistration.route('/APDataInsert')
	.post(APDataInsertController.postAPs)		
	
routerRegistration.route('/APData')
	.get(APDataController.getAPs)	
	
/*	
routerRegistration.post("/OutBoundOrderStatus", function(req, res) {
	var outBoundOrderInstance= require('./models/outboundorder');
	var customErr = new Error();
	var errorMessages = new Array();
	var outBoundId = req.body.outBoundId;
	var status = "undone";
	customErr.status = 400;
	//var outBoundOrderInstance = new OutBoundOrderInstance();	
	if(!outBoundId){
		customErr.message = "outBoundId    is   null";
	}
	
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
				if(status=="done")
		{
			status = 2;
		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		if(status==2)
			var sql = "UPDATE outboundorder SET state="+status+",updateTime = Now(),completeTime = Now() WHERE id = "+outBoundId+"";
		else
			var sql = "UPDATE outboundorder SET state="+status+",updateTime = Now() WHERE id = "+outBoundId+"";
		console.log("sqldetaillist" + sql);
		outBoundOrderInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "outboundorder status update";
								apiOutput.response = rows;	
								var apisocket = {};
								apisocket.id = outBoundId;
								apisocket.state = status;
								if(rows.affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								var date = new Date();
								var format = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

								apisocket.updateTime = format;	
								io.sockets.emit("OErrorMessage",apisocket);								
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "outboundorder status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});
routerRegistration.post("/InBoundOrderStatus", function(req, res) {
	var inBoundOrderInstance= require('./models/inboundorder'); 
		var customErr = new Error();
	var errorMessages = new Array();
	var inBoundId = req.body.inBoundId;
	var status = "undone";
	customErr.status = 400;
	//var inBoundOrderInstance = new InBoundOrderInstance();	
	if(!inBoundId){
		customErr.message = "inBoundId    is   null";
	}
	
	if(!status){
		customErr.message = "status    is   null";

	}
	else
	{
		if(status=="done")
		{
			status = 2;
		}
		else if(status=="error")
		{
			status = 0;
		}
		else if(status=="undone")
		{
			status = 1;
		}
		else
		{
			status = 1;
		}
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		if(status==2)
		{
					var sql = "UPDATE inboundorder SET state="+status+",updateTime = Now(),completeTime = Now() WHERE id = "+inBoundId+"";
		}
		else
		{
					var sql = "UPDATE inboundorder SET state="+status+",updateTime = Now() WHERE id = "+inBoundId+"";
		}

		console.log("sqldetaillist" + sql);
			inBoundOrderInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

					
								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "inboundorder status update";
								apiOutput.response = rows;	
								var date = new Date();
								var format = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

								var apisocket = {};
								apisocket.id = inBoundId;
								apisocket.state = status;
								if(rows.affectedRows==1)
									apisocket.Update = true;
								else
									apisocket.Update = false;
								apisocket.updateTime = format;				
								io.sockets.emit("IErrorMessage",apisocket);									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inboundorder status update";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});



	}
});	
*/
// Error Hanlding
app.use(function(err, req, res, next) {
	var apiOutput = {};
	apiOutput.status = "failure";
	apiOutput.error_message = err.message;
	console.log("ININININ");
	if(typeof err.gcm_user_id !== "undefined")apiOutput.gcm_user_id = err.gcm_user_id;
	if(typeof err.status !== "undefined")res.statusCode = err.status;	

	res.send(JSON.stringify(apiOutput) || '** no relevant error handle **');  
	
	
	
	return next();
}); 
httpServer.listen(app.get('http_port'),app.get('ip'),function(){
	console.log("listen on port "+app.get('http_port')+", server is running");


});


