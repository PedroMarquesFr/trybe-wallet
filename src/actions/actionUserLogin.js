export default function actionUserLogin(email) {
  return {
    type: 'USER_LOGIN',
    email,
  };
}
