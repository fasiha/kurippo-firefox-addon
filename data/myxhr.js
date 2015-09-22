"use strict";
/*
self.port.on('kurippo-run', function() {
  self.port.emit("kurippo-selection", String(window.getSelection()));
});
*/
self.port.on("drawBorder", function(color) {
  document.body.style.border = "5px solid " + color;
  self.port.emit("kurippo-selection", String(window.getSelection()));
});


/*
var req = new XMLHttpRequest();
req.onreadystatechange = (() => {
  console.log(req.readyState || 'no readyState', req.status || 'no status',
              req.responseText || 'no responseText');
});
req.open('POST', 'https://127.0.0.1:4001/clip', true);
req.setRequestHeader('Content-Type', 'application/json');
req.withCredentials = true;
req.send(JSON.stringify({
  source : 'clipper',
  url : document.location.href,
  title : document.title,
  selection : String(window.getSelection()),
  isQuote : true
}));
*/
