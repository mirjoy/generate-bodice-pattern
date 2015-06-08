var Pattern = function(canvasId, personalMeasurements){
  startingX = 20;
  startingY = 20;
  startingSeamLine = 70;
  leftEdgeOfShoulderSeam = (personalMeasurements.shoulderLength * Math.cos(20)) + startingY;


  this.canvas = document.getElementById(canvasId);
  // setCanvasSize(this.canvas);
  this.context = this.canvas.getContext('2d');
  ctx = this.context;

  drawShoulderSeam(ctx);
  drawNeckline(ctx, personalMeasurements, startingSeamLine);
  drawMiddleSeam(ctx, personalMeasurements);
  drawTopArmholeCurve(ctx, personalMeasurements);
  drawDartLine(ctx, personalMeasurements);
}

function drawShoulderSeam(context){
  context.beginPath();
  context.moveTo(startingX + (personalMeasurements.shoulderLength * Math.sin(20)), startingY)
  context.lineTo(startingX, leftEdgeOfShoulderSeam)
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawNeckline(context, personalMeasurements, startingSeamLine){
  context.beginPath();
  var necklineStartingX = startingX + (personalMeasurements.shoulderLength * Math.sin(20));
  var necklineStartingY = startingY;
  var necklineEndingX = startingSeamLine;
  var necklineEndingY = personalMeasurements.fullLength - (personalMeasurements.centerFrontLength - 0.375);
  var necklineMiddleX = necklineStartingX;
  var necklineMiddleY = necklineEndingY;

  context.bezierCurveTo(necklineStartingX, necklineStartingY, necklineMiddleX, necklineMiddleY, necklineEndingX, necklineEndingY);
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawMiddleSeam(context, personalMeasurements){
  context.beginPath();
  context.moveTo(startingSeamLine, personalMeasurements.fullLength - (personalMeasurements.centerFrontLength - 0.375));
  context.lineTo(startingSeamLine, startingY + personalMeasurements.fullLength);
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawTopArmholeCurve(context, personalMeasurements){
  var middleOfArmHole = leftEdgeOfShoulderSeam + (personalMeasurements.armholeDepth/2);
  context.beginPath();
  context.bezierCurveTo(startingX, leftEdgeOfShoulderSeam, startingX + 0.5, middleOfArmHole, startingX, leftEdgeOfShoulderSeam + personalMeasurements.armholeDepth);
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawBottomArmholeCurve(context, personalMeasurements){
  context.beginPath();
  // context.bezierCurveTo(startingX, leftEdgeOfShoulderSeam + personalMeasurements.armholeDepth, );
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawDartLine(context, personalMeasurements){
  context.beginPath();
  context.moveTo(startingX, leftEdgeOfShoulderSeam);
  context.lineTo(startingSeamLine, startingY + personalMeasurements.fullLength);
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
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
  // armholeDepth: is "shoulder tip to armpit (usually ½” to 1” below actual armpit). Using two l-square  rulers, arrange rulers as shown in diagram and measure. This measurement is the most often incorrectly measured measurement. Three quarters of the questions I receive are solved by correcting this measurement. Because of this, I suggest to cross check this measurement two ways. One way is to measure the armhole from shoulder tip to bottom of armhole on a very good fitting sleeveless blouse (measure straight and not measure along the curve). Another way to cross check this measurement is to compare it to ‘standard’ measurements. If the ‘standard’ armhole depth for a size 6 is 7 ¼” and armhole grades ¼” per size, use math to find the ‘standard’ armhole depth for your size. Are both of these measurements close to the armhole depth measurement taken on body?)"
  armholeDepth: 10,
  // bust depth is "shoulder tip to bust point (bust point is the nipple. To find, poke a needle from INSIDE of bra/tank top to OUTSIDE and mark"
  bustDepth: 15,
  // bust span is "bust point to bust point, divided by 2"
  bustSpan: 5,
  bustArc:  "CF to bust point to armhole depth/side seam. I do not advise to measure from CF to bust point and then pivot measuring tape up to armhole/side seam because the hollow in between breasts cause the measurement to be larger/bigger, especially if your breasts are very large. In theory, this measurement should be taken from the ‘bridge’ between bust points at CF but this is very hard. So I suggest to measure from bust point to armhole/side seam and then add this measurement to bust span measurement (make sure that bust span measurement is ½ of bust point to bust point)",
  shoulderSlope: "CF waist line to shoulder tip. Be sure that to keep measuring tape taut and extend it straight from waist, over bust point, and to shoulder tip",
  sideSeamLength: "armhole depth to waist line",
  waistArc: "CF to SS along waist line",
  dartPlacement: "bust span less ¾in"
}

window.onload = function(){
  var pattern = new Pattern('pattern-magic', personalMeasurements);
}
