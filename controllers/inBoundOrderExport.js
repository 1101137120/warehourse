var inBoundOrderInstance= require('../models/inboundorder'); 
var inBoundDetailInstance= require('../models/inbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postInBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var inBoundOrderInstance = new InBoundOrderInstance();
	//var inBoundDetailInstance = new InBoundDetailInstance();		
	
	var orderID =  JSON.parse(req.body.orderID);
	var updateTime =  req.body.updateTime;
	if(!orderID)
	{
		customErr.message = "order is null";
	}
	
	var sqlwhere = "";
	for(var i =0;i<orderID.length;i++)
	{
		if(!sqlwhere)
			sqlwhere = "'"+orderID[i]+"'";
		else
			sqlwhere = sqlwhere + ",'"+orderID[i]+"'";
	}
	console.log("sqlwhere"+sqlwhere);
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
				var sql = "select inboundorder.id,CONCAT(inboundorder.date, ' ', inboundorder.time) as datetime,name as workerName,remarks as orderRemarks,state as orderState from inboundorder,worker where inboundorder.id IN("+sqlwhere+") and inboundorder.workerId = worker.id";
		inBoundOrderInstance.query(sql,function(err, orderrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("outboundorder");
					if(orderrows.length!=0){
		var sql = "SELECT inboundId,state as detailState,name as productName,eslID,inbound_detail.remarks as detailRemarks,amount FROM inbound_detail,product WHERE  inbound_detail.inboundId IN("+sqlwhere+")  and inbound_detail.product_id = product.id and inbound_detail.isDelete = 0  and product.isDelete = 0;";
		inBoundDetailInstance.query(sql,function(err, detailrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
					if(detailrows.length!=0){
						console.log("outbounddetail");
		var sql = "UPDATE inboundorder SET isDelete = 1,updateTime = '"+updateTime+"' WHERE id IN("+sqlwhere+");";
		inBoundOrderInstance.query(sql,function(err, dorows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("update outboundorder");
				
					if(dorows.length!=0){

					var sql = "UPDATE inbound_detail SET isDelete = 1,updateTime = '"+updateTime+"' WHERE inboundId IN("+sqlwhere+") and isDelete = 0;";
		inBoundDetailInstance.query(sql,function(err, ddrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("update outbound_detail");
					if(ddrows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "order Delete";
								apiOutput.response = orderrows;	
								apiOutput.dresponse = detailrows;									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "order not Delete";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "order not Delete";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not found";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not found";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

	}
};

function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}; 
var validation = {
	isEmailAddress:function(str) {
	   var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	   return pattern.test(str);  // returns a boolean
	},
	isNotEmpty:function (str) {
	   var pattern =/\S+/;
	   return pattern.test(str);  // returns a boolean
	},
	isNumber:function(str) {
	   var pattern = /^\d+$/;
	   return pattern.test(str);  // returns a boolean
	},
	isSame:function(str1,str2){
	  return str1 === str2;
}};   