function load() {
    gdata = {}; //the global P.js variable container

    getUrlVars(); 	//reads variables passed from the url
    updateTime();	//updates the time variables, this is a clock after all
    setValues();	//sets the defualt values of necessary variables
    updateState();	//updates clock state
    setSkin();
}

main = setInterval(function(){ //the main loop, am I breaking some sort of etiquette here?

    updateTime();
    updateState();

}, 1000);

function updateTime() {
    currentDate = new Date();
    gdata.now = currentDate.valueOf();
    gdata.elapsed = (gdata.now - gdata.starttime);

    //calculates the 0~1 float that tracks progress, as per state
    if(gdata.state == 1) {
	    gdata.counter = gdata.elapsed / gdata.workdur;
    } else if(gdata.state == 2) {
	    gdata.counter = gdata.elapsed / gdata.breakdur;
    }

    //updates the preformatted pretty-text
    updatePrettytext();

}

function updatePrettytext() {

    //this rather ugly piece of codery composes the digital-clock string that shows
    //string manipulation sucks in js
    d = new Date(gdata.workdur + gdata.breakdur - gdata.elapsed - 1800000);
    if(gdata.elapsed != null) {
        gdata.prettytext = "";
        if(d.getMinutes() < 10)
            gdata.prettytext += "0";
        gdata.prettytext += d.getMinutes();
        gdata.prettytext += ":";
        if(d.getSeconds() < 10)
            gdata.prettytext += "0";
        gdata.prettytext += d.getSeconds().toString();
    }
    if(gdata.prettytext == "59:59")
	gdata.prettytext = "00:00";

}

function updateState() {
    gdata.state = 1; 		//start ticking as default
    if(gdata.elapsed > gdata.workdur)
        gdata.state = 2;	//if worktime over, it's breaktime!
    if(gdata.elapsed > gdata.workdur+gdata.breakdur) {
        gdata.state = 0;	//ran out of time? then stop
	if(gdata.repeat != 0) {
	    gdata.state = 1;	//set to repeat? then start again!
	    gdata.urlvars.r -= 1;
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
    if(gdata.urlvars.t) {
	gdata.starttime = gdata.urlvars.t;
    } else {
	gdata.starttime = gdata.now.valueOf();
    }
    if(gdata.urlvars.s) {
        gdata.skin = gdata.urlvars.s;
    } else {
	gdata.skin = "kimidori";
    }
    if(gdata.urlvars.r) {
    	gdata.repeat = gdata.urlvars.r;
    } else {
	gdata.repeat = 0;
    }
    if(gdata.urlvars.w) {
	gdata.workdur = gdata.urlvars.w * 60 * 1000;
    } else {
	gdata.workdur = 25 * 60 * 1000;
    }
    if(gdata.urlvars.b) {
	gdata.breakdur = gdata.urlvars.b * 60 * 1000;
    } else {
	gdata.breakdur = 5 * 60 * 1000;
    }
}

function getUrlVars() {
    //reads passed variables off the url string, my favored method of data retention
    var map = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	    map[key] = value;
    });
    gdata.urlvars = map;
}

function setSkin() {
    document.getElementById("stylesheet").setAttribute("href", gdata.skin+"/style.css");
    document.getElementById("favcanvas").setAttribute("datasrc", gdata.skin+"/fav.pjs");
    document.getElementById("vizcanvas").setAttribute("datasrc", gdata.skin+"/viz.pjs");
}
