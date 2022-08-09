import { LOCAL_STORAGE_API_KEY } from '@/helpers/constants';

export default function loginAction() {
  return new Promise((resolve) => {
    resolve({
      user: {
        fullName: 'Elon Mask',
        dob: '2022-07-27T12:46:26.356Z',
        email: 'user@gmail.com',
        defaultCurrency: 'USD'
      },
      token:
        'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZWVkMUBzZWVkLmNvbSIsIlVzZXJJZCI6ImI1YjRlZGFjLTFlYWItNDg5Yi05Nzk2LWQwMzA0MWU3MDhmZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NjAwNTk0MzB9.jazfpLlbYfmiuX3IfKLLRP59IjyCr70NEc6I2p7nnXMzfRY0NU1el3a8LynIQ9tTzYWqtEC9H8Pr41gX958Qhg'
    });
  }).then((data) => {
    localStorage.setItem(LOCAL_STORAGE_API_KEY, data.token);
    return data.user;
  });
}
