var productInstance= require('../models/product'); 

// Handle /2.4/v1/tags for GET
exports.postProducts = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	var myQueryArray =[];
	customErr.status = 400;
	var ID =  req.body.ID;
	var name =  req.body.name;
	var price =  req.body.price;
	var shelf =  req.body.shelf;
	var stock =  req.body.stock;
	var remark =  req.body.remark;
	console.log("name"+name);
	if(!name)
	{
		customErr.message = "name is null";
	}
	if(!price)
	{
		customErr.message = "price is null";
	}
	if(!shelf)
	{
		customErr.message = "shelf is null";
	}
	if(!stock)
	{
		customErr.message = "stock is null";
	}
	//var productInstance = new ProductInstance();		
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
	console.log("SQLstart");
		var sql = "INSERT INTO product (id,name,price,shelf,inStock,isDelete,remarks) VALUES ('"+ID+"','"+name+"',"+price+",'"+shelf+"',"+stock+",0,'"+remark+"');";
		productInstance.query(sql,function(err, rows, fields) {
			console.log("SQLsIMIMs");
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
								apiOutput.message = "product Insert";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "product not Insert";
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