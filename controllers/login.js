var workInstance= require('../models/worker'); 
var config = require('../config101');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// Handle /2.4/v1/tags for GET
exports.postLogin = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var workInstance = new WorkerInstance();	
	var username = req.body.username;
	var password = req.body.password;
	console.log("Login IN");
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "SELECT * FROM warehouse.worker WHERE isDelete = 0 AND userName = '"+username+"';";
		workInstance.query(sql,function(err, rows, fields) {
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
						
						
						if(password ==rows[0].password)
						{
							
							var token = jwt.sign({data: rows[0].userName+"&&"+rows[0].id+"&&"+rows[0].name+"&&"+rows[0].email},config.secret, { expiresIn: 60 * 60 * 24 * 30});// 1 hr
							 sql = "UPDATE worker SET token='"+token+"',loginTime=DATE_FORMAT(now(), '%Y-%m-%d %H:%i:%s') WHERE id = "+rows[0].id+"";
							workInstance.query(sql,function(err, updaterows, fields) {
								if(err) 
								{
									console.log(JSON.stringify(err));
									customErr.status = 503;
									customErr.message = "db query error";		
									next(customErr);			
								}
								else
								{
										if(updaterows.length!=0){

													var apiOutput = {};
													apiOutput.status = "success";
													apiOutput.message = "login";
													apiOutput.name = rows[0].name;	
													apiOutput.id = rows[0].id;	
													apiOutput.token = token;														
													res.json(apiOutput);	

										}else{
												var apiOutput = {};
												apiOutput.status = "fail";
												apiOutput.message = "login";
												apiOutput.response = token;			
												res.json(apiOutput);	
										
										}
											
								}
							});
						}
						else
						{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "username or password error";
							apiOutput.response = null;			
							res.json(apiOutput);	
						}
					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "username or password error";
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