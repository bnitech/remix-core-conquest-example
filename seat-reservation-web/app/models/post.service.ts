import supabase from "~/models/supabase";

export type TPost = {
  id: number;
  title: string | null;
  content: string | null;
  created_at: string | null;
  comment: TComment | TComment[] | null | { count: number }[];
};

export type TComment = {
  id: number;
  writer: string | null;
  content: string | null;
  created_at: string | null;
  post_id: number | null;
};

export async function getCommentPassword(id: number) {
  return supabase
    .from("comment")
    .select("password")
    .eq("id", id)
    .limit(1)
    .single();
}

export async function createComment(
  post_id: number,
  writer: string,
  content: string,
  password: string
) {
  return supabase
    .from("comment")
    .insert({ post_id, writer, content, password });
}

export async function updateComment(id: number, content: string) {
  return supabase.from("comment").update({ content }).eq("id", id);
}

export async function deleteComment(id: number) {
  return supabase.from("comment").delete().eq("id", id);
}

export async function getPosts() {
  return supabase
    .from("post")
    .select(`id, title, content, created_at, comment(count)`)
    .order("created_at", { ascending: false });
}

export async function getPost(id: number) {
  return supabase
    .from("post")
    .select(`id, title, content, created_at, comment(*)`)
    .eq("id", id)
    .limit(1)
    .single();
}

export async function createPost(title: string, content: string) {
  return supabase.from("post").insert({ title, content });
}

export async function updatePost(id: number, title: string, content: string) {
  return supabase.from("post").update({ title, content }).eq("id", id);
}

export async function deletePost(id: number) {
  return supabase.from("post").delete().eq("id", id);
}
