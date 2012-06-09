var bounceball;
var BounceBall = function () {
	//静态常量
	var WIDTH = 800;//默认宽度
	var HEIGHT = 400-26;//默认高度
	
	var self;//对象本身
	var person;
	var balls = [];
	var intervals = [];//所有计时器
	var timeouts = [];
	var element;

	var init = function(e){
		self = this;

		element = e;
	}

	init.prototype = {
		//新建物体
		create:function(){
			//人物
			canvas_person = $('<canvas></canvas>').attr({
				width:WIDTH,
				height:HEIGHT
			});
			person = new Person(canvas_person[0]);
			$(element).append(canvas_person);

			//球
			for(var i=0;i<10;i++){
				self.timeout = setTimeout(function(){
					var canvas_ball = $('<canvas></canvas>').attr({
						width:WIDTH,
						height:HEIGHT
					});
					balls.push(new Ball(canvas_ball[0]));
					$(element).append(canvas_ball);
				}, i*3000);
				timeouts.push(self.timeout);
			};

			//计时器
			self.timer = new Timer($('#timer')[0]);
			self.timer.start();
		},
		start: function(){
			self.listen();
			self.create();
			//绘制
			person.draw();
			balls.forEach(function(ball){
				ball.draw();
			});
			self.run();
		},
		run: function(){
			self.interval = setInterval(function(){
				self.collision();
				balls.forEach(function(ball){
					ball.move();
					ball.draw();
				});
				person.draw();
			}, 16);
			intervals.push(self.interval);
		},
		//暂停
		pause:function(){
			clearInterval(self.interval);
			clearTimeout(self.timeout);
			self.timer.pause();
		},
		//恢复
		resume:function(){
			self.interval = setInterval(function(){
				self.collision();
				balls.forEach(function(ball){
					ball.move();
					ball.draw();
				});
				person.draw();
			}, 16);
			for(var i=balls.length-1;i<10;i++){
				self.timeout = setTimeout(function(){
					var canvas_ball = $('<canvas></canvas>').attr({
						width:WIDTH,
						height:HEIGHT
					});
					balls.push(new Ball(canvas_ball[0]));
					$(element).append(canvas_ball);
				}, i*4000);
				timeouts.push(self.timeout);
			};
			self.timer.resume();
			intervals.push(self.interval);
			self.listen();
			
		},
		//碰撞
		collision:function(){
			balls.forEach(function(ball){
				var range = person.getRect();
				var x = ball.x;
				var y = ball.y;
				if( x > range.sx && x < range.ex && y > range.sy && y < range.ey ){
					self.stop();
				}
			});
		},
		// 键盘事件绑定
		listen: function () {
			$(document).bind('keydown',function(e){
				switch(e.keyCode){
					case 37:
						person.left();
						break;
					case 39:
						person.right();
						break;
					default:
						person.middle();
						break;
				};
				//person.draw();
			});
			$(document).bind('keyup',function(e){
				person.middle();
			});
		},
		//清除计时器和物体
		clear: function(){
			intervals.forEach(function(interval){
				clearInterval(interval);
			});
			timeouts.forEach(function(timeout){
				clearTimeout(timeout);
			});
		//	clearTimeout(self.timeout);
			self.timer.stop();
			var n = balls.length;
			for (var i=n; i>0; --i){
				balls.pop();
			}
			n = intervals.length;
			for (var i=n; i>0; --i){
				intervals.pop();
			}
			person.clear();
			delete person;
			element = null;
		},
		//停止游戏
		stop: function () {
			$('h4').html($('#timer').html());
			$('#box').show();
			$('#pause').hide();
			self.clear();
			$(footer).hide();
		}
	};
	return init;
}();
