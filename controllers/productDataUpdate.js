var productInstance= require('../models/product'); 
var eslInstance= require('../models/esl'); 
// Handle /2.4/v1/tags for GET
exports.postProducts = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	var sqlData = "";
	var productID =  req.body.productID;
	if(!productID)
	{
		customErr.message = "product is null";
	}
	
	if(req.body.eslData)
	{
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "eslID = '"+req.body.eslData+ "'";
	}
	if(req.body.productName)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "name = '"+req.body.productName + "'";
	}
	if(req.body.productPrice)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "price = '"+req.body.productPrice + "'";
	}
	if(req.body.productShelf)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "shelf = '"+req.body.productShelf + "'";
	}
	if(req.body.stock)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "inStock = '"+req.body.stock + "'";
	}
	if(req.body.remark)
	{
		
		if(sqlData)
			sqlData = sqlData + " , ";
		sqlData	= sqlData + "remarks = '"+req.body.remark + "'";
	}

	if(!sqlData)
	{
		customErr.message = "Update Value Is Null";
	}
	customErr.status = 400;
	console.log(sqlData);
	//var productInstance = new ProductInstance();		
	//var eslInstance = new EslInstance();
	if(customErr.message !== "")
	{
		console.log("dddd" +customErr.message);
		next(customErr);	
	}
	else
	{
		var sql = "UPDATE  product SET  eslID = ''   WHERE   eslID = '"+req.body.eslData+"';";
		console.log(sql);
		productInstance.query(sql,function(err, rows, fields) {
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
						 sql = "UPDATE  product SET  "+sqlData+"   WHERE   id = '"+req.body.productID+"';";
						 console.log("sql  "+sql);
							productInstance.query(sql,function(err, updateRows, fields) {
								console.log("DDD");
								if(err) 
								{
									console.log(JSON.stringify(err));
									customErr.status = 503;
									customErr.message = "db query error";		
									next(customErr);			
								}
								else
								{
									
										if(updateRows.length!=0){

												 sql = "UPDATE esl SET esl.product_id= (SELECT id FROM product WHERE esl.product_id=product.id LIMIT 1);";
												 console.log("sql  "+sql);
													eslInstance.query(sql,function(err, updateERows, fields) {
														console.log("DDD");
														if(err) 
														{
															console.log(JSON.stringify(err));
															customErr.status = 503;
															customErr.message = "db query error";		
															next(customErr);			
														}
														else
														{
															
																if(updateERows.length!=0){

																			var apiOutput = {};
																			apiOutput.status = "success";
																			apiOutput.message = "product update";
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

										}else{
												var apiOutput = {};
												apiOutput.status = "fail";
												apiOutput.message = "product not update";
												apiOutput.response = rows;			
												res.json(apiOutput);	
										
										}
											
								}
							});
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

