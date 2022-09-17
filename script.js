let cvs=document.getElementById("canvas");
let ctx=cvs.getContext("2d"); //2d shape

let box=32;

let move;

let score=0;

let sound=true;

//images
let ground=new Image();
ground.src="ground.jpg";

let food=new Image();
food.src="food.png";
let gameover=new Image();
gameover.src="gameover.png";






//sound
let dead=new Audio();
dead.src="dead.mp3";
let up=new Audio();
up.src="up.mp3";
let down=new Audio();
down.src="down.mp3";
let left=new Audio();
left.src="left.mp3";
let right=new Audio();
right.src="right.mp3";
let eat=new Audio();
eat.src="eat.mp3";


//snake array
let snake=[];
snake[0]=
{
	x:4*32,
	y:7*32
}

let foodi=
{
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
}
	
//event listener
document.addEventListener("keydown",function(event)
{
	
	if(event.keyCode==37 && move!="right")
	{
		if (sound)
		{
		left.play();
		}
		move="left";
	}
	else if(event.keyCode==38 && move!="down")
	{
		if (sound)
		{
		up.play();
		}
		move="top";
		
	}
	else if(event.keyCode==39 && move!="left")
	{
		if(sound)
		{
		right.play();
		}
		move="right"; 
	}
	else if(event.keyCode==40 && move!="top")
	{
		if(sound){
	down.play();
	}
		move="down";
	}
	
	console.log(move);

}
)

function draw()
{
for(let i=0;i<snake.length;i++)
{
	ctx.fillStyle=(i==0) ? "black":"pink";
	//for one black one pink uncomment this code.
	//if(i%2==0)
		
	//{
		//ctx.fillStyle="black";
	//}
ctx.fillRect(snake[i].x,snake[i].y,box,box);
//border in boxes
ctx.strokeStyle="#000000";
ctx.strokeRect(snake[i].x,snake[i].y,box,box);
}
//old position
let snakeX=snake[0].x;
let snakeY=snake[0].y;

if (move=="left" )
{
	snakeX-=box;
}
else if(move=="top" )
{
	snakeY-=box;
}
else if(move=="right" )
{
	snakeX+=box;
}
else if(move=="down")
{
	snakeY+=box;
}
//newhead of snsake
let newHead=
{
	x:snakeX,
	y:snakeY,

}
if (snakeX==foodi.x && snakeY==foodi.y)
{   eat.play();
	score++;
foodi.x	=Math.floor(Math.random()*17+1)*box,
foodi.y =Math.floor(Math.random()*15+3)*box

}
else
{
	snake.pop();
}
//snake collision function
function collision(head,array)
{
	for(let i=0;i<array.length;i++)
	{
		if(newHead.x==array[i].x && newHead.y == array[i].y)
		{
			return true;
		}
		
	}
	return false;
}
function reptile()
{
let reptile1=document.getElementById("reptile1");

let reptile2=document.getElementById("reptile2");	

reptile1.style.display="block";
reptile2.style.display="block";
	
}
//game over wall collison and snake collision
if(snakeX<box || snakeX> box*17 || snakeY< box*3 || snakeY> box*17 || collision(newHead,snake))
	
{
	reptile();
	dead.play();
	clearInterval(game);
	ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200);
	sound=false;
}


snake.unshift(newHead);
//score
ctx.fillStyle="#ffffff";
ctx.font="40px impact";
ctx.fillText(score,box*2.2,box*1.6)
ctx.drawImage(food,0,0,box,box,foodi.x,foodi.y,box,box);

}
function loop()
{
ctx.drawImage(ground,0,0,608,608,0,0,608,608);
draw();
}
let game=setInterval(loop,100); //to call loop function after 100ms //increase speed of snake