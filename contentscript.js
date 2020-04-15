/*
These types of scripts can read or write to a web page using Javascript! 
It can read and modify the DOM (Document Object Model) of web pages. 
This is going to be the most handy type of script when developing my extension as it will need to read through the DOM looking for links and potentially modifying them!
*/


let sender = document.getElementsByClassName('sender')[0].innerText;
let body = document.getElementsByClassName('body')[0].innerText;

let message = {
    "sender": sender,
    "body": body 
}

chrome.runtime.sendMessage(message, function(response) {
});