import {
  ActionIcon,
  Box,
  Button, Center,
  Menu, Modal,
  PasswordInput,
  Space,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { TComment } from "~/models/post.service";
import { Form } from "@remix-run/react";
import { InputType } from "~/routes/posts.$postId._index";

interface ICommentItem {
  comment: TComment;
}

export default function CommentItem({ comment }: ICommentItem) {
  const createAtDate = new Date(comment.created_at ?? "");
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
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
              <Menu.Item
                icon={<IconPencil size={14} />}
                onClick={() => {
                  setMode("edit");
                }}
              >
                댓글 수정하기
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} />}
              onClick={()=>setDeleteModalOpened(true)}>
                댓글 삭제하기
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Modal
              opened={deleteModalOpened}
              onClose={() => setDeleteModalOpened(false)}
              title={"댓글 삭제"}
          >
            <Text align={"center"}>
              댓글을 삭제하기 위해서는 관리자 비밀번호
              <br/>
              또는 작성자 비밀번호를 입력해주세요
            </Text>
            <Space h="lg" />
            <Form method={"post"}>
              <input hidden={true} name={"commentId"} value={comment.id} />
              <Center>
                <PasswordInput
                    sx={{ minWidth: "300px" }}
                    name={"commentPassword"}
                    placeholder={"관리자 또는 작성자 비밀번호"}
                />
              </Center>
              <Space h={"lg"} />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant={"default"}
                    onClick={() => setDeleteModalOpened(false)}
                >
                  취소
                </Button>
                <Space w={"md"} />
                <Button
                    color={"red"}
                    type={"submit"}
                    name={"action"}
                    value={InputType.DELETE_COMMENT}
                >
                  삭제
                </Button>
              </Box>
            </Form>
          </Modal>
        </Box>
      </Box>
      <Space h={"md"} />
      {mode === "view" ? (
        <Text>{comment.content}</Text>
      ) : (
        <Box>
          <Form method={"post"} onSubmit={() => setMode("view")}>
            <input hidden={true} name={"commentId"} value={comment.id} />
            <Textarea
              name="commentContent"
              placeholder="댓글을 입력하세요."
              defaultValue={comment.content ?? "(댓글 내용 없음"}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <PasswordInput
                sx={{ minWidth: "200px" }}
                name="commentPassword"
                placeholder="작성자 비밀번호"
              />
              <Space w="xs" />
              <Button
                variant="default"
                onClick={() => {
                  setMode("view");
                }}
              >
                취소
              </Button>
              <Space w="xs" />
              <Button
                color="red"
                type="submit"
                name="action"
                value={InputType.UPDATED_COMMENT}
              >
                수정하기
              </Button>
            </Box>
          </Form>
        </Box>
      )}
    </Box>
  );
}
