var inBoundOrderInstance= require('../models/inboundorder'); 
// Handle /2.4/v1/tags for GET
exports.postInBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	console.log("inbound");
	//var inBoundOrderInstance = new InBoundOrderInstance();		
	var date = req.body.date;
	var wId = req.body.wId;
	if(!date)
	{
		customErr.message = "date is null";	
	}

	if(!wId)
	{
		customErr.message = "worker is null";	
	}
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "SELECT id,CASE state WHEN 0 THEN 'error' WHEN 1 THEN 'undone' WHEN 2 THEN 'done' End as state FROM inboundorder where date = '"+date+"' AND workerId = "+wId+";";
		console.log(sql);
		inBoundOrderInstance.query(sql,function(err, inboundrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
					if(inboundrows.length!=0){
							var apiOutput = {};
							apiOutput.status = "success";
							apiOutput.message = "inboundorder  found";
							apiOutput.response = inboundrows;			
							res.json(apiOutput);

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inboundorder not found";
							apiOutput.response = inboundrows;			
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