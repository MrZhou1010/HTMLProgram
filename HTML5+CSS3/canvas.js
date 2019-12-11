/* 绘制矩形 */
function drawRect(id) {
	// body...
	var canvas = document.getElementById(id);
	var context = canvas.getContext('2d');
	context.fillStyle = "#000";
	context.strokeStyle = "#f60";
	context.lineWidth = 5;
	context.fillRect(5,5,300,200);
	context.strokeRect(50,50,180,120);
}
/* 绘制圆形 */
function drawArc(id){
	// body...
	var canvas = document.getElementById(id);
	var context = canvas.getContext('2d');
	context.fillStyle = '#f1f2f3';
	context.fillRect(0,0,500,500);
	for (var i = 0; i < 10; i++) {
		context.beginPath();
		context.arc(30*i,30*i,10*i,0,Math.PI*2,true);
		context.closePath();
		context.fillStyle = 'rgba(255,0,0,0.25)';
		context.fill();
		context.strokeStyle = "#f60";
		context.stroke();
	}
}
/* 绘制文字 */
function drawText(id) {
	// body...
	var canvas = document.getElementById(id);
	var context = canvas.getContext('2d');
	context.fillStyle = 'green';
	context.fillRect(0,0,500,500);
	context.fillStyle = 'white';
	context.strokeStyle = 'white';
	context.font = "normal 36px '微软雅黑','宋体'";
	//textBaseline文字垂直对齐方式：top(顶部对齐)、hanging(悬挂)、middle(中间对齐)、bottom(底部对齐)、alphabetic默认值
	context.textBaseline = "top";
	//textAlign文字水平对齐方式:start、end、left、right、center
	context.textAlign = "left";
	//fillText(text,x,y,[maxwidth]),maxwidth防溢出,text会压缩在maxwidth内显示,可以省略则没有溢出限制
	context.fillText("HTML5 canvas练习",0,0,500);
	context.strokeText("HTML5 canvas练习",80,180);
}
/* 保存文件 */
function drawSave(id) {
	// body...
	var canvas = document.getElementById(id);
	var context = canvas.getContext('2d');
	context.fillStyle = 'green';
	context.fillRect(0,0,500,500);
	window.location = canvas.toDataURL('image/jpeg');
}
/* 绘制动画 */
var context;
var width,height;
var	i;
function drawAnimation(id) {
	// body...
	var canvas = document.getElementById(id);
	context = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	context.fillStyle = 'green';
	context.fillRect(0,0,500,500);
	//setInterval(code,millisec)设置动画的时间间隔(毫秒)
	setInterval(painting,100);	
	i = 0;
}
function painting() {
	// body...
	/*
	context.beginPath();
	context.arc(10+i,10,5,0,Math.PI*2,true);
	context.arc(10,10+i,5,0,Math.PI*2,true);
	context.closePath();
	context.fillStyle = 'rgba(255,0,0,0.5)';
	context.fill();
	i += 20;
	*/
	/*
	context.fillStyle = '#fff';
	context.clearRect(20+i,20,10,10);
	i++;
	*/
	
	context.fillStyle = 'fff';
	context.clearRect(0,0,width,height);
	context.beginPath();
	if (i < width) {
		context.arc(10+i,10,5,0,Math.PI*2,true);
	}
	else if ((i-480) < height) {
		context.arc(490,10+(i-480),5,0,Math.PI*2,true);
	}
	else if ((i-960) < width) {
		context.arc(490-(i-960),490,5,0,Math.PI*2,true);
	}
	else {
		context.arc(10,490-(i-1440),5,0,Math.PI*2,true);
	}
	context.closePath();
	context.fillStyle = 'rgba(255,0,0,0.5)';
	context.fill();
	i += 20;
	if (i == 1920) {
		i = 0;
	}
}