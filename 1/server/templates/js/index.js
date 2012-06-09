$(document).ready(function(){
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection;

	//进入游戏
	$('#id_join').click(function(){
		connection = new WebSocket('ws://127.0.0.1:8000');

		connection.onopen = function () {
			//注册用户信息
			connection.send('register:'+$('#id_username').val());
			window.sessionStorage.setItem('username',$('#id_username').val());
			//寻找同伴
			$('.modal-body').empty().html('<img src="/static/img/load.gif" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h3 style="display:inline">Loadding......</h3>');
			$('#id_join').attr('disabled','disabled').unbind('click');
		};

		connection.onerror = function (error) {
		};

		connection.onmessage = function (message) {
			switch( message.data.split(':')[0] ){
				case 'find':
					//重定向到游戏页面
					window.location = '/game';
					break;
			}
			console.log(message);
		};
	});
	//重置
	$('#id_restore').click(function(){
		$('#id_username').val('');
	});
});
