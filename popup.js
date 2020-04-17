'use strict';

const safeBrowseFindURL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyB1G2inB2zkX3aDImnneg23xEoFprqSx9w';
const safeBrowseGetURL = 'https://safebrowsing.googleapis.com/v4/threatLists?key=AIzaSyB1G2inB2zkX3aDImnneg23xEoFprqSx9w';

function checkEmail(event) {

  console.log(document.getElementsByTagName('button'));

  chrome.storage.local.get(['sender'], function (items) {
    console.log(items.sender);
    // check senders authority
    check_sender(items.sender);
  });


  /* Process body message:
  1. get all the links, format to a json style 
  2. fetch using Safe Browsing API
  */

  chrome.storage.local.get(['body'], function (items) {
    console.log("item body is: ", items.body);

    // get the links from the body message using regex
    let foundLinks = items.body.match(/("?https?:\/\/[^\s]+)/gi);
    console.log("founs linkss",foundLinks);

    if (foundLinks != null) {
      let url_entries = [];
      for (let i = 0; i < foundLinks.length; i++) {
        url_entries.push({"url": foundLinks[i]});
      }
      console.log("url_entries is ", url_entries);
      check_links(url_entries);
      check_spelling(items.body);
      //get_badLinks();
    }
  });

  chrome.storage.local.set({"check_button_clicked": true});
  chrome.browserAction.setPopup({popup: "email_analysis.html"});
}


function check_links (url_entries) {
  let requestBody = {
    "client": {
      "clientId":      "EFish",
      "clientVersion": "1"
    },
    "threatInfo": {
      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
      "platformTypes":    ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": url_entries
    }
  };

  let options = {
    "method": 'POST',
    "headers": {
      'Content-Type': 'application/json'
    },
    "body": JSON.stringify(requestBody)
  };

  fetch(safeBrowseFindURL, options) 
    .then (res => {
      console.log("res is ");
      console.log(res);
      return res.json();
    })
    .then (json => {
      console.log("json is", json);
      if (json.matches == null) {
        console.log("empty check links");
      } else {
        chrome.storage.local.set({"check_links_array": json.matches});
        chrome.storage.local.get(["check_links_array"], function (items) {
          console.log("check links array iss", items.check_links_array);
        })
      }
    })

}

/* Shows the list of bad links */
function get_badLinks() {
  let options = {
    "mode": 'no-cors',
    "method": 'GET',
    "headers": {
      'Content-Type': 'application/json'
    }
  }

  fetch(safeBrowseGetURL, options) 
    .then (res => {
      console.log("badlinks are ");
      console.log(res);
      return res.json();
    })
    .then (json => {
      console.log(JSON.stringify(json));
    })
}



function check_spelling(body) {

  console.log("INSIDE CHECK SPELLING FNvand the body is ", body);
  const spellCheckUrl = 'https://efish.cognitiveservices.azure.com/bing/v7.0/spellcheck?text=' + body;
  const spelling_key = '8858777b084a4fee9cb3b3b6291b32dd';

  let options = {
    method: 'POST',
    headers: {
      "Ocp-Apim-Subscription-Key": spelling_key,
      "ContentType": "application/x-www-form-urlencoded"
    },
    mkt: 'en-AU',
    cc: 'AU',
    setLang: 'en'
  }

  let request = spellCheckUrl;
  fetch(request, options) 
    .then (res => {
      console.log("spell checks are ");
      console.log(res);
      return res.json();
    })
    .then (json => {
      console.log("spell json is", json);

      chrome.storage.local.set({"spell_errors_num": json.flaggedTokens.length});

      let spell_error_array = []
      for (let i = 0; i < json.flaggedTokens.length; i++) {
        spell_error_array.push(json.flaggedTokens[i]);
      }

      chrome.storage.local.set({"spell_error_array": spell_error_array});
      
      /*chrome.storage.local.get(["spell_error_array"], function (items) {
        console.log("spell arrayyy", items.spell_error_array);
      }); */

      /*chrome.storage.local.get(["spell_errors_num"], function(items) {
        console.log("spell nummmm", items.spell_errors_num);
      });*/
    })
}


const senderCheckURL = 'https://emailrep.io/';
const senderCheckKey = 'r0nyywijgoh29vs7ihamzysjcyufx3w5qpzmt7glbviiq0id';
function check_sender(sender) {

  const test_request = 'https://cors-anywhere.herokuapp.com/https://emailrep.io/';

  let request = test_request.concat("mimitran1305@gmail.com");
  let options = {
    "method": 'GET',
    headers : { 
     // "ContentType": "application/x-www-form-urlencoded",
     // "ContentType": "application/json",
      'Accept': 'application/json'
     }
  }

  fetch(request, options) 
    .then (res => {
      console.log("email rep are ");
      console.log(res);
      return res.text();
    })
    .then (json => {
      console.log("email rep json is ", json);
    })

}

document.getElementById('check_email').addEventListener('click', checkEmail); 
