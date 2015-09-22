"use strict";
var self = require('sdk/self');
var button = require("sdk/ui/button/action")
                 .ActionButton({
                   id : "style-tab",
                   label : "Style Tab",
                   icon : {
                     "16" : "./icon-16.png",
                     "32" : "./icon-32.png",
                     "64" : "./icon-64.png"
                   },
                   onClick : function() {
                     var selection = require("sdk/selection");
                     var tab = require("sdk/tabs").activeTab;
                     var obj = {
                       source : "firefox jpm add-on",
                       url : tab.url,
                       title : tab.title,
                       isQuote : true,
                       selection : selection.text || ""
                     };
                     console.log(obj);

                     var Request = require('sdk/request').Request;
                     var xhr = Request({
                       url : "https://127.0.0.1:4001/clip",
                       onComplete : function(res) {
                         console.log("Request done!", res.status,
                                     res.statusText, res.text);
                       },
                       content : obj
                     });
                     xhr.post();
                   }
                 });

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) { callback(text); }

exports.dummy = dummy;
