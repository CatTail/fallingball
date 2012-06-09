$(document).ready(function(){
	var bounceball = new BounceBall($('#game')[0]);
	var pause_state, music_onoff = true;
	$('#start').click(function(){
		bounceball.start();
		$('#show').css('display','none');
		$('#pause').css('display','block');
		$('#time').css('display','block');
		$("#music").pause();
		pause_state = false;
	});
	$('#pause').click(function(){
		if (!pause_state){
			$('#pause').css('background', 'url(img/start.png)');
			bounceball.pause();
			pause_state = true;
		}
		else if (pause_state){
			$('#pause').css('background', 'url(img/pause.png)');
			bounceball.resume();
			pause_state = false;
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
			$('#audio-music')[0].pause();
			music_onoff = false;
		}
		else{
			$('#music').css('background', 'url(img/music_on.png)');
			$('#audio-music')[0].play();
			music_onoff = true;
		}
	});
});
