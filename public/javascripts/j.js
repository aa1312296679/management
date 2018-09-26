function select(id){
	$(id + " span").click(function(){
		$(id + " ul").show(500);
		$(id  + " ul li").click(function(){
			$(id + " span").html($(this).html());
			$(id + " ul").hide(500);
		});
	});
}

$(document).ready(function(){
  select("#s1");
  select("#s2");
});
