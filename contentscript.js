/*
These types of scripts can read or write to a web page using Javascript! 
It can read and modify the DOM (Document Object Model) of web pages. 
*/

function main() {

    /*chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });*/

    console.log("DOC HIDDENNNN");
    let sender = document.getElementsByClassName('sender')[0].innerText;
    let body = document.getElementsByClassName('body')[0].innerText;
    console.log("content script body ", body)

    let message = {
        "sender": sender,
        "body": body 
    }

    chrome.runtime.sendMessage(message, function(response) {
        return true;
    });
//});
}

/*function destructor() {
    // Destruction is needed only once
    document.removeEventListener(destructionEvent, destructor);
    // Tear down content script: Unbind events, clear timers, restore DOM, etc.
}

var destructionEvent = 'destructmyextension_' + chrome.runtime.id;
// Unload previous content script if needed
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);*/

document.addEventListener('visibilitychange', function() {
    main();
});


