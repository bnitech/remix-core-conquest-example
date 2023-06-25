import {json, LoaderFunction, ActionFunction, redirect} from '@remix-run/node';
import { Form } from '@remix-run/react';

type TLoaderData = {
  status: number;
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('해당 console.log 는 터미널 (Remix Server) 에서만 나옵니다.');

  const cookie = request.headers.get('Cookie');

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  // console.log('Cookie', cookie);
  // console.log('URL', url);
  // console.log('Query', query);

  return json<TLoaderData>({
    status: 200,
    message: 'Hello World',
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log('Action 실행됨');
  const body = await request.formData();
  const name = body.get('name');
  console.log(name);
  return redirect(`/loader-and-action`);
};

export default function LoaderAndAction() {
  return (
    <div>
      <Form method="post">
        <input type="text" name="name" />
        <button type="submit">전송</button>
      </Form>
    </div>
  );
}
