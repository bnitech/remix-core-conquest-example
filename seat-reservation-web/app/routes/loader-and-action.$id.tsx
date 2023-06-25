import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  status: number;
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log(params)
  const id = params.id ?? 'NO ID';
  return json<LoaderData>({
    status: 200,
    message: id,
  });
};

export default function LoaderAndAction() {
  const initalData = useLoaderData<LoaderData>();
  return <div>{JSON.stringify(initalData)}</div>;
}
