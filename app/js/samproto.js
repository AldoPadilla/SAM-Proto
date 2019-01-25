
    var ctx;
    var radius;
    var updateTimeID;
    var backToTimeID;
    var currentRotation;
    var maxHourRotation;
    var animateHandID;
    var hourHand = new createjs.Shape();
    var minuteHand = new createjs.Shape();
    var stage;
    var enterSetTimeDateSincePress;
        var enterSetTimeIsOn = false;
    var currentSetTimeMode = "NORMAL";
    var setTimeModeCurrentHour;
    var setTimeModeCurrentMinute;
    var newTimeHours;
    var newTimeMinutes;
    var finalSetTimeHours = 0;
    var finalSetTimeMinutes = 0;
    var timeHasNotBeenSetHours = true;
    var timeHasNotBeenSetMinutes = true;
    var currentEase = createjs.Ease.getPowInOut(4);
    var subEyeHand = new createjs.Shape();// new createjs.Bitmap("subEyeHand.png");
    var currentMode = "TIME"; // MODE1 MODE2
    var modeSwitchResetTimer;
    var subEyeSwitchResetTimer;
    var transitionTime = 500;
    
    function init() {
        
    stage = new createjs.Stage("canvas");
    
    ctx = canvas.getContext("2d");
    radius = 136;//canvas.height / 2;
    console.log("radius : " + radius);
    ctx.translate(radius, radius);
    
    stage.update();
    
    drawClock();
    
    createjs.Ticker.setFPS(60);
       createjs.Ticker.addEventListener("tick", stage);
      }
    
  
function drawClock() {
    drawFace(ctx, radius);
    drawSubEye();
    drawTime(ctx, radius);
}

function drawSubEye()
{
  var subEyeBG = new createjs.Bitmap("images/subEyeWithActivityBG.png");
  subEyeBG.x = 48;
  subEyeBG.y = 146;
  stage.addChild(subEyeBG);
  
  subEyeHand.graphics.setStrokeStyle(1, "round");
  subEyeHand.graphics.beginStroke("black");
  subEyeHand.graphics.moveTo(0, 0);
  subEyeHand.x = 90;
  subEyeHand.y = 155 + 35;
  subEyeHand.graphics.lineTo(0, -35);
  subEyeHand.graphics.endStroke();
  stage.addChild(subEyeHand);
    
  stage.update();
}


function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
  
  //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  
    //hour
    hour=hour%12;
  hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHourHand(ctx, hour, radius*0.5, radius*0.07);
}

function drawSecondTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
  hour-= 8;
  console.log(hour);
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  minute -= 30;
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
}

function drawHourHand(ctx, pos, length, width) {
    hourHand.graphics.setStrokeStyle(5, "round");
    hourHand.graphics.beginStroke("black");
    hourHand.graphics.moveTo(0, 0);
    hourHand.x = radius;
    hourHand.y = radius;
    hourHand.graphics.lineTo(0, -length);
    hourHand.graphics.endStroke();
    hourHand.rotation = pos*57.2958;
    stage.addChild(hourHand);
      stage.update();
}

function drawHand(ctx, pos, length, width) {
    minuteHand.graphics.setStrokeStyle(5, "round");
    minuteHand.graphics.beginStroke("#F59191");
    minuteHand.graphics.moveTo(0, 0);
    minuteHand.x = radius;
    minuteHand.y = radius;
    minuteHand.graphics.lineTo(0, -length);
    minuteHand.graphics.endStroke();
    minuteHand.graphics.lineCap = 'round';
    minuteHand.rotation = pos*57.2958;
    stage.addChild(minuteHand);
      stage.update();
}

function drawFace(ctx, radius) {
  var bitmap = new createjs.Bitmap("images/Watch-Face.png");
  stage.addChild(bitmap);
  stage.update();
}

function drawNumbers(ctx, radius) {
  
  
  numPoints = 12;
  
  var circum = 2*Math.PI*radius*.9;
  var evenDistPos = circum/numPoints;
  console.log(evenDistPos);
  var step = (2*Math.PI) / numPoints;
  var angle = step*10;
  
  for(i = 1; i <= numPoints; i++){
    var xPos = radius *.9 * Math.cos(angle) + radius -10;
    var yPos = radius *.9 * Math.sin(angle) + radius + 5;
    
    var text = new createjs.Text(i, "10px Arial", "Black");
    text.x = xPos;
    text.y = yPos;
    text.textBaseline = "alphabetic";
    stage.addChild(text);
    
    angle += step;
  }
  
  stage.update();
}


