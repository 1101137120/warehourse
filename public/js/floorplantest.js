var serverBaseUrl = document.domain+":9004";
var aaaa= Array();	



function init() {

	console.log("server base url:"+"http://"+serverBaseUrl);
	var socket = io.connect("http://"+serverBaseUrl);

	
	socket.on('connect', function () {


	});	
var tag_name="未命名";


	socket.on("channel1", function (readerObj) {
						
						
		var date = new Date(readerObj.created_at);
		var formatDate = date.getFullYear() + "-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate())+" "
		+addZero(date.getHours()) + ":" + addZero(date.getMinutes())+":"+addZero(date.getSeconds()); 
		
		console.log("讀到的地方"+readerObj.position);
		if(readerObj.position=="工程部"){
			readerObj.position="Engineering";
		}
		if(readerObj.position=="iHoin辦公室"){
			readerObj.position="ihoin";
		}
		if(readerObj.position=="中會議室"){
			readerObj.position="Mmeeting";
		}
		if(readerObj.position=="小會議室"){
			readerObj.position="Smeeting";
		}
		if(readerObj.position=="大會議室"){
			readerObj.position="Lmeeting";
		}
		if(readerObj.position=="庫房"){
			readerObj.position="Treasury";
		}
		if(readerObj.position=="餐廳"){
			readerObj.position="Restaurant";
		}
		if(readerObj.position=="行政"){
			readerObj.position="Admin";
		}
		if(readerObj.position=="展示廳"){
			readerObj.position="Showroom";
		}
		
		if(!$("#tr"+readerObj.tag_uid+" td:nth-child(1)").text()){
		var row = 
					"<tr id='tr"+readerObj.tag_uid+"'>"+
						"<td data-field='tag_uid'>"+readerObj.tag_uid+"</td>"+
						"<td data-field='tag_uid'>"+readerObj.tag_name+"</td>"+
						"<td data-field='last_modified'>"+formatDate+"</td>"+
						"<td data-field='last_modified'>"+readerObj.position+"</td>"+
					"</tr>";
					
		$("#table"+readerObj.position).append(row);	
		
		}else{
		if($("#tr"+readerObj.tag_uid+" td:nth-child(1)").text()==readerObj.tag_uid||"#trsearch"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(1)").text()==readerObj.tag_uid){
				console.log("抓到的UID相同");
				console.log($("#tr"+readerObj.tag_uid+" td:nth-child(3)").text());
				console.log(readerObj.position);
					if($("#trsearch"+readerObj.tag_uid+" td:nth-child(4)").text()==readerObj.position){
							$("#trsearch"+readerObj.tag_uid+" td:nth-child(3)").text(formatDate);
							
					}else{
							$("#trsearch"+readerObj.tag_uid+" td:nth-child(3)").text(formatDate);
							$("#trsearch"+readerObj.tag_uid+" td:nth-child(4)").text(readerObj.position);
					}
				
					if($("#tr"+readerObj.tag_uid+" td:nth-child(4)").text()==readerObj.position){
					console.log("地點一樣時間改變");
						$("#tr"+readerObj.tag_uid+" td:nth-child(3)").text(formatDate);
						}else{
						console.log("地點變更");
							$("#tr"+readerObj.tag_uid).remove();
							$("#"+readerObj.tag_uid).remove();
				var row = 
					"<tr id='tr"+readerObj.tag_uid+"'>"+
						"<td data-field='tag_uid'>"+readerObj.tag_uid+"</td>"+
						"<td data-field='tag_uid'>"+readerObj.tag_name+"</td>"+
						"<td data-field='last_modified'>"+formatDate+"</td>"+
						"<td data-field='last_modified'>"+readerObj.position+"</td>"+
					"</tr>";
					
		$("#table"+readerObj.position).append(row);	
						}
		}	
		}

		
			/*$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/tag_date",
						 data:{tag_uid:readerObj.tag_uid}
					})
					.success(function(msg) {*/
						//alert(JSON.stringify(msg));
						// console.log("tag id:"+JSON.stringify(msg.response[0].position));
						//console.log("msg:"+msg);
						//console.log("msg:"+JSON.stringify(msg));
						/*var date =new Date(msg.response[0].created_at);
						var intdate1 =date.getFullYear() +addZero(date.getMonth()+1)+addZero(date.getDate())+addZero(date.getHours())+addZero(date.getMinutes())+addZero(date.getSeconds());
						var date2 = new Date();
						var intdate2 = date2.getFullYear() +addZero(date2.getMonth()+1)+addZero(date2.getDate())+addZero(date2.getHours())+addZero(date2.getMinutes())+addZero(date2.getSeconds());
						var intdate3 =addZero(date2.getHours())+addZero(date2.getMinutes())+addZero(date2.getSeconds());
						if(intdate3=='000000'){
							$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/statereset"
					})
					.success(function(msg) {
					console.log(msg);
					
					})
						}*/
						
						
						/*var aas = parseInt(intdate2)-parseInt(intdate1);
						var day = parseInt(addZero(date2.getDate()))-parseInt(addZero(date.getDate()));
						var hour = parseInt(addZero(date2.getHours()))-parseInt(addZero(date.getHours()));
						var min = parseInt(addZero(date2.getMinutes()))-parseInt(addZero(date.getMinutes()));	
						console.log(parseInt(intdate2)-parseInt(intdate1));
						console.log(parseInt(intdate2));
						console.log(parseInt(intdate1));
						if(day==1&&hour<0){
									if(min<0){
										hour = parseInt(hour)+24-1;
										var delaytime = hour+"時";
									
									}else{
										hour = parseInt(hour)+24;
										var delaytime = hour+"時";
									}
									
								}
								else if(day==0)
								{
									if(min<0){
									hour = parseInt(hour)-1;
										console.log("再這day1");
									var delaytime = hour+"時";
									}else{
										console.log("再這day1");
									var delaytime = hour+"時";
									}
									
								}
								else if(day==1&&hour>0)
								{
									if(min<0){
									hour = parseInt(hour)-1;
										console.log("再這day1 h>0");
									var delaytime = hour+"時";
									
									}else{
										console.log("再這day1 h>0");
									var delaytime = hour+"時";
									}
									
								}
								
								else{
									
									var delaytime = "超過24小時";
								}
						console.log("時間計算"+delaytime+"天"+day+"時"+hour);
						//jjjjjjjjjjjjjjjjjjjj
						
						if(parseInt(intdate2)-parseInt(intdate1)>=3000000){
									$("#button"+readerObj.tag_uid).removeClass();
									$("#button"+readerObj.tag_uid).toggleClass( "btn btn-success btn-circle");
									if(!$("#tr"+readerObj.tag_uid+" td:nth-child(5)").text()){
									$("#tr"+readerObj.tag_uid).append("<td style='color:#41c928' data-field='last_modified'>沒電</td>");	
									}
									if($("#trcc"+readerObj.tag_uid).text()||$("#trbb"+readerObj.tag_uid).text()){
									$("#trcc"+readerObj.tag_uid).remove();
									$("#trbb"+readerObj.tag_uid).remove();
							}
								//這邊開始	
							if($("#traa"+readerObj.tag_uid).text()){
								if($("#traa"+readerObj.tag_uid+" td:nth-child(2)").text()!==readerObj.position){
								$("#traa"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								$("#traa"+readerObj.tag_uid+" td:nth-child(2)").text(readerObj.position);
								}else{
										$("#traa"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								}
								
									
							}else{
							
								var row = 
							"<tr id='traa"+readerObj.tag_uid+"'>"+
								"<td data-field='tag_uid'>"+readerObj.tag_name+"</td>"+
								"<td data-field='last_modified'>"+readerObj.position+"</td>"+
								"<td data-field='last_modified'>"+delaytime+"</td>"+
							"</tr>";
					
							$("#tabletagdelay3d").append(row);	
							
							}
							}
							if(3000000>parseInt(intdate2)-parseInt(intdate1)&&parseInt(intdate2)-parseInt(intdate1)>=30000){
							$("#button"+readerObj.tag_uid).removeClass();
								$("#button"+readerObj.tag_uid).toggleClass( "btn btn-danger btn-circle");
								if(!$("#tr"+readerObj.tag_uid+" td:nth-child(5)").text()){
								$("#tr"+readerObj.tag_uid).append("<td style='color:#c92828' data-field='last_modified'>注意</td>");
								}
								
								if($("#traa"+readerObj.tag_uid).text()||$("#trcc"+readerObj.tag_uid).text()){
									$("#traa"+readerObj.tag_uid).remove();
									$("#trcc"+readerObj.tag_uid).remove();
							}
							if($("#trbb"+readerObj.tag_uid).text()){
								if($("#trbb"+readerObj.tag_uid+" td:nth-child(2)").text()!==readerObj.position){
										$("#trbb"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								$("#trbb"+readerObj.tag_uid+" td:nth-child(2)").text(readerObj.position);	
								}else{
								
										if(parseInt($("#trbb"+readerObj.tag_uid+" td:nth-child(3)").text())>2){
											
										}
										$("#trbb"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								}
								
									
							}else{
							
								var row = 
							"<tr id='trbb"+readerObj.tag_uid+"'>"+
								"<td data-field='tag_uid'>"+readerObj.tag_name+"</td>"+
								"<td data-field='last_modified'>"+readerObj.position+"</td>"+
								"<td data-field='last_modified'>"+delaytime+"</td>"+
							"</tr>";
					
							$("#tabletagdelay3h").append(row);	
							
							}
							
							}
						if(30000>parseInt(intdate2)-parseInt(intdate1)&&parseInt(intdate2)-parseInt(intdate1)>=3000){
						$("#button"+readerObj.tag_uid).removeClass();
							console.log("進到工作");
							$("#button"+readerObj.tag_uid).toggleClass( "btn btn-warning btn-circle");
							if(!$("#tr"+readerObj.tag_uid+" td:nth-child(5)").text()){
							$("#tr"+readerObj.tag_uid).append("<td style='color:#FFE700' data-field='last_modified'>工作中</td>");
							}
							if($("#traa"+readerObj.tag_uid).text()||$("#trbb"+readerObj.tag_uid).text()){
									$("#traa"+readerObj.tag_uid).remove();
									$("#trbb"+readerObj.tag_uid).remove();
							}
							if($("#trcc"+readerObj.tag_uid).text()){
								if($("#trcc"+readerObj.tag_uid+" td:nth-child(2)").text()!==readerObj.position){
								$("#trcc"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								$("#trcc"+readerObj.tag_uid+" td:nth-child(2)").text(readerObj.position);
								}else{
										$("#trcc"+readerObj.tag_uid+" td:nth-child(3)").text(delaytime);
								}
								
									
							}else{
							
								var row = 
							"<tr id='trcc"+readerObj.tag_uid+"'>"+
								"<td data-field='tag_uid'>"+readerObj.tag_name+"</td>"+
								"<td data-field='last_modified'>"+readerObj.position+"</td>"+
								"<td data-field='last_modified'>"+delaytime+"</td>"+
							"</tr>";
					
							$("#tabletagdelay1h").append(row);	
							
							}
		
						}
						
						if(parseInt(intdate2)-parseInt(intdate1)<3000){
								if(!$("#tr"+readerObj.tag_uid+" td:nth-child(5)").text()){
								$("#tr"+readerObj.tag_uid).append("<td  data-field='last_modified'>正常</td>");
								$("#traa"+readerObj.tag_uid).remove();
								$("#trbb"+readerObj.tag_uid).remove();
								$("#trcc"+readerObj.tag_uid).remove();
								}
						}*/



			
			console.log("ihoin:"+$("#ihoin>div").size());
			console.log("Engineering:"+$("#Engineering>div").size());
			console.log("Mmeeting:"+$("#Mmeeting>div").size());

			//else{
				if(!$("#"+readerObj.tag_uid).text()){
				if(readerObj.position=="Smeeting"){
					var sss = 0;
				}else if(readerObj.position=="Mmeeting"){
					var sss = 1;
					
				}else if(readerObj.position=="Lmeeting"){
					var sss = 1;
				}else if(readerObj.position=="ihoin"){
					var sss = 2;
				}else if(readerObj.position=="Showroom"){
					var sss = 1;
				}
				else{
				var sss = 3;
				}
				if($("#"+readerObj.position+"data>div").size()>sss){
			if(!$("#more"+readerObj.position).text()){
			var item ='<div class="col-xs-4" style="z-index:1;  " id="more'+readerObj.position+'"><button  name="more"  type="button" class="btn btn-info btn-circle" data-toggle="modal" data-target="#myModal'+readerObj.position+'">more</button></div>';
			$("#"+readerObj.position+"data").append(item);
			}
		}else{
		$("#more"+readerObj.position+"data").remove();
		var item ='<div   class="col-xs-4"  id="'+readerObj.tag_uid+'"><button id="button'+readerObj.tag_uid+'" name="BBT" type="button" class="btn btn-info btn-circle">'+readerObj.tag_name+'</button></div>';
		console.log("有沒有到這邊賴"+readerObj.position);
								$("#"+readerObj.position+"data").append(item);
		
		}
					
								
								
				}else{
									
					if($("#tr"+readerObj.tag_uid+" td:nth-child(4)").text()!==readerObj.position){
									$("#"+readerObj.tag_uid).remove();
					console.log("fgfgfg");
										$("#more"+readerObj.position).remove();
					var item ='<div  class="col-xs-4" style="z-index:1;" id="'+readerObj.tag_uid+'"><button id="button'+readerObj.tag_uid+'"  type="button" class="btn btn-info btn-circle" data-toggle="modal" data-target="#myModal'+readerObj.position+'">'+readerObj.tag_name+'</button></div>';
			$("#"+readerObj.position+"data").append(item);	
					}
				
				}
				/*if($("#tr"+readerObj.tag_uid+" td:nth-child(1)").text()==readerObj.tag_uid){

				}else{
							if(!$("#"+readerObj.tag_uid).text())
							{
									var item ='<div  class="col-xs-4" id="'+readerObj.tag_uid+'"><button  id="button'+readerObj.tag_uid+'" name="BBT"  type="button" class="btn btn-info btn-circle">'+readerObj.tag_name+'</button></div>';
								$("#"+readerObj.position+"data").append(item);
							}
						$("#more"+readerObj.position+"data").remove();
						
							console.log("TAG位置不便"+$("#"+readerObj.tag_uid).text());
				}*/

					

			
				
		
		//tagdate})

		});
}
function addZero(n){
 return n < 10 ? '0' + n : '' + n;
}
$(document).on('ready', init);