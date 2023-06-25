import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useParams,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import {
  createPost,
  getPostTitleByBoardId,
  TPostTitleOnly,
} from '~/models/post.service';

interface ILoaderData {
  posts: TPostTitleOnly[];
}

type ActionData = {
  message: string;
};

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

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO ID';

  const body = await request.formData();
  const title = body.get('title');
  const content = body.get('content');

  if (title && content && boardId !== 'NO ID') {
    // 값이 정상인가 validation
    const post = await createPost(
      title.toString(),
      content.toString(),
      parseInt(boardId, 10),
    ); // Supabase 를 통해 글 생성
    return json<ActionData>({ message: '글이 등록되었습니다.' });
  }

  return json<ActionData>({ message: '' });
};

export default function BoardId() {
  const params = useParams();
  const { boardId } = params;
  const location = useLocation();
  const loaderData = useLoaderData<ILoaderData>();
  const [posts, setPosts] = useState<TPostTitleOnly[]>(loaderData.posts);
  const actionData = useActionData<ActionData>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setPosts(loaderData.posts);
  }, [loaderData.posts]);

  useEffect(() => {
    console.log(actionData?.message);
    if (actionData?.message) {
      setMessage(actionData.message);
    }
  }, [actionData]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div style={{ border: '3px solid green' }}>
      <h1>게시판 ID: {boardId}</h1>
      {message && <div>{message}</div>}
      <Form method="post">
        <input type="text" name="title" placeholder="제목" />
        <br />
        <textarea name="content" placeholder="내용" />
        <br />
        <button type="submit">등록</button>
      </Form>
      {posts.map((post) => (
        <>
          <Link to={`${post.id}`} prefetch="intent">
            {post.title}
          </Link>{' '}
        </>
      ))}
      <Outlet />
    </div>
  );
}
