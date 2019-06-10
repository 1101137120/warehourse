var apInstance= require('../models/ap'); 

// Handle /2.4/v1/tags for GET
exports.postAPs = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var apInstance = new APInstance();	
	var apID = req.body;
	console.log(apID[0].APIP);
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		var sql = "SELECT * FROM ap;";
		apInstance.query(sql,function(err, rows, fields) {
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
						var insertData = "";
						
						for(var i=0;i<apID.length;i++)
						{
							var isNull = false;
							console.log("length"+rows.length)
							for(var a=0;a<rows.length;a++)
							{
								console.log(apID[i].APIP+"a  "+rows[a].ip);
								console.log(apID[i].APIP+"insertSQL"+rows[a].ip);
								if(rows[a].ip == apID[i].APIP)
								{
									isNull = true;
									break;
								}

							}
							if(!isNull)
							{
								if(insertData)
									insertData = insertData + ",";
								
								insertData = insertData + "('"+apID[i].name+"','"+apID[i].APIP+"',0,0)";
							}
							
						}
						if(insertData!="")
						{
							var insertSQL = "INSERT INTO ap(Name,ip,status,isDelete) VALUES "+insertData;
								console.log("insertSQL"+insertSQL);
								apInstance.query(insertSQL,function(err, insertrows, fields) {
									if(err) 
									{
										console.log(JSON.stringify(err));
										customErr.status = 503;
										customErr.message = "db query error";		
										next(customErr);			
									}
									else
									{
											if(insertrows.length!=0){

														var apiOutput = {};
														apiOutput.status = "success";
														apiOutput.message = "ap Insert";
														apiOutput.response = insertrows;			
														res.json(apiOutput);	

											}else{
													var apiOutput = {};
													apiOutput.status = "fail";
													apiOutput.message = "ap not Insert";
													apiOutput.response = insertrows;			
													res.json(apiOutput);	
											
											}
												
									}
								});
						}
						else
						{
								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "AP found";
								apiOutput.response = rows;			
								res.json(apiOutput);
						}

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "AP not found";
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