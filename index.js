"use strict";

var topUrl =
  require('sdk/simple-prefs').prefs['topUrl'] || "https://127.0.0.1:4001";
var self = require('sdk/self');
var setTimeout = require("sdk/timers").setTimeout;
var tabs = require("sdk/tabs");
var button =
  require("sdk/ui/button/action")
    .ActionButton({
      id : "kurippo-button",
      label : "Kurippo",
      icon : {"16" : "./ku-16.svg", "32" : "./ku-32.svg", "64" : "./ku-64.svg"},
      onClick : function() {

        // Build the clip object
        var selection = require("sdk/selection");
        var tab = tabs.activeTab;
        var obj = {
          source : "firefox jpm add-on",
          url : tab.url,
          title : tab.title,
          isQuote : true,
          selection : selection.text || ""
        };
        console.log(obj);

        // Open the panel, showing transmission
        feedbackPanel.port.emit("input", "Sending…" + obj.url);
        feedbackPanel.show();

        // POST to server
        var Request = require('sdk/request').Request;
        var xhr = Request({
          url : topUrl + "/clip",
          content : obj,
          onComplete : function(res) {
            console.log("Request done!", res.status, res.statusText, res.text);

            // POST successful
            if (res.status === 200) {
              feedbackPanel.port.emit("input", "Success!");
              setTimeout(function() { feedbackPanel.hide(); }, 100);
              return;
            }

            // Unsuccessful: not logged in. Open a new tab.
            if (res.status === 401) {
              feedbackPanel.port.emit(
                "input", 'Not logged in. Forwarding you to login page now…');
              tabs.open(topUrl);
              setTimeout(function() { feedbackPanel.hide(); }, 1000);
              return;
            }

            // Unknown status code (not 200, not 401).
            feedbackPanel.port.emit(
              "input",
              "Heard back from server but didn't understand response. Please try again");
            setTimeout(function() { feedbackPanel.hide(); }, 5000);

          }
        });
        xhr.post();
      }
    });
var feedbackPanel = require("sdk/panel")
                      .Panel({
                        width : 400,
                        height : 200,
                        contentURL : "./kurippo-display.html",
                        contentScriptFile : "./kurippo-display.js",
                        position : button
                      });

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) { callback(text); }

exports.dummy = dummy;
