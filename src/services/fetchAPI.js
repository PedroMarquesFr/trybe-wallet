const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = () => fetch(APIURL).then((response) => response.json().then((json) => {
  if (response.ok) {
    delete json.USDT;
    return Promise.resolve(json);
  }
  return Promise.reject(json);
}));

export default fetchAPI;
