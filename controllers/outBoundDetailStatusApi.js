var outBoundDetailInstance= require('../models/outbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postOutBoundDetails = function(req, res,next) {
	console.log("postOutBoundDetails");
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