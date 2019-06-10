var inBoundDetailInstance= require('../models/inbound_detail'); 

// Handle /2.4/v1/tags for GET
exports.postInBoundDetails = function(req, res,next) {
	console.log("postOutBoundDetails");
	var customErr = new Error();
	var errorMessages = new Array();
	var inBoundId = req.body.inBoundId;
	customErr.status = 400;
	//var inBoundDetailInstance = new InBoundDetailInstance();	
	
	if(!inBoundId){
		customErr.message = "inBoundId    is   null";
	}
	
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
		
		var sql = "select * from (select id as proID,eslID,product.name,price,shelf,remarks ,(product.inStock-ifnull(outboundproduct.Oamount,0)) as inStocknow from product left join (SELECT outbound_detail.product_id,sum(outbound_detail.amount)  as Oamount,outbound_detail.amount  FROM  outbound_detail WHERE outbound_detail.isDelete = 0  and outbound_detail.state = 1 group by outbound_detail.product_id) as outboundproduct on product.id =outboundproduct.product_id  WHERE product.isDelete = 0) as protable left join (SELECT product_id,amount,id as detailID,state,updateTime FROM warehouse.inbound_detail WHERE inboundId ='"+inBoundId+"' and isDelete = 0) as outtable on protable.proID = outtable.product_id;";
		console.log("sqldetaillist" + sql);
		inBoundDetailInstance.query(sql,function(err, rows, fields) {
			console.log("ININ");
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
				console.log("ININ YES");
					if(rows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "inbounddetail found";
								apiOutput.response = rows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "inbounddetail not found";
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