$(function(){
					  var leftDiv = $(".sys_content_left");
					  var rightDiv = $(".sys_content_right");
					  var maxHeight = Math.max(leftDiv.height(), rightDiv.height());
						leftDiv.height(maxHeight);
						rightDiv.height(maxHeight);
});