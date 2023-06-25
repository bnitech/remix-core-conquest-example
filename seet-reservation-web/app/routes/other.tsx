import { Outlet } from '@remix-run/react';

export default function Other() {
  return (
    <div style={{ border: '3px solid green' }}>
      <h1>Other</h1>
      <Outlet />
    </div>
  );
}
