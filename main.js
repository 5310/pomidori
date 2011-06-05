window.Processing.data = {}; //the global P.js variable container

getUrlVars(); //reads variables from url
updateTime();
setValues();
updateState();


main = setInterval(function(){ //the main loop, am I breaking some sort of etiquette here?

	updateTime();
	updateState();

}, 1000);

function updateTime() {
	currentDate = new Date();

	window.Processing.data.now = currentDate.valueOf();

	//window.Processing.data.year = currentDate.getFullYear();
	//window.Processing.data.month = currentDate.getMonth();
	//window.Processing.data.date = currentDate.getDate();
	//window.Processing.data.day = currentDate.getDay();
	//window.Processing.data.hour = currentDate.getHours();
	//window.Processing.data.min = currentDate.getMinutes();
	//window.Processing.data.sec = currentDate.getSeconds();
	//window.Processing.data.ms = currentDate.getMilliseconds();

	window.Processing.data.elapsed = (window.Processing.data.now - window.Processing.data.starttime);

	if(window.Processing.data.state == 1) {
		window.Processing.data.counter = window.Processing.data.elapsed / window.Processing.data.workdur;
	} else if(window.Processing.data.state == 2) {
		window.Processing.data.counter = window.Processing.data.elapsed / window.Processing.data.breakdur;
	}

    d = new Date(window.Processing.data.workdur + window.Processing.data.breakdur - window.Processing.data.elapsed - 1800000);
    if(window.Processing.data.elapsed != null) {
        window.Processing.data.prettytext = "";
        if(d.getMinutes() < 10)
            window.Processing.data.prettytext += "0";
        window.Processing.data.prettytext += d.getMinutes();
        window.Processing.data.prettytext += ":";
        if(d.getSeconds() < 10)
            window.Processing.data.prettytext += "0";
        window.Processing.data.prettytext += d.getSeconds().toString();
    }
    if(window.Processing.data.prettytext == "59:59")
	window.Processing.data.prettytext = "00:00";
}

function updateState() {
    window.Processing.data.state = 1;
    if(window.Processing.data.elapsed > window.Processing.data.workdur)
        window.Processing.data.state = 2;
    if(window.Processing.data.elapsed > window.Processing.data.workdur+window.Processing.data.breakdur) {
        window.Processing.data.state = 0;
	if(window.Processing.data.repeat != 0) {
	    window.Processing.data.state = 1;
	    window.Processing.data.urlvars.r -= 1;
	    setValues();
	}
    }
	//the state machine			   * means transition is automatic in not manual
	//	0 = inactive			-> 1
	//	1 = counting "work"		-> 2*, 3, 0
	//	2 = counting "break"	-> 1*, 0
	//	3 = pausing "work"		-> 1, 0
}

function setValues() {
    //w = work
    //b = break
    //r = repeat
    //t = time of start in ms
    //s = skin
    if(window.Processing.data.urlvars.t) {
	window.Processing.data.starttime = window.Processing.data.urlvars.t;
    } else {
	window.Processing.data.starttime = window.Processing.data.now.valueOf();	//flat-time of the moment the clock was started
    }
    if(window.Processing.data.urlvars.s) {
        window.Processing.data.skin = window.Processing.data.urlvars.s;
    } else {
	window.Processing.data.skin = "kimidori";
    }
    if(window.Processing.data.urlvars.r) {
    	window.Processing.data.repeat = window.Processing.data.urlvars.r;
    } else {
	window.Processing.data.repeat = 0;
    }
    if(window.Processing.data.urlvars.w) {
	window.Processing.data.workdur = window.Processing.data.urlvars.w * 60 * 1000;
    } else {
	window.Processing.data.workdur = 25 * 60 * 1000;	//work length in ms
    }
    if(window.Processing.data.urlvars.b) {
	window.Processing.data.breakdur = window.Processing.data.urlvars.b * 60 * 1000;
    } else {
	window.Processing.data.breakdur = 5 * 60 * 1000;
    }

    //window.Processing.data.pausetime = 0;	//flat time of moment paused
    //window.Processing.data.pausedur = 0;
}

function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	window.Processing.data.urlvars = map;
}
