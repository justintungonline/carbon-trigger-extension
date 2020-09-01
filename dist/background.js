chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.action === 'updateIcon') {
		//🌱set the icon🌱
	}
});
//borrowed from energy lollipop extension, nice feature!
function drawIcon(value) {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

	context.beginPath();
	context.fillStyle = value.color;
	context.arc(100, 100, 50, 0, 2 * Math.PI);
	context.fill();

	return context.getImageData(50, 50, 100, 100);
}
