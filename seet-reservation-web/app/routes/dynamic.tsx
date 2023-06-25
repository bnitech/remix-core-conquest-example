import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { getBoards, TBoard } from '~/models/board.service';
import { useState } from 'react';

interface ILoaderData {
  boards: TBoard[]; // TBoard 는 게시판 객체의 타입입니다.
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const boards = await getBoards();
  return json<ILoaderData>({ boards: boards.data || [] });
}; // Remix Server 에서 실행되는 코드

export default function Dynamic() {
  const loaderData = useLoaderData<ILoaderData>();
  const [boards] = useState<TBoard[]>(loaderData.boards);
  return (
    <div style={{ border: '3px solid red' }}>
      <h1>Dynamic</h1>
      {boards.map((board) => (
        <>
          <Link to={`${board.id}`} prefetch="intent">
            {board.name}
          </Link>{' '}
        </>
      ))}
      <Outlet />
    </div>
  );
}