function backToTime ()
{
  clearInterval(backToTimeID);
  updateTimeID = setInterval(drawClock, 1000);
}

function animateSecondTime ()
{
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  
  if(currentRotation >= maxHourRotation)
  {
    clearInterval(animateHandID);
    drawClock();
    updateTimeID = setInterval(drawClock, 1000);
  }
  else {
    var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      
    //hour
      hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
      drawHand(ctx, hour, radius*0.5, radius*0.07);
  
    currentRotation += 1;
    rotateHand(ctx, (currentRotation*Math.PI/30), radius*0.8, radius*0.07);
  }
}

function tweenHands()
{
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hourHand.rotation+360}, transitionTime, currentEase);    
}

function rotateHand(ctx, pos, length, width) {
  ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function handsPointToDate ()
{
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:58}, transitionTime, currentEase);
  createjs.Tween.get(minuteHand, {loop: false}).to({rotation:58}, transitionTime, currentEase);
      
  clearTimeout(modeSwitchResetTimer);
  modeSwitchResetTimer = setTimeout(handsPointToTime, 3000);
}

function handsPointToMode3 ()
{
  var hour = 10;
    var minute = 50;
  
  hour=(hour*Math.PI/6);
    minute=minute*Math.PI/30;
  
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, transitionTime, currentEase);
  createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minute*57.2958}, transitionTime, currentEase);
      
  clearTimeout(modeSwitchResetTimer);
  modeSwitchResetTimer = setTimeout(handsPointToTime, 3000);
}

function handsPointToMode4 ()
{
  var hour = 6;
    var minute = 30;
  
  hour=(hour*Math.PI/6);
    minute=minute*Math.PI/30;
  
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, transitionTime, currentEase);
  createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minute*57.2958}, transitionTime, currentEase);
      
  clearTimeout(modeSwitchResetTimer);
  modeSwitchResetTimer = setTimeout(handsPointToTime, 3000);
}

function handsPointToSecondTime()
{
  var hour = 8;
    var minute = 30;
  
  hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60));
    minute=minute*Math.PI/30;
  
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, transitionTime, currentEase);
     
    createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minute*57.2958}, transitionTime, currentEase);
  
  clearTimeout(modeSwitchResetTimer);
  modeSwitchResetTimer = setTimeout(handsPointToTime, 3000);
}

function handsPointToTime()
{
  currentMode = "TIME";
  
  var now = new Date();
  var hour;
    var minute;
    var second;
  
  if  (timeHasNotBeenSetHours){
    hour = now.getHours();
  }
  else{
    hour = finalSetTimeHours;
    }
  
  if  (timeHasNotBeenSetMinutes){
    minute = now.getMinutes();
  }
  else{
    minute = finalSetTimeMinutes;
  }
  
  second = now.getSeconds();
  
    //hour
    hour=hour%12;
  
  hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, transitionTime, currentEase);
  createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minute*57.2958}, transitionTime, currentEase);
      
  console.log("handsPointToTime 3");
  console.log("hour : " + hour);
  console.log("minute : " + hour);
}

function startEnterSetTimeMode()
{
  if(enterSetTimeIsOn == false){
    enterSetTimeIsOn = true;
    enterSetTimeDateSincePress = new Date();
  }
}

