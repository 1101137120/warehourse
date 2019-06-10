var outBoundOrderInstance= require('../models/outboundorder'); 
var outBoundDetailInstance= require('../models/outbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postOutBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var outBoundOrderInstance = new OutBoundOrderInstance();
	//var outBoundDetailInstance = new OutBoundDetailInstance();		
	
	var orderID =  "";
	var updateTime =  req.body.updateTime;
	var updateTimeDate = updateTime.split(' ');
	var ExportDay =  req.body.ExportDay;
	
	var sqlwhere = "";
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
				var sql = "select outboundorder.id,CONCAT(outboundorder.date, ' ', outboundorder.time) as datetime,name as workerName,remarks as orderRemarks,state as orderState from outboundorder,worker where outboundorder.date < ADDDATE('"+updateTimeDate[0]+"', INTERVAL -"+ExportDay+" DAY) and outboundorder.workerId = worker.id";
		//console.log("inBoundOrderAutoExport  "+sql);
		outBoundOrderInstance.query(sql,function(err, orderrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				//console.log("inBoundOrderAutoExportS");
					if(orderrows.length!=0){
						
					for(var i =0;i<orderrows.length;i++)
					{
						if(!sqlwhere)
							sqlwhere = "'"+orderrows[i].id+"'";
						else
							sqlwhere = sqlwhere + ",'"+orderrows[i].id+"'";
					}
					//console.log("inBoundOrderAutoExportS "+sqlwhere);
		var sql = "SELECT outboundId,state as detailState,name as productName,eslID,outbound_detail.remarks as detailRemarks,amount FROM outbound_detail,product WHERE  outbound_detail.outboundId IN("+sqlwhere+")  and outbound_detail.product_id = product.id and outbound_detail.isDelete = 0  and product.isDelete = 0;";
		outBoundDetailInstance.query(sql,function(err, detailrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				
					if(detailrows.length!=0){
					//	console.log("inBoundOrderAutoExportS2");
		var sql = "UPDATE outboundorder SET isDelete = 1,updateTime = '"+updateTime+"' WHERE id IN("+sqlwhere+");";
		outBoundOrderInstance.query(sql,function(err, dorows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				//console.log("update inBoundOrderAutoExportS3");
				
					if(dorows.length!=0){

					var sql = "UPDATE outbound_detail SET isDelete = 1,updateTime = '"+updateTime+"' WHERE outboundId IN("+sqlwhere+") and isDelete = 0;";
		outBoundDetailInstance.query(sql,function(err, ddrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				//console.log("update inBoundOrderAutoExport S4");
					if(ddrows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "order Delete";
								apiOutput.response = orderrows;	
								apiOutput.dresponse = detailrows;									
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "order not Delete";
							apiOutput.response = ddrows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "order not Delete";
							apiOutput.response = dorows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not found";
							apiOutput.response = detailrows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not found";
							apiOutput.response = orderrows;			
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