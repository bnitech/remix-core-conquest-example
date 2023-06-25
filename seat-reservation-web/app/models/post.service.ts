import supabase from './supabase';

export async function getPostByBoardId(board_id: number) {
  return await supabase
    .from('post')
    .select(`id, title, content, board_id`)
    .eq('board_id', board_id);
}

export async function getPosts(id: number) {
  return await supabase
    .from('post')
    .select(`id, title, content, board_id`)
    .eq('id', id);
}

export async function createPost(
  title: string,
  content: string,
  board_id: number,
) {
  return await supabase.from('post').insert({ title, content, board_id });
}

export async function updatePost(
  id: number,
  title: string,
  content: string,
  board_id: number,
) {
  return await supabase
    .from('post')
    .update({ title, content, board_id })
    .eq('id', id);
}

export async function deletePost(id: number) {
  return await supabase.from('post').delete().eq('id', id);
}