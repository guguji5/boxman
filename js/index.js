$(function(){
		    
	Game.drawmap();
	Game.drawbox();
	Game.drawtort();
	move(Game.tort);
	
})	
//人物移动
function move(tort){
	console.log(Game.box.length)
	$(document).bind("keydown",function(e){
		switch (e.which)
		{
			case 37://左
			$(".tort").css("backgroundPosition","-150px 0px")
			tort.x--;
			if(Game.checkKnockWall()){tort.x++}//如果撞墙了，就往回退一步
			
				for(var i=0;i<Game.box.length;i++)
				{   if(Game.checkKnockBox()){//如果装着箱子，就把箱子也向前走一步
						if(Game.XYcheck({x:tort.x,y:tort.y},Game.box[i]))
						{
							$(".box").eq(i).css("left",--Game.box[i].x*50+"px")
						}
						if(Game.checkBoxWall()==i||Game.checkBoxBox()>Game.box.length){
						tort.x++;
						$(".box").eq(i).css("left",++Game.box[i].x*50+"px")
						}
				}
					
				}
			break;
			case 38://上
			$(".tort").css("backgroundPosition","0px 0px")
			tort.y--
			if(Game.checkKnockWall()){tort.y++}
			for(var i=0;i<Game.box.length;i++)
			{ 
				if(Game.checkKnockBox()){//如果装着箱子，就把箱子也向前走一步
					if(Game.XYcheck({x:tort.x,y:tort.y},Game.box[i]))
					{
						$(".box").eq(i).css("top",--Game.box[i].y*50+"px")
					}
					if(Game.checkBoxBox()>Game.box.length||Game.checkBoxWall()==i){
						
						tort.y++;
						$(".box").eq(i).css("top",++Game.box[i].y*50+"px")
						}
				}	
			}
			
			break;
			case 39://右
			$(".tort").css("backgroundPosition","-50px 0px")
			tort.x++
			if(Game.checkKnockWall()){tort.x--};
			for(var i=0;i<Game.box.length;i++)
			{ 
				if(Game.checkKnockBox()){//如果装着箱子，就把箱子也向前走一步
						if(Game.XYcheck({x:tort.x,y:tort.y},Game.box[i]))
						{
							$(".box").eq(i).css("left",++Game.box[i].x*50+"px")
						}
						if(Game.checkBoxWall()==i||Game.checkBoxBox()>Game.box.length){
						tort.x--;
						$(".box").eq(i).css("left",--Game.box[i].x*50+"px")
						}
				}
				
			}
			break;
			case 40://下
			$(".tort").css("backgroundPosition","-100px 0px")
			tort.y++
			if(Game.checkKnockWall()){tort.y--}
			for(var i=0;i<Game.box.length;i++)
			{
				 if(Game.checkKnockBox()){//如果装着箱子，就把箱子也向前走一步
						if(Game.XYcheck({x:tort.x,y:tort.y},Game.box[i]))
						{
							$(".box").eq(i).css("top",++Game.box[i].y*50+"px")
						}
						if(Game.checkBoxWall()==i||Game.checkBoxBox()>Game.box.length){
						tort.y--;
						$(".box").eq(i).css("top",--Game.box[i].y*50+"px")
						}
				 }
				
			}

			break;
			}
		Game.drawtort(Game.tort);
		Game.passMission();
		})
	}
var Game={
	//地图的布局
	map:[   0,1,1,1,1,1,1,1,0,
			0,1,2,2,2,2,2,1,0,
			0,1,2,2,2,2,2,1,1,
			1,1,2,2,2,2,2,3,1,
			1,2,2,2,2,2,3,3,1,
			1,2,2,2,2,2,2,2,1,
			1,2,2,2,1,1,1,1,1,
			1,1,1,1,1,0,0,0,0
		],
	map1:[0,0,1,1,1,1,0,0,
		  0,0,1,3,3,1,0,0,
		  0,1,1,2,3,1,1,0,
		  0,1,2,2,2,3,1,0,
		  1,1,2,2,2,2,1,1,
		  1,2,2,1,2,2,2,1,
		  1,2,2,2,2,2,2,1,
		  1,1,1,1,1,1,1,1],
	//地图生成
	drawmap:function(){
		$(".map0,.map1,.map2,.map3").remove()
		for(var i=0;i<Game.map.length;i++)
		{
			$(".wrap").append("<div class='map"+this.map[i]+"'></div>")
			}
		
		},
	//box 的位置
	 box:[{x:2,y:4},
	 	  {x:3,y:3},
	 	  {x:5,y:4}
	 	  ],
	box1:[{x:4,y:3},{x:3,y:4},{x:4,y:5},{x:5,y:5}],
	 drawbox:function(){
		 $(".box").remove()
		for(var i=0;i<Game.box.length;i++){	
		 	$box=$("<div class='box'></div>")
			$(".wrap").append($box)
			
			$box.css({"left":this.box[i].x*50+"px",
					  "top":this.box[i].y*50+"px"
					  }); 
			}
		
		 },
	//tort的位置
	 tort:{x:3,y:1},
	 tort1:{x:3,y:6},
	 drawtort:function(){
		    $(".tort").css({"left":this.tort.x*50+"px",
					  "top":this.tort.y*50+"px"
					  }); 
		 },
	//碰撞检测（乌龟与墙）
	checkKnockWall:function(){
		if(this.map[this.tort.x+this.tort.y*(this.map.length/8)]==1)
		{
			return true
			}
		},
	//坐标判断
	XYcheck:function(json1,json2)
	{
		if(json1.x==json2.x&&json1.y==json2.y){
			
			return true}
		},
	//碰撞检测（乌龟与箱子）
	checkKnockBox:function(){
		var num=0;
		for(var i=0;i<this.box.length;i++){
			if(this.XYcheck({x:Game.tort.x,y:Game.tort.y},this.box[i]))
			{
				num++;
				}
		if(num>0){
			
			return true}
		}
		
		},
	checkWhichBox:function(){
		for(var i=0;i<this.box.length;i++)
		{
			if(this.XYcheck({x:Game.tort.x,y:Game.tort.y},this.box[i])){return i}
			}
		},
	//碰撞检测（箱子与墙）
	checkBoxWall:function(){
		for(var i=0;i<this.box.length;i++){
			if(this.map[this.box[i].x+this.box[i].y*(this.map.length/8)]==1){
				return i;
				}
			}
		},
	//碰撞检测（箱子与箱子）
	checkBoxBox:function(){
		var num=0;
		for(var i=0;i<this.box.length;i++){
			for(var j=0;j<this.box.length;j++){
				if(this.XYcheck(this.box[i],this.box[j]))
				{
					num++;}
				}
			}
			return num;
		},
	passMission:function(){
		var num=0;
		for(var i=0;i<Game.box.length;i++)
		{
			if(this.map[this.box[i].x+this.box[i].y*this.map.length/8]==3){num++;}
			}
		if(num==Game.box.length)
		{
			alert("congratulation")
			$(".wrap").css({"width":"400px","height":"400px"})
			this.map=this.map1;
			this.box=this.box1;	
			this.tort=this.tort1;
			Game.drawmap();
			Game.drawbox();
			Game.drawtort();
			$(document).unbind("keydown");
			move(this.tort);
			}
		}

	}