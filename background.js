
chrome.runtime.onInstalled.addListener(function() {

  console.log(document.getElementsByTagName('a'));
  console.log("helooooo");
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

    chrome.declarativeContent.onPageChanged.addRules([{

      conditions: [new chrome.declarativeContent.PageStateMatcher({

        pageUrl: {hostEquals: 'mail.google.com'},

      })],

      actions: [new chrome.declarativeContent.ShowPageAction()]

    }]);
  });
}); 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log("background.js got a message")
      console.log(request);
      console.log(sender);
      sendResponse("bar");
  }
);


