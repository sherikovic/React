import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signup';
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const res = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (res.status === 422 || res.status === 401) {
    // this can be fetched for example by useActionData to tell which response or error status was sent back
    return res;
  }

  if (!res.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }

  // manage the token sent back from the backend
  const resData = await res.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); // creates a date that is one hour in the future
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
