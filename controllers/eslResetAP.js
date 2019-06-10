var eslInstance= require('../models/esl'); 

// Handle /2.4/v1/tags for GET
exports.postEsls = function(req, res,next) {
	var customErr = new Error();
	var errorMessages = new Array();
	customErr.status = 400;
	//var eslInstance = new EslInstance();
	var eslId = req.body.eslId;
	var eslData = req.body.eslData;
	console.log("Esls");
	if(customErr.message !== "")
	{
		next(customErr);	
	}
	else
	{
	/*var eslDeleteDataSQL = "";
	for(var i=0;i<eslId.length;i++)
	{
		if(eslDeleteDataSQL!="")
			eslDeleteDataSQL = eslDeleteDataSQL + ",";
		
		eslDeleteDataSQL  = eslDeleteDataSQL+"'"+eslId[i]+"'";
	}
	if(eslDeleteDataSQL=="")
		eslDeleteDataSQL = "Null";
	else
		eslDeleteDataSQL = "'"+eslDeleteDataSQL+"'";
		
		var sql = "DELETE FROM esl WHERE id IN("+eslDeleteDataSQL+")";
		//sql = "DELETE FROM esl WHERE id IN('99743450A0BB')";
		console.log("Esls"+sql);
		eslInstance.query(sql,function(err, rows, fields) {
			//console.log("DELETE"+rows.length);
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{*/
				//	if(rows){
	var eslInsertSQL = "INSERT INTO esl (id, APId,lightStatus,isDelete,isUpdate,failCount,product_id,remarks) VALUES  ";
	console.log("Esls"+eslInsertSQL);
	var InsertDataSQL = "";
	for(var i=0;i<eslData.length;i++)
	{
		if(InsertDataSQL!="")
			InsertDataSQL = InsertDataSQL + ",";
		
		if(eslData[i].productID)
			eslData[i].productID = "'"+eslData[i].productID+"'";
		
		if(!eslData[i].APId)
			eslData[i].APId = "Null";
		
		InsertDataSQL  = InsertDataSQL + "('" +eslData[i].id + "'," +eslData[i].APId + "," +eslData[i].lightStatus + "," +"0" + "," +"1" + "," +"0" + "," +eslData[i].productID + ","+ "null"+")";
	}
		eslInsertSQL = eslInsertSQL+InsertDataSQL+"ON DUPLICATE KEY UPDATE id = VALUES(id),APId = VALUES(APId),isDelete = VALUES(isDelete),isUpdate = VALUES(isUpdate),failCount = VALUES(failCount),product_id = VALUES(product_id),remarks = VALUES(remarks)";
		console.log("Esls"+eslInsertSQL);
		if(InsertDataSQL!=""){
			eslInstance.query(eslInsertSQL,function(err, Inrows, fields) {
			
			if(err) 
			{
				console.log(JSON.stringify(err));
				customErr.status = 503;
				customErr.message = "db query error";		
				next(customErr);			
			}
			else
			{
					if(Inrows.length!=0){

								var apiOutput = {};
								apiOutput.status = "success";
								apiOutput.message = "esl found";
								apiOutput.response = Inrows;			
								res.json(apiOutput);	

					}else{
							var apiOutput = {};
							apiOutput.status = "fail";
							apiOutput.message = "esl not found";
							apiOutput.response = Inrows;			
							res.json(apiOutput);	
					
					}
						
			}
		});

		}
				else
				{
												var apiOutput = {};
											apiOutput.status = "fail";
											apiOutput.message = "esl not Insert";
											apiOutput.response = rows;			
											res.json(apiOutput);
				}
										
		//	}
		//});



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