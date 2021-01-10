// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: 'alguem@email.com',
};

export default function user(state = initialState, { type, email }) {
  switch (type) {
  case 'USER_LOGIN':
    return { ...state, email };
  default:
    return state;
  }
}
