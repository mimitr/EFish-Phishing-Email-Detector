
/*chrome.storage.local.get(["check_button_clicked"], function (items) {
  if (items.check_button_clicked == true) {
    chrome.browserAction.setPopup({popup: "email_analysis.html"});
    console.log("change popup");
  }
});*/

/*document.addEventListener('visibilitychange', function() {
  console.log("DOC HIDDENNNN", document[hidden]);
});*/

chrome.storage.local.get(["body"], function (items) {
  console.log(items.body);
    
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.body);
    chrome.storage.local.set({"sender": request.sender,
                              "body": request.body
                             });
    
    chrome.storage.local.get(["body"],  function (items) {
      console.log("background script body", items.body);
    });

    sendResponse();
                             
  }

);



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  chrome.browserAction.setPopup({popup: "popup.html"});
  console.log("refreshed!!!");
  
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
  });
  
 /* chrome.storage.local.get(["check_button_clicked"], function (items) {
    if (items.check_button_clicked == true) {
      chrome.browserAction.setPopup({popup: "popup.html"});
      console.log("change popup");
    }
    chrome.storage.local.set({"check_button_clicked": false});
  });*/
  /*chrome.storage.local.get(["check_button_clicked"], function (items) {
    if (items.check_button_clicked == true) {
      chrome.storage.local.set({"checkbutton_clicked":false});
    }*/
});
