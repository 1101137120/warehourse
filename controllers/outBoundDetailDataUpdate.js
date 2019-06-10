var outBoundDetailInstance= require('../models/outbound_detail'); 
var outBoundOrderInstance= require('../models/outboundorder'); 

// Handle /2.4/v1/tags for GET
exports.postOutBoundDetails = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var outBoundDetailInstance = new OutBoundDetailInstance();	
	//var outBoundOrderInstance = new OutBoundOrderInstance();		
	console.log("req.body" + req.body);
	//var OutBoundDetail =  JSON.parse(req.body.OutBoundDetail);
	var id = req.body.id;
	var date = req.body.date;
	var time = req.body.time;
	var workerId = req.body.workerId;
	var detailData = req.body.detailData;
	var remarks = req.body.remarks;
	var state = req.body.state;
	var updateTime = req.body.updateTime;
	
	console.log("OOrder" + req.body.id);
	console.log("OOrder" + req.body.date);
	console.log("OOrder" + req.body.time);
	console.log("OOrder" + req.body.workerId);
	
	
	if(!id)
	{
		customErr.message = "id is null";
	}
	
	if(!date)
	{
		customErr.message = "date is null";
	}
	
	if(!time)
	{
		customErr.message = "time is null";
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "Update outboundorder SET workerId = '"+workerId+"' WHERE id = '"+id+"';";
		outBoundOrderInstance.query(sql,function(err, rows, fields) {
			
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
				console.log("WorekrOK");
			var sql = "Update outbound_detail SET isDelete = 1,updateTime = '"+updateTime+"' WHERE outboundId = "+id+";";

		outBoundDetailInstance.query(sql,function(err, rows, fields) {
			
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				var detailSQL = "INSERT INTO outbound_detail (product_id,amount,state,isDelete,outboundId,updateTime) VALUES ";
				var detailDataSQL = "";
				for(var i=0;i<detailData.length;i++)
				{
					if(detailDataSQL!="")
						detailDataSQL = detailDataSQL + ",";
		
						detailDataSQL  = detailDataSQL + "(" +detailData[i].productID + "," +detailData[i].amount + "," +detailData[i].state + "," +"0" + ",'" +detailData[i].outboundId + "','" +detailData[i].updateTime + "')";
				}
					detailSQL = detailSQL +detailDataSQL+";";
					outBoundDetailInstance.query(detailSQL,function(err, Orderrows, fields) {
					console.log("ININININ");
					if(err) 
					{
						console.log(JSON.stringify(err));
						customErr.status = 503;
						customErr.message = "db query error";		
						next(customErr);			
					}
					else
					{
				
					if(Orderrows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "OutBoundOrder Insert";
								apiOutput.detailresponse = rows;	
								apiOutput.response = Orderrows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "detail not Insert";
							apiOutput.response = rows;			
							res.json(apiOutput);	
					
					}
						
			}
					});	
			}
		});
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