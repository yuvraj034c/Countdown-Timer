// get elements from Dom
var secondHtml = document.getElementById('second');
var minuteHtml = document.getElementById('minute');
var inputField= document.getElementById('timeIn');
var timeHtml= document.getElementById('currenttime');
// 3 buttons from Dom
var buttons= document.getElementsByTagName('button');

// global variables
var inputTime,interval;
var seconds, min;
var currentTime;

var timeInterval=setInterval(getTime,1000);
// get input value from user in minutes
inputField.addEventListener('input', function(e){
	inputTime=e.target.value;
	// convert minute to second
	inputTime*=60;
});

// convert buttons to array
var arrBtn = Array.from(buttons);
// check which button is clicked
for (var i = 0; i < arrBtn.length; i++) {
	arrBtn[i].addEventListener('click', function(e){
		// local variable to be used after
		var ids=e.target.id;

		if (ids=='start') {
			// disable start button
			e.target.classList.add('disabled');
			// run function countdown every 1 second
			interval = setInterval(Countdown,1000);		
			var resetBtn = document.getElementById('reset');
			resetBtn.classList.remove('btn-primary');
			resetBtn.classList.add('btn-warning');	
		}
		if (ids=='pause') {
			// generate popup to stop execution of function countdown()
			alert('Timer paused. Press ok to continue');
		}
		if (ids=='reset') {
			// reload page
			location.reload();
		}
	});
}

// functions
function Countdown(){
	// validate inputTime
	if (inputTime>=0) {
		// check if seconds is less than 1012
		if (convertSeconds(inputTime)<10) {
			// add 0 before seconds
		secondHtml.innerHTML='0'+convertSeconds(inputTime);	
		//change document title when time updates
		document.title=convertMinutes(inputTime)+" : " +"0"+ convertSeconds(inputTime) +'    ---    '+currentTime;		
		}else{
		secondHtml.innerHTML=convertSeconds(inputTime);			
		//change document title when time updates
		document.title=convertMinutes(inputTime)+" : " + convertSeconds(inputTime) +'    ---    '+currentTime;
		}
		// change minute content in html
		minute.innerHTML=convertMinutes(inputTime);
		// reduce inputTime by one(for every second)
		inputTime--;
		// check if countdown has finished
		if (seconds==0 && min==0) {
			// stop execution of this function
			clearInterval(interval);
			// create audio and play sound
			var audio = new Audio('sound/siren.mp3');
			audio.play()
			audio.loop =true;
		}		
	}
}
function convertSeconds(s){
	// modulus division
	 seconds = s%60;
	return seconds;
}
function convertMinutes(m){
	// get only exact number
	min = Math.floor(m/60);
	return min;
}
function getTime(){
	var time = new Date();
	var sec=time.getSeconds();
	var min= time.getMinutes();
	if (sec<10) {
		sec='0'+sec;
	}
	if (min<10) {
		min='0'+min;
	}
	currentTime=time.getHours()+" : "+min;
	currenttime.innerHTML=currentTime+" : "+sec;
	document.title=currentTime;
}