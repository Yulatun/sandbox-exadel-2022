import { useEffect, useState } from 'react';

import loginAction from './AuthProvider';
export default function useLoginAction() {
  const [data, setData] = useState({ user: null });

  useEffect(() => {
    loginAction().then((response) => setData(response));
  }, []);

  return data;
}