function enterSetTimeMode()
{
  var now = new Date();
  var hour;
    var minute;
    var second;
  
  if  (timeHasNotBeenSetHours){
    hour = now.getHours();
    finalSetTimeHours = hour;
    }
  else{
    hour = finalSetTimeHours;
    }
  
  if  (timeHasNotBeenSetMinutes){
    minute = now.getMinutes();
    finalSetTimeMinutes = minute;
    }
  else{
    minute = finalSetTimeMinutes;
  }
  
  console.log("1 enterSetTimeMode");
  console.log("hour : " + hour);
  console.log("minute : " + minute);
  
  second = now.getSeconds();
  
  var timeInterval = (now - enterSetTimeDateSincePress) / 1000;
  
  if(timeInterval < 3)
  {
    console.log(currentSetTimeMode);
    if(currentSetTimeMode == "NORMAL"){
      //CYCLE THROUGH MODES
      if(currentMode == "TIME"){
        currentMode = "MODE1";
        handsPointToDate();
        cycleSubEye(8.3);
      }
      else if(currentMode == "MODE1"){
        currentMode = "MODE2";
        handsPointToSecondTime();
        cycleSubEye(7);
      }
      else if(currentMode == "MODE2"){
        currentMode = "MODE3";
        handsPointToMode3();
        cycleSubEye(5.3);
      }
      else if(currentMode == "MODE3"){
        cycleSubEye(3.5);
        currentMode = "MODE4";
        handsPointToMode4();
      }
      else if(currentMode == "MODE4"){
        currentMode = "TIME";
        handsPointToTime();
        cycleSubEye(0);
      }
      
    }
    else if(currentSetTimeMode == "HOURS"){
      
      setTimeModeCurrentHour += 1;
      hour += setTimeModeCurrentHour;
    
      var hourRad = (hour*Math.PI/6);
        createjs.Tween.get(hourHand, {loop: false}).to({rotation:hourRad*57.2958}, transitionTime, currentEase);
    }
    else if(currentSetTimeMode == "MINUTES"){
      timeHasNotBeenSetMinutes = false;
      
      setTimeModeCurrentMinute += 1;
      
      minute += setTimeModeCurrentMinute;
        var minuteRad = (minute*Math.PI/30);
      
      console.log("minute 2 : " + minute);
      createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minuteRad*57.2958}, transitionTime, currentEase);
    }
    console.log("2 enterSetTimeMode");
    console.log("hour : " + hour);
    console.log("minute : " + minute);
  }
  else{
    // ENTER SET TIME MODE
    
    if(currentSetTimeMode == "NORMAL"){
      //console.log("HOURS");
      // set up for set hours mode  
      
      setTimeModeCurrentHour = 0;
      // NEED TO QUANTIZE THIS 360 ROTATION
      createjs.Tween.get(hourHand, {loop: false}).to({rotation:hourHand.rotation+360}, transitionTime, currentEase).call(handleHoursSetComplete);
      currentSetTimeMode = "HOURS";
    }
    else if (currentSetTimeMode == "HOURS"){
      // SAVE THE HOURS SET TIME!!
      hour += setTimeModeCurrentHour;
      finalSetTimeHours = hour;
      
      // set up for set minutes mode
      setTimeModeCurrentMinute = 0;
      
      createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minuteHand.rotation+360}, transitionTime, currentEase).call(handleMinutesSetComplete);
        
      currentSetTimeMode = "MINUTES";
    }
    else if (currentSetTimeMode == "MINUTES"){
      // SAVE THE MINUTES SET TIME!!
      minute += setTimeModeCurrentMinute;
      finalSetTimeMinutes = minute;
      
      // NEED TO ADD A ROTATION HERE AND THEN GOES TO REST ON COMPLETE
      handsPointToTime();
      currentSetTimeMode = "NORMAL";
    }
    
    console.log("3 enterSetTimeMode");
    console.log("hour : " + hour);
    console.log("minute : " + minute);
  }
  enterSetTimeIsOn = false;
}

function handleHoursSetComplete() {
    // SNAP THE ROTATION BACK
  hourHand.rotation-=360;
  
  var now = new Date();
  var hour;
    var minute;
    var second;
  
  if  (timeHasNotBeenSetHours){
    hour = now.getHours();
    timeHasNotBeenSetHours = false;
    }
  else{
    hour = finalSetTimeHours;
    }

  hour=(hour*Math.PI/6);
    createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, 10, currentEase);
  
  console.log("handleHoursSetComplete");
  console.log("hour : " + hour);
  console.log("minute : " + minute);
}

function handleMinutesSetComplete() {
       // SNAP THE ROTATION BACK
  minuteHand.rotation -=360;
    
  var now = new Date();
  var hour;
    var minute;
    var second;

  minute = finalSetTimeMinutes;
  var minuteRad =(minute*Math.PI/30);
  
    createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minuteRad*57.2958}, 10, currentEase);
    
  console.log("handleMinutesSetComplete");
  console.log("hour : " + hour);
  console.log("minute : " + minute);
}
  
function cycleSubEye(loc) {
  console.log("cycleSubEye");
  var hourHandHours = (loc*Math.PI/6);
  createjs.Tween.get(subEyeHand, {loop: false}).to({rotation:hourHandHours*57.2958}, transitionTime, currentEase);  
  
  clearTimeout(subEyeSwitchResetTimer);
  subEyeSwitchResetTimer = setTimeout(animateSubEyeBack, 3000);
}

