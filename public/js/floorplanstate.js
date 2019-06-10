var tag_uid={};
 $(function(){
	$("#buttonsearch").on("click",function(){
console.log("點及");
var aaa = $("#searchname").val();
$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/tag_uidsearch",
						 data:{tag_name:aaa}
					})
					.success(function(msg) {
					if($("#tablesearch tr").text()){
					$("#tablesearch tr:eq(1)").remove();
						var row = 
					"<tr id='trsearch"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(1)").text()+"'>"+
						"<td data-field='tag_uid'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(1)").text()+"</td>"+
						"<td data-field='tag_uid'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(2)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(3)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(4)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(5)").text()+"</td>"+
					"</tr>";
					
		$("#tablesearch").append(row);
		$("#myModalsearch").modal('show');
					}else{
						alert('未有資料');
					}
						
})




})
//$("#app div:nth-child(2)").on("click","button:not([name=more])",function(){
$("#app").children('div').on("click","div button:not([name=more])",function(){
		rra($(this).text());
						
})


function rra(aaa){
	$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/tag_uidsearch",
						 data:{tag_name:aaa}
					})
					.success(function(msg) {
					if($("#tablesearch tr").text()){
					$("#tablesearch tr:eq(1)").remove();
						var row = 
					"<tr id='trsearch"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(1)").text()+"'>"+
						"<td data-field='tag_uid'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(1)").text()+"</td>"+
						"<td data-field='tag_uid'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(2)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(3)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(4)").text()+"</td>"+
						"<td data-field='last_modified'>"+$("#tr"+msg.response[0].tag_uid+" td:nth-child(5)").text()+"</td>"+
					"</tr>";
					
		$("#tablesearch").append(row);
		$("#myModalsearch").modal('show');
					
					}else{
						alert('未有資料');
					}
})
}


$("ul.nav").on("click","li:eq(3)",function(){
console.log("AAAAAAADDDDDDDDD");
var dd=0;
$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/statedata"
					})
					.success(function(msg) {
						$("#tabletagstate").empty();
					for(var i=0;i<msg.response.length;i++){
					var row="<tr id='trstate"+msg.response[i].tag_uid+"'>"+
							"<td data-field='tag_uid'>"+msg.response[i].tag_name+"</td>"+
					"</tr>";
					tag_uid[i]=msg.response[i].tag_uid;
					$("#tabletagstate").append(row);	
						console.log("AAAAAAADDDDDDDDDs");
					$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/aaa",
						 data:{tag_uid:msg.response[i].tag_uid}
					})
					.success(function(msg) {
						var row2="<td data-field='tag_uid'>"+msg.response[0].created_at+"</td>";
						$("#trstate"+msg.response[0].tag_uid).append(row2);
					
					})
					/*if(msg.response[i].state=='0'){
					
						var state="請假";
					}*/
					
					}
						
					

})

})


$("#aaaaa").on("click",function(){
console.log("AAAAAAADDDDDDDDD");
$.ajax({
						 type: "POST",
						 url: location.protocol+"//"+location.hostname+":9004/2.4/v1/statereset"
					})
					.success(function(msg) {
					console.log(msg);
					
					})

})



})






