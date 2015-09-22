"use strict";
self.port.on("askSelection", function() {
  self.port.emit("sendSelection", String(window.getSelection()));
});


