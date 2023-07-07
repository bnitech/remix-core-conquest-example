import {
  Box,
  Button,
  PasswordInput,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";

export default function CommentUpload() {
  return (
    <Box>
      <Textarea name="commentContent" placeholder="댓글을 입력하세요." />
      <Space h="lg" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <TextInput
          sx={{ minWidth: "200px" }}
          name="commentWriter"
          placeholder="작성자 이름"
        />
        <Space w="xs" />
        <PasswordInput
          sx={{ minWidth: "200px" }}
          name="commentPassword"
          placeholder="작성자 비밀번호"
        />
        <Space w="xs" />
        <Button color="red" type="submit" name="action">
            작성하기
        </Button>
      </Box>
    </Box>
  );
}
