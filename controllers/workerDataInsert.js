var workerInstance= require('../models/worker'); 

// Handle /2.4/v1/tags for GET
exports.postWorkers = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	var name =  req.body.name;
	var email =  req.body.email;
	var acount =  req.body.acount;
	var pw =  req.body.pw;
	var phone =  req.body.phone;
	var level =  req.body.level;
	var remark =  req.body.remark;
	//var workerInstance = new WorkerInstance();		
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{

		var sql = "INSERT INTO  worker (name,email,userName,password,phone,remarks,isDelete,mangeLevel) VALUES ('"+name+"','"+email+"','"+acount+"','"+pw+"','"+phone+"','"+remark+"','"+0+"','"+level+"');";
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
				
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "people Insert";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "people not Insert";
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