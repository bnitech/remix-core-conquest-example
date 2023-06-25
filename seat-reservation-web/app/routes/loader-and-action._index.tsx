import { json, LoaderFunction } from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

type LoaderData = {
    status: number;
    message: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    console.log("해당 console.log 는 터미널 (Remix Server) 에서만 나옵니다.")

    // Request 에 있는 Cookie 가져오는 법
    const cookie = request.headers.get("Cookie");

    // URL Query `?query=` 로 들어온 값을 가져오는 방법
    const url = new URL(request.url);
    const query = url.searchParams.get("test");

    console.log("Cookie", cookie)
    console.log("URL", url);
    console.log("Query", query);

    // => 위와 동일한 코드, json 은 Response 객체를 쉽게 만들어 주는 Helper 함수입니다.
    return json<LoaderData>({
        status: 200,
        message: "Hello World",
    });
};

export default function LoaderAndAction_index(){
    const initalData = useLoaderData<LoaderData>()
    return <div>{JSON.stringify(initalData)}</div>
}