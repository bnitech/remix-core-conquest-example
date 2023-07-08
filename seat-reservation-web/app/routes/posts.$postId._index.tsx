import {
  ActionIcon,
  Box,
  Divider,
  Menu,
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Link, useLoaderData } from "@remix-run/react";
import PostView from "~/components/Post/Viewer";
import CommentUpload from "~/components/Post/Comment/Upload";
import List from "~/components/List";
import CommentItem from "~/components/Post/Comment/item";
import { getPost, TPost } from "~/models/post.service";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useEffect, useState } from "react";

interface ILoaderData {
  post: TPost;
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

export default function PostId() {
  const loaderData = useLoaderData<ILoaderData>();
  const [post, setPost] = useState<TPost>(loaderData.post);
  useEffect(() => {
    if (post) {
      setPost(loaderData.post);
    }
  }, [loaderData.post]);
  return (
    <Box sx={{ padding: "45px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to={"/"}>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <Title>{post?.title ?? "(제목 없음)"}</Title>
        </Box>
        <Menu shadow="md" width={200} position={"left-start"}>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconPencil size={14} />}>글 수정하기</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              글 삭제하기
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
      <Divider mt={20} mb={15} />
      <PostView content={post?.content ?? "(글 내용 없음)"} />
      <Divider mt={20} mb={20} />
      <Box>
        <Text>댓글 2개</Text>
        <Space h="lg" />
        <CommentUpload />
        <List>
          <CommentItem
            comment={{
              writer: "작성자",
              created_at: "2023-07-08",
              content: "댓글 내용 1",
            }}
          />
          <CommentItem
            comment={{
              writer: "작성자",
              created_at: "2023-07-08",
              content: "댓글 내용 2",
            }}
          />
          <CommentItem
            comment={{
              writer: "작성자",
              created_at: "2023-07-08",
              content: "댓글 내용 3",
            }}
          />
          <CommentItem
            comment={{
              writer: "작성자",
              created_at: "2023-07-08",
              content: "댓글 내용 4",
            }}
          />
        </List>
      </Box>
    </Box>
  );
}
