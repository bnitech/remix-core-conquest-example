import { Outlet } from '@remix-run/react';
import { useState } from 'react';

export default function _authLogin() {
  const [value, setValue] = useState('hello');
  return (
    <div style={{ border: '3px solid green' }}>
      <h1>Login</h1>
      <Outlet context={{value}} />
    </div>
  );
}
