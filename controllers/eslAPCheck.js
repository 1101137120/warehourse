var eslInstance= require('../models/esl'); 

// Handle /2.4/v1/tags for GET
exports.postEsls = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;

	var detailData = req.body;

	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
	
	var detailDataSQL = "";
	for(var i=0;i<detailData.length;i++)
	{
		if(detailDataSQL)
			detailDataSQL=detailDataSQL+",";
		
		detailDataSQL  = detailDataSQL + "'" +detailData[i].productID + "'";
	}
	var APSQL = "SELECT APId,id FROM esl WHERE product_id IN("+detailDataSQL+");";
		//var sql = "INSERT INTO outbound_detail (product_id,amount,state,isDelete,outboundId,updateTime) VALUES (?,?,?,?,?,?);";
		console.log(APSQL);
		eslInstance.query(APSQL,function(err, rows, fields) {
			
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				if(rows.length!=0)
				{
					var nullesl = "";
					var checkStatus = "success";
					for(var i=0;i<rows.length;i++)
					{
						if(!rows[i].APId)
						{
							if(!nullesl)
								nullesl = nullesl +",";
							nullesl = nullesl + rows[i].id;
							
							checkStatus = "fail";
						}
					}
					
					var apiOutput = {};
					apiOutput.status = checkStatus;
					apiOutput.message = "esl  "+nullesl+"  AP null";		
					res.json(apiOutput);
				}
				else
				{
					var apiOutput = {};
					apiOutput.status = "fail";
					apiOutput.message = "esl not found";		
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