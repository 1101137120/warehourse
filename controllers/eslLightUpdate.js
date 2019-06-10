var eslInstance= require('../models/esl'); 

// Handle /2.4/v1/tags for GET
exports.postEsls = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var eslInstance = new EslInstance();	
	var proID = JSON.parse(req.body.proID);
	var productID ="";
	var color = "R";
	if(!proID)
	{
		customErr.message = "proID is null"
	}
	else
	{
		for(var i =0;i<proID.length;i++)
		{
			if(productID)
				productID = productID + ",";
			
			productID = productID + "'"+proID[i]+"'";
		}
	}
	
	if(!color)
	{
		customErr.message = "color is null"
	}
	
	
	if(color=="null")
	{
		color = 0;
	}
	else if(color=="R")
	{
		color = 1;
	}
	else if(color=="G")
	{
		color = 2;
	}
	else if(color=="B")
	{
		color = 3;
	}
	else
	{
		color = 0;
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
	
		var sql = "UPDATE esl SET lightStatus = "+color+",isUpdate = 0,failCount = 0,remarks = null WHERE isDelete = 0 and product_id  IN("+productID+");";
		console.log("light  "+ sql);
		eslInstance.query(sql,function(err, rows, fields) {
			console.log("sfsdf  "+rows);
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
								apiOutput.message = "esl Update";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not update";
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