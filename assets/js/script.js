const el = document.querySelector('.heart');
const heart = $('.heart .heart_svg');
let tl = new TimelineMax({ paused: true });
let timeline = new mojs.Timeline();

tl.add(
TweenMax.to(heart, 0.15, {
  scaleX: .4,
  scaleY: .2,
  ease: Back.easeOut.config(4) }));


tl.add(
TweenMax.to(heart, 0.25, {
  scaleX: 1,
  scaleY: 1,
  ease: Back.easeOut.config(4) }));



const burst = new mojs.Burst({
  parent: el,
  count: 10,
  radius: { 0: 80 },
  duration: 1500,
  children: {
    radius: { 15: 0 },
    easing: 'cubic.out',
    degreeShift: 'rand(-50,50)' } });



const burst2 = new mojs.Burst({
  parent: el,
  count: 15,
  radius: { 0: 60 },
  children: {
    shape: 'line',
    stroke: 'white',
    fill: 'none',
    scale: 1,
    scaleX: { 1: 0 },
    easing: 'cubic.out',
    duration: 1000,
    degreeShift: 'rand(-50, 50)' } });



const bubbles = new mojs.Burst({
  parent: el,
  radius: 50,
  count: 5,
  timeline: { delay: 200 },
  children: {
    stroke: 'white',
    fill: 'none',
    scale: 1,
    strokeWidth: { 8: 0 },
    radius: { 0: 'rand(6, 10)' },
    degreeShift: 'rand(-50, 50)',
    duration: 400,
    delay: 'rand(0, 250)' } });



const circ_opt = {
  parent: el,
  radius: { 0: 50 },
  duration: 750,
  shape: 'circle',
  fill: 'none',
  stroke: '#FF4136',
  strokeWidth: 1,
  opacity: { 1: 0 } };


const circ = new mojs.Shape({
  ...circ_opt });


const circ2 = new mojs.Shape({
  ...circ_opt,
  delay: 100 });


timeline.add(circ, circ2);


// when clicking the button start the timeline/animation:
$(el).on('click', function () {
  if ($(el).hasClass('active')) {
    $(el).toggleClass('active');
  } else {
    $(el).toggleClass('active');
    tl.restart();
    burst.
    generate().
    replay();
    burst2.
    generate().
    replay();
    bubbles.
    generate().
    replay();
    timeline.replay();
  }
});
// Music
const love = new Audio("assets/music/Interstellar.mp3");


function playAudio() {
  love.loop = true;
  love.volume = 1;
  love.play();
}

// Function to stop the audio playback with fade-out effect
function stopAudio() {
  if (love) {
    // Store the current playback position
    var currentPosition = love.currentTime;

    // Define the duration of the fade-out effect in milliseconds
    var fadeOutDuration = 2000; // 2 seconds
    
    // Calculate the interval for reducing the volume gradually
    var interval = love.volume / (fadeOutDuration / 100);

    // Create an interval to decrease the volume gradually
    var fadeOutInterval = setInterval(function() {
      // Reduce the volume gradually
      love.volume -= interval;

      // Check if the volume is very small (close to zero)
      if (love.volume <= 0.1) {
        // Set the volume to 0 to avoid DOMException
        love.volume = 0;
      }

      // Check if the volume is already at or below 0
      if (love.volume <= 0) {
        // Pause the audio
        love.pause();
        clearInterval(fadeOutInterval); // Clear the interval

        // Reset the current time of the audio to the stored position
        love.currentTime = currentPosition;
      }
    }, 100); // Interval time (100ms)
  }
}

$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	$(".container").stop();
	if ($("#messageState").is(":checked")) {

		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".clickme").removeClass("showClickMe").addClass("removeClickMe");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#FF8896"}, 2000);
		playAudio();
	} else {

		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#FFDEE3"}, 2000, function() {
			$(".clickme").removeClass("removeClickMe").addClass("showClickMe");
		});
		stopAudio();
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	
	if (!$(".heart").hasClass("closeHer"))
		$(".heart").addClass("openedHer").addClass("beating");
	else
		$(".heart").addClass("no-anim");
		$(".heart").removeClass("openHer").removeClass("closeHer");

});




