$(document).ready(function(){
	var bounceball = new BounceBall($('#game')[0]);
	var pause_state, music_onoff = true;
	var audio = $("#audio-music")[0];
	$('#start').click(function(){
		bounceball.start();
		$('#show').css('display','none');
		$('#pause').css('display','block');
		$('#time').css('display','block');
		audio.src = "music/caihongdao.mp3";
		pause_state = false;
	});
	$('#pause').click(function(){
		if (!pause_state){
			$('#pause').css('background', 'url(img/start.png)');
			bounceball.pause();
			pause_state = true;
			audio.pause();
		}
		else if (pause_state){
			$('#pause').css('background', 'url(img/pause.png)');
			bounceball.resume();
			pause_state = false;
			audio.play();
		}
	});
	$('#agin').click(function(){
		$('canvas').remove();
		bounceball = null;
		bounceball = new BounceBall($('#game')[0]);
		bounceball.start();
		pause_state = false;
		$('#box').hide();
		$('#pause').show();
	});
	$('#submit').click(function(){
		$('#box').hide();
		$("#box_submit").show();

	});
	$('#exit').click(function(){
		$('canvas').remove();
		bounceball = null;
		bounceball = new BounceBall($('#game')[0]);
		$('#box').hide();
		$('#show').show();
	});
	$('#ok').click(function(){
		$('#box_submit').hide();
		$('#box').show();
	});
	
	$('#music').click(function(){
		if (music_onoff){
			$('#music').css('background', 'url(img/music_off.png)');
			audio.pause();
			music_onoff = false;
		}
		else{
			$('#music').css('background', 'url(img/music_on.png)');
			audio.play();
			music_onoff = true;
		}
	});
});
