// React hook created to fetch data from SBLY's API
// Due to the interview solution consisting of only fetching data, the method
// has been constantly set to GET

import { useState, useEffect } from 'react';

function useSBLY_API(url, params = {}) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // Attempt to fetch data and throw error if one occurs
    try {
      setLoading(true);
      // Add parameters to URL
      if (Object.keys(params).length != 0) {
        url += '?';
        for (let param in params) {
          url += param + '=' + params[param] + '&';
        }
      }

      // Fetch data from URL and return it
      const result = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer SHAREABLY_SECRET_TOKEN',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((data) => data);
      setData(result);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchData() once to fetch data based on URL and params passed in
  useEffect(() => {
    fetchData();
  }, [url]);

  return [data, err, loading];
}

export default useSBLY_API;
