import fetchAPI from '../services/fetchAPI';

const REQUESTING_DATA = 'REQUESTING_DATA';
const RECEIVED_DATA = 'RECEIVED_DATA';
const FAILED_REQUEST = 'FAILED_REQUEST';

const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData = (resp) => ({ type: RECEIVED_DATA, ...resp });
const failedRequest = (error) => ({ type: FAILED_REQUEST, resp: error });
export default function handleAsync(expense) {
  return async (dispatch) => {
    try {
      dispatch(requestingData());
      console.log('antes');
      const exchangeRates = await fetchAPI();
      console.log('depois');
      return dispatch(receivedData({ expense: { ...expense, exchangeRates } }));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
