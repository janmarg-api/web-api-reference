const baseUrl = "https://ahmedabadbrts.org:8081/";
const apiStatusText = document.getElementById("api-status-text");

var isApiFunctional = true;

// List of all endpoints to check
let endpoints = new Map();

endpoints.set(`${baseUrl}/api/RouteTimeTable?Rows=100&Page=0`, {
  method: "GET",
  authentication: true,
});

endpoints.set(`${baseUrl}/api/FareMatrix/GetAllFare?serviceType=BRTS`, {
  method: "GET",
  authentication: true
});


// Obtain token
function getToken() {
  return new Promise(function (resolve, reject) {
    fetch(`${baseUrl}/token`, {
      method: "POST",
      body: "grant_type=password&username=WApiUser&password=tttttt",
    }).then((tokenResponse) => {
      if (tokenResponse.ok) {
        tokenResponse.json().then((jsonResponse) => {
          resolve(jsonResponse.access_token);
        });
      } else {
        reject();
      }
    });
  });
}

// Check if url is accessible, then modify html to indicate whether API is functioning
function checkUrl(endpoint, options) {
  fetch(endpoint, options).then((response) => {
    if (response.ok) {
      apiStatusText.innerHTML = "Functional";
      apiStatusText.style.color = "green";
    } else {
      apiStatusText.innerHTML = "Down";
      apiStatusText.style.color = "red";

      isApiFunctional = false;
    }
  });
}

// Iterate through all endpoints
getToken().then((accessToken) => {
  for (const [endpoint, options] of endpoints) {
    if (!isApiFunctional) {
      break;
    }

    if (options.authentication) {
      options.headers = new Headers({
        Authorization: "bearer " + accessToken,
      });
    }

    checkUrl(endpoint, options);
  }
});
