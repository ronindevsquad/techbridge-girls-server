const fs = require('fs');
const request = require('request');

module.exports = {
  requestSignature: function (req, res) {
    var url = "https://demo.docusign.net/restapi/v2/login_information";
    var body = "";	// no request body for login api call

    // set request url, method, body, and headers
    var options = initializeRequest(url, "GET", body, 'philiptranbavo@gmail.com', 'Passw0rd');

    // send the request...
    request(options, function (err, res, body) {
      if (!parseResponseBody(err, res, body)) {
        return;
      }
      baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
      console.log(baseUrl)

      var url = baseUrl + "/envelopes";
      // following request body will place 1 signature tab 100 pixels to the right and
      // 100 pixels down from the top left of the document that you send in the request
      var body = {
        "recipients": {
          "signers": [{
            "email": 'dgzmnfernando@gmail.com',
            "name": 'Fernando Deguzman',
            "recipientId": 1,
            "tabs": {
              "signHereTabs": [{
                "xPosition": "50",
                "yPosition": "500",
                "documentId": "1",
                "pageNumber": "2"
              }]
            }
          },
          {
            "email": 'sonny.tosco@gmail.com',
            "name": 'Sonny Tosco',
            "recipientId": 2,
            "tabs": {
              "signHereTabs": [{
                "xPosition": "50",
                "yPosition": "500",
                "documentId": "1",
                "pageNumber": "2"
              }]
            }
          }]
        },
        "emailSubject": 'Sign this nigga',
        "documents": [{
          "name": 'fuck_you',
          "documentId": 1,
        }],
        "status": "sent",
      };

      // set request url, method, body, and headers
      var options = initializeRequest(url, "POST", body, 'philiptranbavo@gmail.com', 'Passw0rd');

      // change default Content-Type header from "application/json" to "multipart/form-data"
      options.headers["Content-Type"] = "multipart/form-data";

      // configure a multipart http request with JSON body and document bytes
      options.multipart = [{
        "Content-Type": "application/json",
        "Content-Disposition": "form-data",
        "body": JSON.stringify(body),
      }, {
        "Content-Type": "application/pdf",
        'Content-Disposition': 'file; filename="' + 'fuck_you' + '"; documentId=1',
        "body": fs.readFileSync('./techbridge.pdf'),
      }
      ];

      // send the request...
      request(options, function (err, res, body) {
        console.log('got error')
        console.log('err:', err)
        parseResponseBody(err, res, body);
      });

    });

    res.end();
  }
}

function initializeRequest(url, method, body, email, password) {
  var options = {
    "method": method,
    "uri": url,
    "body": body,
    "headers": {}
  };
  addRequestHeaders(options, email, password);
  return options;
}

function addRequestHeaders(options, email, password) {
  // JSON formatted authentication header (XML format allowed as well)
  dsAuthHeader = JSON.stringify({
    "Username": email,
    "Password": password,
    "IntegratorKey": '89c72d62-a6e4-497b-ae5a-59a05cdc4cfa'  // global
  });
  // DocuSign authorization header
  options.headers["X-DocuSign-Authentication"] = dsAuthHeader;
}

function parseResponseBody(err, res, body) {
  console.log("\r\nAPI Call Result: \r\n", JSON.parse(body));
  console.log(res.statusCode)
  if (res.statusCode != 200 && res.statusCode != 201) { // success statuses
    console.log("Error calling webservice, status is: ", res.statusCode);
    console.log("\r\n", err);
    return false;
  }
  return true;
}