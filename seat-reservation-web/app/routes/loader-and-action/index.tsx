import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type TLoaderData = {
  status: number;
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('해당 console.log 는 터미널 (Remix Server) 에서만 나옵니다.');

  const cookie = request.headers.get('Cookie');

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  console.log('Cookie', cookie);
  console.log('URL', url);
  console.log('Query', query);

  return json<TLoaderData>({
    status: 200,
    message: 'Hello World',
  });
};

export default function LoaderAndAction() {
  const initalData = useLoaderData<TLoaderData>();
  return <div>{JSON.stringify(initalData)}</div>;
}
