// React hook created to fetch data from SBLY's API
// Due to the interview solution consisting of only fetching data, the method
// has been constantly set to GET

function useSBLY_API(url, params = {}) {
  // Add parameters to URL
  if (Object.keys(params).length != 0) {
    url += '?';
    for (let param in params) {
      url += param + '=' + params[param] + '&';
    }
  }

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer SHAREABLY_SECRET_TOKEN',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export default useSBLY_API;
