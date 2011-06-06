window.Processing.data = {}; //the global P.js variable container

getUrlVars(); 	//reads variables passed from the url
updateTime();	//updates the time variables, this is a clock after all
setValues();	//sets the defualt values of necessary variables
updateState();	//updates clock state


main = setInterval(function(){ //the main loop, am I breaking some sort of etiquette here?

	updateTime();
	updateState();

}, 1000);

function updateTime() {
    currentDate = new Date();
    window.Processing.data.now = currentDate.valueOf();
    window.Processing.data.elapsed = (window.Processing.data.now - window.Processing.data.starttime);

    //calculates the 0~1 float that tracks progress, as per state
    if(window.Processing.data.state == 1) {
	    window.Processing.data.counter = window.Processing.data.elapsed / window.Processing.data.workdur;
    } else if(window.Processing.data.state == 2) {
	    window.Processing.data.counter = window.Processing.data.elapsed / window.Processing.data.breakdur;
    }

    //updates the preformatted pretty-text
    updatePrettytext();

}

function updatePrettytext() {

    //this rather ugly piece of codery composes the digital-clock string that shows
    //string manipulation sucks in js
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
    window.Processing.data.state = 1; 		//start ticking as default
    if(window.Processing.data.elapsed > window.Processing.data.workdur)
        window.Processing.data.state = 2;	//if worktime over, it's breaktime!
    if(window.Processing.data.elapsed > window.Processing.data.workdur+window.Processing.data.breakdur) {
        window.Processing.data.state = 0;	//ran out of time? then stop
	if(window.Processing.data.repeat != 0) {
	    window.Processing.data.state = 1;	//set to repeat? then start again!
	    window.Processing.data.urlvars.r -= 1;
	    setValues();
	}
    }
	//the state machine
	//	0 = inactive
	//	1 = counting "work"
	//	2 = counting "break"
	//	3 = pausing "work"	pausing is in no way implemented yet, not do I want to
}

function setValues() {
    //this converts variables passed to settings, or sets them as default
    //this is what the code checks for...
    //w = work time in seconds
    //b = break time in seconds
    //r = repeat as an integer		negative value for infinite
    //t = time of start in ms		planned so long-term pomidoris can be bookmarked
    //s = skin				planned for eventual skin support
    if(window.Processing.data.urlvars.t) {
	window.Processing.data.starttime = window.Processing.data.urlvars.t;
    } else {
	window.Processing.data.starttime = window.Processing.data.now.valueOf();
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
	window.Processing.data.workdur = 25 * 60 * 1000;
    }
    if(window.Processing.data.urlvars.b) {
	window.Processing.data.breakdur = window.Processing.data.urlvars.b * 60 * 1000;
    } else {
	window.Processing.data.breakdur = 5 * 60 * 1000;
    }
}

function getUrlVars() {
    //reads passed variables off the url string, my favored method of data retention
    var map = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	    map[key] = value;
    });
    window.Processing.data.urlvars = map;
}
