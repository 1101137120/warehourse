var inBoundOrderInstance= require('../models/inboundorder'); 
var workerInstance= require('../models/worker'); 
// Handle /2.4/v1/tags for GET
exports.getInBoundOrders = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	console.log("inbound");
	//var inBoundOrderInstance = new InBoundOrderInstance();		
	//var workerInstance = new WorkerInstance();
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "SELECT inboundorder.id,CONCAT(inboundorder.date, ' ', inboundorder.time) as datetime,workerId,inboundorder.state,inboundorder.remarks,DATE_FORMAT(inboundorder.updateTime, '%Y-%m-%d %H:%i:%s') as updateTime,completeTime,count(inboundorder.id) as detailCount FROM warehouse.inboundorder left join inbound_detail on inboundorder.id = inbound_detail.inboundId WHERE inboundorder.isDelete =0 and inbound_detail.isDelete = 0 group by inboundorder.id;";
		inBoundOrderInstance.query(sql,function(err, inboundrows, fields) {
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
					if(inboundrows.length!=0){
						console.log("inboundrows");
					var sql = "SELECT id,name FROM warehouse.worker;";
					workerInstance.query(sql,function(err, rows, fields) {
							if(err) 
							{
								console.log(JSON.stringify(err));
								customErr.status = 503;
								customErr.message = "db query error";		
								next(customErr);			
							}else
							{
								console.log("fhh");
								for(var i=0;i<inboundrows.length;i++)
								{
									for(var a=0;a<rows.length;a++)
									{
										if(inboundrows[i].workerId == rows[a].id)
											inboundrows[i].workerName = rows[a].name;
									}

								}
								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "inboundorder found";
								apiOutput.response = inboundrows;			
								res.json(apiOutput);	
								
							}
							
					});

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inboundorder not found";
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