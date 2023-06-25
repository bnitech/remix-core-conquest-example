import { Link, Outlet } from '@remix-run/react';

export default function Dynamic() {
  return (
    <div style={{ border: '3px solid red' }}>
      <h1>Dynamic</h1>
      <Link to="1" prefetch="intent">
        게시판 1
      </Link>{' '}
      <Link to="2" prefetch="render">
        게시판 2
      </Link>{' '}
      <Link to="3" prefetch="none">
        게시판 3
      </Link>{' '}
      <Outlet />
    </div>
  );
}
