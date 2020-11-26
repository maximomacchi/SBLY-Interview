// Module to interact with SBLY API endpoints

// Fetches ad insight data for days between start and end date parameters
const fetchAdInsights = async (start, end) => {
  let adInsights = {};
  let curDate = new Date(start);
  while (curDate <= end) {
    let curDateISOString = curDate.toISOString().substring(0, 10);
    const result = await fetch(
      'https://interview-api.sbly.com/ad-insights?date=' +
        curDateISOString +
        '&metrics=spend,revenue,impressions,clicks',
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer SHAREABLY_SECRET_TOKEN',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    adInsights[curDate.toISOString().substring(0, 10)] = result;
    curDate.setDate(curDate.getDate() + 1);
  }
  return adInsights;
};

// Fetches ad budget based on ad ID passed to function
const fetchAdBudget = async (id) => {
  const result = await fetch('https://interview-api.sbly.com/ad/' + id, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer SHAREABLY_SECRET_TOKEN',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return result;
};

export { fetchAdInsights, fetchAdBudget };
