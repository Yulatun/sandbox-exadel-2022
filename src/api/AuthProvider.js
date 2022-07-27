export default function loginAction() {
  return new Promise((resolve) => {
    resolve({
      user: {
        fullName: 'Elon Mask',
        dob: '2022-07-27T12:46:26.356Z',
        email: 'user@gmail.com',
        defaultCurrency: 'USD'
      },
      token: 'DTYHKL57HGGJ'
    });
  }).then((data) => {
    localStorage.setItem('token', data.token);
    return data;
  });
}
