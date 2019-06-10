var eslInstance= require('../models/esl'); 

// Handle /2.4/v1/tags for GET
exports.postEsls = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var eslInstance = new EslInstance();	
	var eslID = req.body.eslID;
	if(!eslID)
	{
		customErr.message = "eslID is null"
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
	
		var sql = "select  esl.id from (SELECT  product_id FROM inbound_detail WHERE isDelete=0 and state = 1 union SELECT  product_id FROM outbound_detail WHERE isDelete=0 and state = 1) t ,esl WHERE esl.product_id = t.product_id and esl.isDelete = 0 and esl.id ='"+eslID+"';";
		eslInstance.query(sql,function(err, rows, fields) {
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

						var sql = "UPDATE esl SET isUpdate = 0,lightStatus = 0 WHERE id ='"+eslID+"';";
								eslInstance.query(sql,function(err, updaterows, fields) {
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
														apiOutput.message = "esl Light off";
														apiOutput.response = rows;			
														res.json(apiOutput);	

											}else{
													var apiOutput = {};
													apiOutput.status = "fail";
													apiOutput.message = "esl Light off";
													apiOutput.response = rows;			
													res.json(apiOutput);	
											
											}
												
									}
								});	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "esl Light Check";
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