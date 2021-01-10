// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const REQUESTING_DATA = 'REQUESTING_DATA';
const RECEIVED_DATA = 'RECEIVED_DATA';
const FAILED_REQUEST = 'FAILED_REQUEST';

const DELETE_EXP = 'DELETE_EXP';
const EDIT_EXP = 'EDIT_EXP';
const EDIT_STATE_CHANGE = 'EDIT_STATE';
const CHANGE_ID = 'CHANGE_ID';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
  editor: false,
  idToEdit: 0,
};

export default function reducer(state = initialState, { type, expense }) {
  const { expenses } = state;
  const newExpenses = [...expenses];
  let index;
  let exchangeRates = 1;
  if (type === EDIT_EXP || type === DELETE_EXP) {
    console.log('cond: ', expense.id);
    index = expenses.findIndex(({ id }) => id === expense.id);
    exchangeRates = newExpenses[index].exchangeRates;
  }

  switch (type) {
  case REQUESTING_DATA:
    return { ...state, isFetching: true };
  case RECEIVED_DATA:
    return {
      ...state,
      expenses: [...state.expenses, expense],
      isFetching: false,
    };
  case FAILED_REQUEST:
    return { ...state, error: state.expenses, isFetching: false };
  case DELETE_EXP:
    newExpenses.splice(index, 1);
    return {
      ...state,
      expenses: [...newExpenses],
      isFetching: false,
    };
  case EDIT_EXP:
    newExpenses[index] = { ...expense, exchangeRates };
    console.log(state);
    return {
      ...state,
      expenses: [...newExpenses],
      isFetching: false,
    };
  case EDIT_STATE_CHANGE:
    console.log(state);
    return {
      ...state,
      editor: expense, // true or false
    };
  case CHANGE_ID:
    return {
      ...state,
      idToEdit: expense, // nesse caso o expense não é um objeto e sim o proprio id
    };
  default:
    return state;
  }
}

// {
//     user: {
//       email: '',
//     },
//     wallet: {
//       currencies: [],
//       expenses: []
//     }

//   }
