var serverBaseUrl = document.domain+":9004";
function init() {
	
	console.log("server base url:"+"http://"+serverBaseUrl);
	var socket = io.connect("http://"+serverBaseUrl);

	socket.on('connect', function () {


	});	

	socket.on("channel2", function (readerObj) {
	for(var i=0;i<readerObj.length;i++){
		console.log("2.4頁面receive"+JSON.stringify(readerObj));
 		console.log("get the reader name:"+readerObj[i].reader_name);	
		
		$("#readerTable tr").css('background','#FFFFFF');
		console.log("did I get readerTable:"+$("#readerTable").length);
		//adding color
		$("#"+readerObj[i].reader_name).css('background-color','#FFE700');
		/*if(readerObj.wrong_packet ==="1")
		{
			$("#"+readerObj.reader_name).css('background-color','#FF0000');
		
		}*/
		//console.log("position:"+readerObj.position);
		//console.log("tag_state:"+readerObj.tag_state);
		//position column
		//$("#"+readerObj.tag_uid+" td:nth-child(4)").text(readerObj.position);
		var date2 = new Date();
		var date = new Date(readerObj[i].create_at);
		var formatDate = date.getFullYear() + "-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate())+" "
		+addZero(date.getHours()) + ":" + addZero(date.getMinutes())+":"+addZero(date.getSeconds()); 
		var countDate = date.getFullYear() +addZero(date.getMonth()+1)+addZero(date.getDate())+addZero(date.getHours())+addZero(date.getMinutes())+addZero(date.getSeconds()); 
		var countDate2 = date2.getFullYear() +addZero(date2.getMonth()+1)+addZero(date2.getDate())+addZero(date2.getHours())+addZero(date2.getMinutes())+addZero(date2.getSeconds()); 
		if(readerObj[i].state===0){
		
				var state ="待開啟";
		
		}else{
		
				var state ="開啟";
		}
		
		/*var ssss= Date.parse(formatDate).valueOf()-Date.parse(new Date()).valueOf();
		if(!$("#"+readerObj[i].tag_uid+" td:nth-child(3)").val()&&!formatDate){
		
				var state ="未啟用";
		
		}
		if(ssss>200000){		
				var state ="未偵測";
		
		}*/
		
		
		//$("#"+readerObj.tag_uid+" td:nth-child(5)").text(readerObj.tag_state);
		if(parseInt(countDate2)-parseInt(countDate)>10){
		$("#"+readerObj[i].tag_uid).hide();
		console.log("hide~~~~~~~~~~~~~~~~~~");
		
		
		}else{
		$("#"+readerObj[i].tag_uid+" td:nth-child(2)").text(readerObj[i].reader_name);
		$("#"+readerObj[i].tag_uid+" td:nth-child(3)").text(formatDate);
		$("#"+readerObj[i].tag_uid+" td:nth-child(4)").text(state);
		console.log("SHOW~~~~~~~~~~~~~~~~~~");
		$("#"+readerObj[i].tag_uid).show();
		}
		
		
		//$("#"+readerObj[i].tag_uid).css('background-color','#FFE700');
		//tag name column
		//$("#"+readerObj.reader_name+" td:nth-child(3)").text(readerObj.tag_name);
		
/* 		//tag uid column
		$("#"+readerObj.reader_name+" td:nth-child(4)").text(readerObj.tag_uid);
		
		//strength column
		$("#"+readerObj.reader_name+" td:nth-child(5)").text(readerObj.strength);
		
		
		var date = new Date(readerObj.created_at);
		var formatDate = date.getFullYear() + "-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate())+" "
		+addZero(date.getHours()) + ":" + addZero(date.getMinutes())+":"+addZero(date.getSeconds());                                
		
		//created at column
		$("#"+readerObj.reader_name+" td:nth-child(6)").text(formatDate);
		 */
		
		
		}
	});


	var protocol = location.protocol;
	var hostname = location.hostname;
	$.ajax({
		 type: "GET",
		 //url: "http://10.1.1.77:9004/2.4/v1/readers ",
		 //url: "http://1.163.240.170:9004/2.4/v1/readers ",
		 url: protocol+"//"+hostname+":9004/2.4/v1/tagaa",
	})
	.success(function( msg ) {
		//alert(JSON.stringify(msg));
		//msg.response
		
		var readerArray = msg.response;
		console.log("readerArray:"+JSON.stringify(readerArray));
		for(var i=0;i<readerArray.length;i++)
		{
			
			/*if(readerArray[i].tag_name.trim() !== "")
			{*/
				if(readerArray[i].state ===0){
					var state="待開啟";
					
				}else{
					
					var state="開啟";
				}
				
				
				
				var row = 
					"<tr id='"+readerArray[i].tag_uid+"'>"+
					/*	"<td data-field='tag_id'>"+readerArray[i].id+"</td>"+
						"<td data-field='tag_name'>"+readerArray[i].tag_name+"</td>"+*/
						"<td data-field='tag_uid'>"+readerArray[i].tag_uid+"</td>"+
						"<td data-field='newest_position'></td>"+
						"<td data-field='last_modified'></td>"+
						"<td data-field='newest_state'>"+state+"</td>"+
						"<td data-field='statebtu"+i+"'><button type='button' class='btn btn-default' id='state"+i+"' onclick='statecha("+readerArray[i].id+","+readerArray[i].state+");'>切換</button></td>"+
						//"<td data-field='statebtu"+i+"'><button type='button' id='state"+i+"'>切換</button></td>"+
					"</tr>";
					console.log(row);
					
				$("#readerTable tbody").append(row);
				$("#"+readerArray[i].tag_uid).hide();
				var tag_id = readerArray[i].id;
				var tag_uid = readerArray[i].tag_uid;

				(function(tag_uid){
					$.ajax({
						 type: "POST",
						 url: protocol+"//"+hostname+":9004/2.4/v1/tag_animal_position",
						 data:{tag_id:tag_id}
					})
					.success(function(msg) {
						//alert(JSON.stringify(msg));
						// console.log("tag id:"+JSON.stringify(msg.response[0].position));
						console.log("最後更新時間："+JSON.stringify(msg));
						console.log("tag_uid:"+tag_uid);
						if(msg.response[0].state===1){
						var state = '開啟';
						}else{
						
						var state = '關閉';
						}					
						
						$("#"+tag_uid+" td:nth-child(2)").text(msg.response[0].reader_name);
						//$("#"+tag_uid+" td:nth-child(5)").text(state);
						var date = new Date(msg.response[0].create_at);
						console.log('QQQQQQq'+date);
						var formatDate = date.getFullYear() + "-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate())+" "
						+addZero(date.getHours()) + ":" + addZero(date.getMinutes())+":"+addZero(date.getSeconds()); 
						
						$("#"+tag_uid+" td:nth-child(3)").text(formatDate);
										

					})
					.fail(function() {
							console.log("error");
					})
					.always(function() {
							console.log("complete")
					});					
				
				})(tag_uid);				
			}


			
			
			
		
			
			
			
			
			

		
		//}
		
		//}
	

	})
	.fail(function() {
			console.log("error");
	})
	.always(function() {
			console.log("complete")
	});

}

function statecha(tag_id,tag_state){
console.log(tag_id);
		$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/tag_state",
						 data:{tag_id:tag_id,tag_state:tag_state}
					})
					.success(function(msg) {
						//alert(JSON.stringify(msg));
						// console.log("tag id:"+JSON.stringify(msg.response[0].position));
						console.log("最後更新時間："+JSON.stringify(msg));
						console.log("msg:"+msg);
					
						

					})
		
		}

function addZero(n){
 return n < 10 ? '0' + n : '' + n;
}
$(document).on('ready', init);