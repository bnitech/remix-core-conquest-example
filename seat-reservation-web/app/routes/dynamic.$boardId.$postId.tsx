import { Outlet, useParams } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO Board ID';
  const postId = params.postId ?? 'NO Board ID';

  console.log('게시판 ID: ', boardId);
  console.log('글 ID: ', postId);

  return json({
    status: 200,
  });
};

export default function PostId() {
  const params = useParams();
  const { boardId, postId } = params;

  return (
    <div style={{ border: '3px solid blue' }}>
      <h1>게시판 ID: {boardId}</h1>
      <h1>게시글 ID: {postId}</h1>
      <Outlet />
    </div>
  );
}
