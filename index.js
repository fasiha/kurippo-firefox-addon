"use strict";
var self = require('sdk/self');
var button =
    require("sdk/ui/button/action")
        .ActionButton({
          id : "style-tab",
          label : "Style Tab",
          icon : {
            "16" : "./icon-16.png",
            "32" : "./icon-32.png",
            "64" : "./icon-64.png"
          },
          onClick : function() {
            var tab = require("sdk/tabs").activeTab;
            var worker =
                tab.attach({contentScriptFile : self.data.url("myxhr.js")});
            worker.port.emit("askSelection");
            worker.port.on("sendSelection", function(selection) {
              var obj = {
                source : "firefox jpm add-on",
                url : tab.url,
                title : tab.title,
                isQuote : true,
                selection : selection
              };
              console.log(obj);

              var req = new XMLHttpRequest();
              req.onreadystatechange = (() => {
                console.log(req.readyState || 'no readyState',
                            req.status || 'no status',
                            req.responseText || 'no responseText');
              });
              req.open('POST', 'https://127.0.0.1:4001/clip', true);
              req.setRequestHeader('Content-Type', 'application/json');
              req.withCredentials = true;
              req.send(JSON.stringify(obj));

            });
          }
        });

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