function animateSubEyeBack() {
  console.log("animateSubEyeBack");
  createjs.Tween.get(subEyeHand, {loop: false}).to({rotation:0}, transitionTime, currentEase);  
}
  
function fireLink() {
  var hour = 0;
    var minute = 0;
    console.log("fireLink");
   
    //hour
    hour=0;
    //minute
    minute=0;
  
  createjs.Tween.get(hourHand, {loop: false}).to({rotation:hour*57.2958}, transitionTime, currentEase);
  createjs.Tween.get(minuteHand, {loop: false}).to({rotation:minute*57.2958}, transitionTime, currentEase);
    
  clearTimeout(modeSwitchResetTimer);
  modeSwitchResetTimer = setTimeout(handsPointToTime, 3000)
  //setTimeout(handsPointToTime, 3000);
}
  
window.addEventListener('keydown', function(event) {
  console.log("KEY DOWN : " + event.keyCode);
  switch (event.keyCode) {
   case 56: 
      //8 - top aux
  break;
  
  case 53: 
      //5 - Crown
    startEnterSetTimeMode();
  break;
  
  case 50: 
      //2 - Bottom aux
    break;
  
    case 37: // Left
      //alert("Left");
    break;

    case 38: // Up
      //alert("Left");
   break;

    case 39: // Right
    
  break;

    case 40: // Down
      //alert("Left");
   break;
   
   case 88: // x
      //alert("x");
    currentEase = createjs.Ease.getPowInOut(4);
    
   break;
   
   case 67: // c
      //alert("c");
    currentEase = createjs.Ease.linear;
    
   break;
   
   case 86: // v
      //alert("v");
    currentEase = createjs.Ease.backOut;
    
   break;
   
   case 66: // b
      //alert("b");
    currentEase = createjs.Ease.bounceOut;
   break;
   
   case 78: // n
      //alert("n");
    currentEase = createjs.Ease.elasticOut;
   break;
   
   case 83: // s
      //alert("s");
    transitionTime = 400;
   
   break;
   
   case 68: // d
      //alert("d");
    transitionTime = 500;
   
   break;
   
   case 70: // f
      //alert("f");
    transitionTime = 600;
   
   break;
   
   case 71: // g
      //alert("g");
    transitionTime = 700;
   
   break;
   
   case 81: // q
      //alert("q");
    // TOP BUTTON
    fireLink()
   break;
   
   case 65: // a
      //alert("a");
    // MID BUTTON
    startEnterSetTimeMode();
    
   break;
   
   case 90: // z
      //alert("z");
    // BOTTOM BUTTON
   break;
  }
}, false);


window.addEventListener('keyup', function(event) {
  //console.log(event.keyCode); // 56 53 50
  switch (event.keyCode) {
   case 56: 
      //8 - top aux
    handsPointToTime();
    break;
  
  case 53: 
      //5 - Crown
    enterSetTimeMode()
    break;
  
  case 50: 
      //2 - Bottom aux
    break;
  
    case 37: // Left
      //alert("Left");
    break;

    case 38: // Up
      //alert("Left");
    clearInterval(updateTimeID);
    
    tweenHands()
    
    break;

    case 39: // Right
      clearInterval(updateTimeID);
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
   // drawSecondTime(ctx, radius);
  // var minute = now.getMinutes();
   var now = new Date();
   var minute = now.getMinutes();
   // var second = now.getSeconds();
  
   currentRotation = minute; //
   maxHourRotation = currentRotation + 60
   console.log(currentRotation);
    animateHandID = setInterval(animateSecondTime, 10);
    break;

    case 40: // Down
      //alert("Left");
    clearInterval(updateTimeID);
    drawFace(ctx, radius);
    //drawNumbers(ctx, radius);
    drawSecondTime(ctx, radius);
   // hour=(12*Math.PI/6);
   // drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute=(60*Math.PI/30);
    //drawHand(ctx, minute, radius*0.8, radius*0.07);
    backToTimeID = setInterval(backToTime, 3000);
    break;
  
  case 81: // q
      //alert("q");
    // TOP BUTTON
   break;
   
   case 65: // a
      //alert("a");
    // MID BUTTON
    enterSetTimeMode()
   break;
   
   case 90: // z
      //alert("z");
    // BOTTOM BUTTON
   break;
  }
}, false);


