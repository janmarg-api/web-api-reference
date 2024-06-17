const baseUrl = "https://ahmedabadbrts.org:8081";
const apiStatusText = document.getElementById("api-status-text");

var isApiFunctional = true;

let endpoints = new Map();
endpoints.set(`${baseUrl}/api/RouteTimeTable?Rows=100&Page=0`, {
  method: "GET",
  authentication: true,
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

function checkUrl(endpoint, options) {
  fetch(endpoint, options).then((response) => {
    if (response.ok) {
      apiStatusText.innerHTML = "Functional";
    } else {
      apiStatusText.innerHTML = "Down";
      isApiFunctional = false;
    }
  });
}

// Iterate through all endpoints
getToken().then((accessToken) => {
  console.log(accessToken);
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
