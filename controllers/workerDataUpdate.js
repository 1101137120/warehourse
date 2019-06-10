var workerInstance= require('../models/worker'); 

// Handle /2.4/v1/tags for GET
exports.postWorkers = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	var sqlData = " ";
	var peopleID = req.body.peopleID;
	if(!peopleID)
	{
		customErr.message =customErr.message + "peopleID is null";
	}
	
	if(req.body.name)
	{
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "name = "+req.body.name;
	}
	else
	{
		customErr.message =customErr.message + "name is null";
	}
	
	if(req.body.email)
	{
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "email = "+req.body.email;
	}
	else
	{
		customErr.message =customErr.message + "email is null";
	}
	
	if(req.body.acount)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "userName = "+req.body.acount;
	}
	else
	{
		customErr.message =customErr.message + "acount is null";
	}
	
	if(req.body.pw)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "password = "+req.body.pw;
	}
	else
	{
		customErr.message =customErr.message + "pw is null";
	}
	
	if(req.body.phone)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "phone = "+req.body.phone;
	}
	else
	{
		customErr.message =customErr.message + "phone is null";
	}
	
	if(req.body.token)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "token = "+req.body.token;
	}
	else
	{
		customErr.message =customErr.message + "token is null";
	}
	
	if(req.body.Level)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "mangeLevel = "+req.body.Level;
	}
	else
	{
		customErr.message =customErr.message + "mangeLevel is null";
	}
	
	
	//var workerInstance = new WorkerInstance();		
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		
		var sql = "UPDATE worker SET "+sqlData+"  WHERE id = "+peopleID+" ;";
		workerInstance.query(sql,function(err, rows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
					if(rows.length==0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "worker Update";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "worker not Update";
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

Date.prototype.Format = function (fmt) { //author: meizz 
var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
};
if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
for (var k in o)
if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
return fmt;
}