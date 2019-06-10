var inBoundOrderInstance= require('../models/inboundorder'); 
var outBoundOrderInstance= require('../models/outboundorder'); 
// Handle /2.4/v1/tags for GET
exports.postBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	console.log("inbound");
	//var inBoundOrderInstance = new InBoundOrderInstance();		
	//var outBoundOrderInstance = new OutBoundOrderInstance();
	var wId = req.body.wId;
	var date = req.body.date;
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
		var sql = "SELECT count(id) as InTotal,count(IF(state != 2, id, null)) as InNCount,count(IF(state = 2, id, null)) as InCCount FROM inboundorder where date = '"+date+"' AND workerId = "+wId+" ;";
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
						 sql = "SELECT count(id) as OutTotal,count(IF(state != 2, id, null)) as OutNCount,count(IF(state = 2, id, null)) as OutCCount FROM outboundorder where date = '"+date+"' AND workerId = "+wId+";";
	
									outBoundOrderInstance.query(sql,function(err, outboundrows, fields) {
										if(err) 
										{
											console.log(JSON.stringify(err));
											customErr.status = 503;
											customErr.message = "db query error";		
											next(customErr);			
										}
										else
										{
												if(outboundrows.length!=0){
														var apiOutput = {};
														apiOutput.status = "success";
														apiOutput.message = "Bound  Count";
														apiOutput.inresponse = inboundrows;	
														apiOutput.outresponse = outboundrows;								
														res.json(apiOutput);

												}else{
														var apiOutput = {};
														apiOutput.status = "fail";
														apiOutput.message = "Bound  Count";
														apiOutput.response = outboundrows;			
														res.json(apiOutput);	
												
												}
													
										}
									});

								}else{
										var apiOutput = {};
										apiOutput.status = "fail";
										apiOutput.message = "Bound  Count";
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