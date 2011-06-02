window.Processing.data = {}; //the global P.js variable container

//The HTML5 javascript sound (playback) API is simple enough:
// (kept here for posterity)
//window.Processing.data.finish = new Audio("audio/smb_world_clear.wav");
//window.Processing.data.finish.play();

mainloop = setInterval(function(){ //the main loop, am I breaking some sort of etiquette here?

	currentDate = new Date();

	window.Processing.data.now = Date.now();

	//window.Processing.data.year = currentDate.getFullYear();
	//window.Processing.data.month = currentDate.getMonth();
	//window.Processing.data.date = currentDate.getDate();
	//window.Processing.data.day = currentDate.getDay();

	window.Processing.data.hour = currentDate.getHours();
	window.Processing.data.min = currentDate.getMinutes();
	window.Processing.data.sec = currentDate.getSeconds();
	window.Processing.data.ms = currentDate.getMilliseconds();

}, 1000);




