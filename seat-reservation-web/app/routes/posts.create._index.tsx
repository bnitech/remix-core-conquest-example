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
import { Link } from "@remix-run/react";

export default function PostsCreate() {
  return (
    <Box sx={{ padding: "45px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to={"/"}>
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Title>글 작성</Title>
        <Space w="xs" />
      </Box>
      <Divider mt={20} mb={20} />
      <TextInput placeholder="제목" variant={"filled"} size={"xl"} />
      <Space h="xl" />글 입력란 자리입니다.
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <PasswordInput
          sx={{ minWidth: "200px" }}
          placeholder="관리자 비밀번호 "
        />
        <Space w="xs" />
        <Button color="red">작성하기</Button>
      </Box>
    </Box>
  );
}
