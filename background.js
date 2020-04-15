chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.body);
    chrome.storage.local.set({"sender": request.sender,
                              "body": request.body
                             });
  }
);
