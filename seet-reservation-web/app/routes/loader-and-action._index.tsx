import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

type LoaderData = {
  status: number;
  message: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log('Action 실행됨');
  const body = await request.formData();
  const name = body.get('name');
  console.log(name);
  return redirect(`/loader-and-action`);
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('해당 console.log 는 터미널 (Remix Server) 에서만 나옵니다.');

  const cookie = request.headers.get('Cookie');
  const url = new URL(request.url);
  const query = url.searchParams.get('test');

  // console.log('Cookie', cookie);
  // console.log('URL', url);
  // console.log('Query', query);

  return json<LoaderData>({
    status: 200,
    message: 'Hello World',
  });
};

export default function LoaderAndAction_index() {
  const initalData = useLoaderData<LoaderData>();
  return (
    <div>
      {JSON.stringify(initalData)}
      <Form method="post">
        <input type="text" name="name" />
        <button type="button">전송</button>
      </Form>
    </div>
  );
}
