var Person = (function(){
	//静态常量
	var WIDTH , HEIGHT;//canvas长宽

	var self;
	var canvas , ctx;
	var sx , sy , ex , ey;//当前坐标
	var width = 25 , height = 45;//人物长宽
	var DX  = 10;//单位位移
	var direction = 'middle';//运动方向

	//constructor
	var init = function(c){
		self = this;

		canvas = c;
		ctx = canvas.getContext('2d');
		WIDTH = canvas.width;
		HEIGHT = canvas.height; 
		sx = 400 , sy = HEIGHT - height;
		ex = sx + width , ey = HEIGHT;
	};

	init.prototype = {
		draw:function(){
			ctx.save();
			ctx.clearRect(0,0,WIDTH,HEIGHT);
			var img = new Image();
			img.onload = function(){					
				ctx.drawImage(img, sx, sy);
				ctx.stroke();
			};
			switch(direction){
				case 'left':
					img.src = "/static/img/c_left.gif";
					break;
				case 'right':
					img.src = "/static/img/c_right.gif";
					break;
				case 'middle':
					img.src = "/static/img/c.gif";
					break;
				default:
					img.src = "/static/img/c.gif";
					break;
			};
			ctx.restore();
			self.move();
		},
		move:function(){
			switch(direction){
				case 'right':
					if( sx+DX > WIDTH-25/2 )
						break;
					sx += DX;
					ex += DX;
					break;
				case 'left':
					if( sx-DX < 0 )
						break;
					sx -= DX;
					ex -= DX;
					break;
				case 'middle':
					break;
				default:
					break;
			}
		},
		right:function(){
			direction = 'right';
		},
		left:function(){
			direction = 'left';
		},
		middle:function(){
			direction = 'middle';
		},
		//当前人物位置
		getRect:function(){
			return {sx:sx,sy:sy,ex:ex,ey:ey};
		},
		clear: function(){
			direction = null;
		}
	};

	return init;
})();
