/*
These types of scripts can read or write to a web page using Javascript! 
It can read and modify the DOM (Document Object Model) of web pages. 
This is going to be the most handy type of script when developing my extension as it will need to read through the DOM looking for links and potentially modifying them!
*/

let allLinks = document.getElementsByTagName('a');

chrome.runtime.sendMessage(
    "foo",
    function (response) {
        console.log(response);
    }
);

/*let findURLs = function() {
    let found;
    let re = /(\d+\s+[':.,\s\w]*,\s*[A-Za-z]+\s*\d{5}(-\d{4})?)/m;
    let node = document.body.textContent.match(re);
    if (document.body.textContent.match(re)) {
      found = node;
    }

    if (found) {
      let text = node;
      let match = re.exec(text);
      if (match && match.length) {
        console.log('found: ' + match[0]);
        let trim = /\s{2,}/g;
        let address = match[0].replace(trim, ' ')
        chrome.runtime.sendMessage({'address': address})
      } else {
        console.log('bad initial match: ' + found.textContent);
        console.log('no match in: ' + text);
      }
    }
  }
  
  findAddress();*/