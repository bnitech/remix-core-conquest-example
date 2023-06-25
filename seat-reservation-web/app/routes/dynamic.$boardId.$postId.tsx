import {
  Form,
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useParams,
  useRouteError,
} from '@remix-run/react';
import {ActionFunction, json, LoaderFunction, redirect} from '@remix-run/node';
import {deletePost, getPost, TPost, updatePost} from '~/models/post.service';
import { useEffect, useState } from 'react';
import qs from 'qs'

interface ILoaderData {
  post: TPost | null;
}

enum InputType {
  UPDATE_POST = '0',
  DELETE_POST = '1',
}

type InputData = {
  action: InputType;
  id?: number;
  title?: string;
  content?: string;
};

type ActionData = {
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO Board ID';
  const postId = params.postId ?? 'NO Post ID';

  if (postId === 'NO Post ID') {
    throw json<ILoaderData>(
      {
        post: null,
      },
      { status: 404 },
    );
  }

  const post = await getPost(parseInt(postId, 10));

  return json<ILoaderData>({
    post: post.data,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? 'NO ID';

  console.log('request: ', request);
  const data = qs.parse(await request.text()) as unknown as InputData;
  console.log('data: ', data);

  switch (data.action) {
    case InputType.UPDATE_POST: {
      if (data.id && data.title && data.content) {
        const post = await updatePost(
          data.id,
          data.title,
          data.content,
          parseInt(boardId, 10),
        );
        console.log(post);
        return json<ActionData>({ message: '글이 수정되었습니다.' });
      }
    }
    case InputType.DELETE_POST: {
      if (data.id) {
        const post = deletePost(data.id);
        console.log(post);
        return redirect(`/dynamic/${boardId}`);
      }
    }
  }

  return json<ActionData>({ message: '' });
};

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('error: ', error);
  useEffect(() => {
    console.log(error);
  }, [error]);
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ border: '3px solid blue' }}>
        {error.status === 400 && <h1>400 에러가 발생했습니다.</h1>}
      </div>
    );
  }
}

export default function PostId() {
  const params = useParams();
  const { boardId, postId } = params;

  const loaderData = useLoaderData<ILoaderData>();
  const [post, setPost] = useState<TPost | null>(loaderData.post);

  const [mode, setMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post]);

  return (
    <div style={{ border: '3px solid blue' }}>
      <h1>게시판 ID: {boardId}</h1>
      <h1>게시글 ID: {postId}</h1>
      <Form method="post">
        <button type="submit" name="action" value={InputType.DELETE_POST}>
          삭제
        </button>
        <input type="hidden" name="id" value={post?.id} />
      </Form>
      <button
        onClick={() => {
          if (mode === 'view') {
            setMode('edit');
          } else {
            setMode('view');
          }
        }}
      >
        {mode === 'view' ? '수정' : '취소'}
      </button>
      {mode === 'edit' ? (
        <Form
          method="post"
          onSubmit={() => {
            setMode('view');
          }}
        >
          <input type="hidden" name="id" value={post?.id} />
          <input
            type="text"
            name="title"
            defaultValue={post?.title?.toString()}
          />
          <br />
          <textarea name="content" defaultValue={post?.content?.toString()} />
          <br />
          <button type="submit" name="action" value={InputType.UPDATE_POST}>
            수정
          </button>
        </Form>
      ) : (
        <>
          <h1>{post?.title}</h1>
          <h5>{post?.content}</h5>
        </>
      )}
      <Outlet />
    </div>
  );
}
