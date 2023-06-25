import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { getPostTitleByBoardId, TPostTitleOnly } from '~/models/post.service';

interface ILoaderData {
  posts: TPostTitleOnly[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO Board ID';

  if (boardId === 'NO Board ID') {
    return json<ILoaderData>({
      posts: [],
    });
  }

  const posts = await getPostTitleByBoardId(parseInt(boardId, 10));

  return json<ILoaderData>({
    posts: posts.data || [],
  });
};

export default function BoardId() {
  const params = useParams();
  const { boardId } = params;

  const navigate = useNavigate();
  const location = useLocation();

  const loaderData = useLoaderData<ILoaderData>();
  const [posts, setPosts] = useState<TPostTitleOnly[]>(loaderData.posts);

  useEffect(() => {
    setPosts(loaderData.posts);
  }, [loaderData.posts]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div style={{ border: '3px solid green' }}>
      <h1>게시판 ID: {boardId}</h1>
      {posts.map((post) => (
        <>
          <Link to={`${post.id}`} prefetch="intent">
            {post.title}
          </Link>
        </>
      ))}
      <Outlet />
    </div>
  );
}
