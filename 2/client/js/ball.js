var Ball = (function(){
	//静态常量
	var WIDTH , HEIGHT;

	//constructor
	var init = function(canvas){
		//实例常量
		this.radius= Math.floor(Math.random()*30) + 8;;//半径
		this.DX = 2;//单位X位移
		this.DY = 4;//单位Y位移

		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.x = Math.floor(Math.random()*2)*WIDTH;
		this.y = Math.floor(Math.random()*HEIGHT/2);//当前位置
	};

	//instance field
	init.prototype = {
		//移动 
		move:function(){
			this.changeDir();
			this.x += this.DX;
			this.y += this.DY;
		},
		//绘制
		draw:function(){
			this.ctx.save();
			this.ctx.clearRect(0,0,WIDTH,HEIGHT);
			this.ctx.lineWidth = 3;
			this.ctx.beginPath();
			this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
			this.ctx.closePath();
			this.ctx.stroke();
			this.ctx.restore();
		},
		//改变方向
		changeDir:function(){
			this.x + this.DX > WIDTH ? this.left() : 0;
			this.x + this.DX < 0 ? this.right() : 0;
			this.y + this.DY > HEIGHT ? this.up() : 0;
			this.y + this.DY < 0 ? this.down() : 0;
		},
		up:function(){
			//DY为负
			this.DY = this.DY < 0 ? this.DY : -this.DY;
		},
		down:function(){
			//DY为正
			this.DY = this.DY > 0 ? this.DY : -this.DY;
		},
		left:function(){
			//DX为负
			this.DX = this.DX < 0 ? this.DX : -this.DX;
		},
		right:function(){
			//DX为正
			this.DX = this.DX > 0 ? this.DX : -this.DX;
		}
	};

	return init;
})();
