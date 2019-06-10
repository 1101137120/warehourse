var outBoundOrderInstance= require('../models/outboundorder'); 
// Handle /2.4/v1/tags for GET
exports.postOutBoundOrders = function(req, res,next) {
	console.log("postOutBoundDetails");
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
		
		var sql = "UPDATE outboundorder SET state="+status+" WHERE id = "+outBoundId+"";
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