import {
  ActionIcon,
  Box,
  Button,
  Divider,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import {Form, Link, useActionData, useLoaderData} from "@remix-run/react";
import PostUpload from "~/components/Post/Upload";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { getPost, TPost, updatePost } from "~/models/post.service";
import {useEffect, useState} from "react";
import { InputType } from "~/routes/posts.$postId._index";
import qs from "qs";
import {showNotification} from "@mantine/notifications";

interface ILoaderData {
  post: TPost;
}

type InputData = {
  id: string;
  title: string;
  content: string;
  password: string;
};

interface IActionData {
  message: TMessage;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = params.postId as string;
  const getPostResponse = await getPost(parseInt(postId));
  if (getPostResponse !== null) {
    return json<ILoaderData>({ post: getPostResponse.data as TPost });
  } else {
    return redirect("/");
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const data = qs.parse(await request.text()) as unknown as InputData;

  if (!data.password || data.password !== process.env.ADMIN_PASSWORD) {
    return json<IActionData>({
      message: {
        title: "글 수정 실패",
        message: "패스워드가 일치하지 않습니다.",
        color: "red",
      },
    });
  }

  if (data.id && data.title && data.content) {
    const post = await updatePost(parseInt(data.id), data.title, data.content);
    return redirect(`/posts/${data.id}`);
  }

  return json<IActionData>({
    message: {
      title: "글 수정 실패",
      message: "제목과 내용을 모두 입력해주세요.",
      color: "red",
    },
  });
};

export default function PostsUpdate() {
  const loaderData = useLoaderData<ILoaderData>();
  const [post, setPost] = useState<TPost>(loaderData.post);
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<IActionData>();

  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post]);

  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.message.title,
        message: message.message.message,
        color: message.message.color,
      });
    }
  }, [message]);

  return (
    <Box sx={{ padding: "45px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to={"/"}>
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Title>글 수정</Title>
        <Space w="xs" />
      </Box>
      <Divider mt={20} mb={20} />
      <Form method={"post"}>
        <input hidden={true} name={"id"} defaultValue={post?.id.toString()} />
        <TextInput
          placeholder="제목"
          variant={"filled"}
          size={"xl"}
          name={"title"}
          defaultValue={post?.title ?? ""}
        />
        <Space h="xl" />
        <PostUpload defaultValue={post?.content ?? ""} />
        <Space h={"xl"} />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <PasswordInput
            sx={{ minWidth: "200px" }}
            name={"password"}
            placeholder="관리자 비밀번호"
          />
          <Space w="xs" />
          <Button color="red" type={"submit"}>
            수정하기
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
