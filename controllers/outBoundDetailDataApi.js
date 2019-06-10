var outBoundDetailInstance= require('../models/outbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postOutBoundDetails = function(req, res,next) {
	console.log("postOutBoundDetails");
	var customErr = new Error();
	var errorMessages = new Array();
	var outBoundId = req.body.outBoundId;
	customErr.status = 400;
	//var outBoundDetailInstance = new OutBoundDetailInstance();	
	
	if(!outBoundId){
		customErr.message = "outBoundId    is   null";
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		var sql = "SELECT outbound_detail.id,name,product_id,amount,CASE state WHEN 0 THEN 'error' WHEN 1 THEN 'undone' WHEN 2 THEN 'done' End as state,eslID,shelf FROM warehouse.outbound_detail LEFT JOIN  product on outbound_detail.product_id = product.id  WHERE outboundId = '"+outBoundId+"' and outbound_detail.isDelete = 0;";
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
								apiOutput.message = "outbounddetail found";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "outbounddetail not found";
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