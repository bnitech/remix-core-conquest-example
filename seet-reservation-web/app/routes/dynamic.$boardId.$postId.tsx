import {
    isRouteErrorResponse,
    Outlet,
    useLoaderData,
    useParams,
    useRouteError,
} from '@remix-run/react';
import {json, LoaderFunction} from '@remix-run/node';
import {getPost, TPost} from '~/models/post.service';
import {useEffect, useState} from 'react';

interface ILoaderData {
    post: TPost | null;
}

export const loader: LoaderFunction = async ({request, params}) => {
    const boardId = params.boardId ?? 'NO Board ID';
    const postId = params.postId ?? 'NO Post ID';

    if (postId === 'NO Post ID') {
        throw json<ILoaderData>(
            {
                post: null,
            },
            {status: 404},
        );
    }

    if (postId === '2') {
        throw json<ILoaderData>(
            {
                post: null,
            },
            {status: 400},
        );
    }

    const post = await getPost(parseInt(postId, 10));

    return json<ILoaderData>({
        post: post.data,
    });
};

export function ErrorBoundary() {
    const error = useRouteError();
    console.log('error: ', error);
    useEffect(() =>{
        console.log(error)
    }, [error])
    if (isRouteErrorResponse(error)) {
        return (
            <div style={{border: '3px solid blue'}}>
                {error.status === 400 && <h1>400 에러가 발생했습니다.</h1>}
            </div>
        );
    }
}

export default function PostId() {
    const params = useParams();
    const {boardId, postId} = params;

    const loaderData = useLoaderData<ILoaderData>();
    const [post, setPost] = useState<TPost | null>(loaderData.post);

    useEffect(() => {
        setPost(loaderData.post);
    }, [loaderData.post]);

    return (
        <div style={{border: '3px solid blue'}}>
            <h1>게시판 ID: {boardId}</h1>
            <h1>게시글 ID: {postId}</h1>
            <h1>{post?.title}</h1>
            <h5>{post?.content}</h5>
            <Outlet/>
        </div>
    );
}
