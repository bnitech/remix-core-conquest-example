import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { useEffect } from 'react';
import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO Board ID';

  console.log('게시판 ID: ', boardId);

  return json({
    status: 200,
  });
};

export default function BoardId() {
  const params = useParams();
  const { boardId } = params;

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div style={{ border: '3px solid green' }}>
      <h1>게시판 ID: {boardId}</h1>
      {boardId === '1' && (
        <>
          <Link to="1">글 1</Link> <Link to="2">글 2</Link>{' '}
          <button onClick={() => navigate('3')}> 글 3</button>
        </>
      )}
      <Outlet />
    </div>
  );
}
