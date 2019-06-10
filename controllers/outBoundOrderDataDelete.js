var outBoundOrderInstance= require('../models/outboundorder'); 
var outBoundDetailInstance= require('../models/outbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postOutBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var outBoundOrderInstance = new OutBoundOrderInstance();
	//var outBoundDetailInstance = new OutBoundDetailInstance();		
	
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
			sqlwhere = "id = "+orderID[i];
		else
			sqlwhere = sqlwhere + " or id = "+orderID[i];
	}
	
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "UPDATE outboundorder SET isDelete = 1,updateTime = '"+updateTime+"' WHERE "+sqlwhere+";";
		outBoundOrderInstance.query(sql,function(err, rows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
					if(rows.length!=0){

					var sql = "UPDATE outbound_detail SET isDelete = 1,updateTime = '"+updateTime+"' WHERE outboundId = '"+orderID+"' and isDelete = 0;";
		outBoundDetailInstance.query(sql,function(err, detailrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "order Delete";
								apiOutput.response = rows;			
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