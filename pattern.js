var Pattern = function(canvasId, personalMeasurements){
  startingX = 20;
  startingY = 20;

  this.canvas = document.getElementById(canvasId);
  // setCanvasSize(this.canvas);
  this.context = this.canvas.getContext('2d');
  ctx = this.context;

  // draw top line for reference, and middle seam
  ctx.beginPath();
  ctx.moveTo(startingX,startingY);
  ctx.lineTo(100,startingY);
  ctx.lineTo(100,personalMeasurements.fullLength + startingY);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // draw shoulder seam
  ctx.beginPath();
  ctx.moveTo(startingX + (personalMeasurements.shoulderLength * Math.sin(20)), startingY)
  ctx.lineTo(startingX, (personalMeasurements.shoulderLength * Math.cos(20)) + startingY)
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // draw neckline curve
  ctx.beginPath();
  ctx.moveTo(startingX + (personalMeasurements.shoulderLength * Math.sin(20)), startingY)
  ctx.bezierCurveTo()
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function setCanvasSize(canvas){
  canvas.style.width  = '100in';
  canvas.style.height = '100in';
}

var personalMeasurements = {
  // full length is "shoulder at neck to waist line"
  fullLength: 80,
  // center front length is "hollow at center front neck to waist line"
  centerFrontLength: 50,
  // shoulder tip is "¼in from the end of shoulder (if you start to raise your arm, a hollow will form at the shoulder joint. This is shoulder tip – approximately"
  shoulderTip: 5,
  // shoulder length is "shoulder at neck to shoulder tip"
  shoulderLength: 20,
  // across shoulder is "shoulder tip to shoulder tip – MEASURED on back – and DIVIDED by 2 (across shoulders for both front and back bodice sloper is taken on back)"
  acrossShoulder: 20,
  armholeDepth: "shoulder tip to armpit (usually ½” to 1” below actual armpit). Using two l-square  rulers, arrange rulers as shown in diagram and measure. This measurement is the most often incorrectly measured measurement. Three quarters of the questions I receive are solved by correcting this measurement. Because of this, I suggest to cross check this measurement two ways. One way is to measure the armhole from shoulder tip to bottom of armhole on a very good fitting sleeveless blouse (measure straight and not measure along the curve). Another way to cross check this measurement is to compare it to ‘standard’ measurements. If the ‘standard’ armhole depth for a size 6 is 7 ¼” and armhole grades ¼” per size, use math to find the ‘standard’ armhole depth for your size. Are both of these measurements close to the armhole depth measurement taken on body?)",
  bustDepth: "shoulder tip to bust point (bust point is the nipple. To find, poke a needle from INSIDE of bra/tank top to OUTSIDE and mark",
  bustSpan: "bust point to bust point, divided by 2",
  bustArc:  "CF to bust point to armhole depth/side seam. I do not advise to measure from CF to bust point and then pivot measuring tape up to armhole/side seam because the hollow in between breasts cause the measurement to be larger/bigger, especially if your breasts are very large. In theory, this measurement should be taken from the ‘bridge’ between bust points at CF but this is very hard. So I suggest to measure from bust point to armhole/side seam and then add this measurement to bust span measurement (make sure that bust span measurement is ½ of bust point to bust point)",
  shoulderSlope: "CF waist line to shoulder tip. Be sure that to keep measuring tape taut and extend it straight from waist, over bust point, and to shoulder tip",
  sideSeamLength: "armhole depth to waist line",
  waistArc: "CF to SS along waist line",
  dartPlacement: "bust span less ¾in"
}

var patternLines = function(personalMeasurements){
  this.AB = personalMeasurements.fullLength;
  this.AC = 100;
  this.AD = 4
  this.BD = personalMeasurements.centerFrontLength - 0.375;
  this.FToBottom = this.AB
  // use trig to find the line
  this.EF = personalMeasurements.shoulderLength;
  this.CF = this.EF * Math.cos(20);
  this.CE = this.EF * Math.sin(20);
  // GH may be unneeded, because I should be able to generate
      //  45 degree curve without it
  // this.GH = 0.5;
  this.EI = personalMeasurements.armholeDepth;
  this.IJ = 2;
  // need random length of J to connect with from PQ
  this.J = 10;
  this.EK = this.EI / 2;
  this.KM = 0.5;
  this.EN = personalMeasurements.bustDepth;
  this.OP = personalMeasurements.bustSpan;
  // this.PQ =start at OP, go to where J intersects with RS
  this.PR = this.PQ + 0.5;
  this.RS = personalMeasurements.sideSeamLength;
  this.RT = 0.5
}

window.onload = function(){
  var pattern = new Pattern('pattern-magic', personalMeasurements);
}
