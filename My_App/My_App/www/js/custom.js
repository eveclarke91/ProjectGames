$(document).ready(function(){	

	/*$('.playbutton').click(function(){
		alert("test");
		window.location.href='menu.html';
		$('.startpage').hide();
		
	});*/


	$('.scoresubmit').click(function(){
	
		var score = 317;
		
		$.ajax({
			type: 'POST',
			data: 'data='+String(score),
			url: 'http://10.3.1.165:3000/save.php',
			success: function(data){
				console.log(data);
				alert(data);
				alert('Your data was successfully added');
			},
			error: function(){
				console.log(data);
				alert('There was an error adding your data');
			}
		});
		
		return false;
	
	});
	
});