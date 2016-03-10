'use strict';

const Utility = {
  // *** Parse through query string *** //
  // *** Example:
  // *** localhost:3000/home?param1=value1&param2=value2
  // *** returns { param1: value1, param2: value2 }
  parseQueryString: function(url) {
    const formattedUrl = url.replace(/%2C/g, ',');  // replace commas
    const queryString = formattedUrl.split('?')[1];

    if(!queryString) return false;

    const queryArray = queryString.split('&');
    const myData = {};

    for(let i = 0; i < queryArray.length; i++) {
      let currentQuery = queryArray[i].split('=');

      myData[currentQuery[0]] = currentQuery[1];
    }

    return myData;
  }
}

module.exports = Utility;
