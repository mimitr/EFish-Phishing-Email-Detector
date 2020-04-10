'use strict';

const safeBrowseKey = 'AIzaSyB1G2inB2zkX3aDImnneg23xEoFprqSx9w';
const safeBrowseURL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyB1G2inB2zkX3aDImnneg23xEoFprqSx9w';

console.log("MIMIIIII");

function checkEmail(event) {

  const options = {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'},
    body : {

    }

  }

  const requestBody = {
    "client": {
      "clientId":      "Efish",
      "clientVersion": "1"
    },
    "threatInfo": {
      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
      "platformTypes":    ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": "http://www.urltocheck1.org/"},
        {"url": "http://www.urltocheck2.org/"},
        {"url": "http://www.urltocheck3.com/"}
      ]
    }
  }

  fetch(safeBrowseURL, options) 
    .then (res => {
      return res.json();
    })
    then (json => {
      console.log(json)
    })

  

}


document.getElementById('check_email').addEventListener('click', checkEmail);

/*fetch('./api/some.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });*/