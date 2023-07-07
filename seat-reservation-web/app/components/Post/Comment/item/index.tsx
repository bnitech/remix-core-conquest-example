import {ActionIcon, Box, Menu, Space, Text} from "@mantine/core";
import React from "react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";

export default function CommentItem({ comment }: { comment: any }) {
  const createAtDate = new Date(comment.created_at);

  return (
    <Box
      sx={{
        padding: "15px 0px",
        borderBottom: "1px solid #eaeaea",
        userSelect: "element",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Text>{comment.writer}</Text>
          <Text>
            {createAtDate.toLocaleDateString()}{" "}
            {createAtDate.toLocaleTimeString()}
          </Text>
        </Box>
        <Box>
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
      </Box>
      <Space h={"md"}/>
      <Text>{comment.content}</Text>
    </Box>
  );
}
