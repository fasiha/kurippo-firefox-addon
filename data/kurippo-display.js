"use strict";
var element = document.getElementById("message");
self.port.on("input", function(text) { element.innerHTML = text; });
