import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit(); // this is used to submit a form programmatically, ie without clicking on a button

  useEffect(() => {
    if (!token) return;
    if (token === 'EXPIRED') {
      submit(null, { action: '/login', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      // null means we don't submit any data, like form data
      submit(null, { action: '/login', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
