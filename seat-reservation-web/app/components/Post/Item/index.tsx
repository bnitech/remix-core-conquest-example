import { Box, Space, Text, Title } from "@mantine/core";
import React from "react";
import { TPost } from "~/models/post.service";
import { Link } from "@remix-run/react";

interface IPostItem {
  post: TPost;
}

export default function PostItem({ post }: IPostItem) {
  const createAtDate = new Date(post.created_at ?? "");
  const commentCount = (post.comment as { count: number }[])[0].count;
  return (
    <Box
      sx={{
        padding: "15px 0px",
        borderBottom: "1px sold #eaeaea",
        userSelect: "element",
      }}
    >
      <Link to={`/posts/${post.id}`} prefetch={"intent"}>
        <Title order={3}>{post.title}</Title>
      </Link>
      <Space h="xs" />
      <Link to={`/posts/${post.id}`} prefetch={"intent"}>
        <Text lineClamp={3}>
          {post.content
            ? post.content.replace(/<[^>]+>/g, "")
            : "내용이 없습니다."}
        </Text>
      </Link>
      <Space h="xs" />
      <Box sx={{ display: "flex" }}>
        <Text size="xs" color="gray">
          <>댓글 {commentCount}개</>
        </Text>
        <Space w="xs" />
        <Text size="xs" color="gray">
          {createAtDate.toLocaleDateString()}{" "}
          {createAtDate.toLocaleTimeString()}
        </Text>
      </Box>
    </Box>
  );
}
