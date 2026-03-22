import { createClient } from "@supabase/supabase-js";
import { Comment } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getComments(slug: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", slug)
    .eq("is_approved", true)
    .order("created_at", { ascending: true });
    
  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
  return data as Comment[];
}

export async function addComment(slug: string, author_name: string, content: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_slug: slug, author_name, content }])
    .select()
    .single();
    
  if (error) {
    console.error("Error adding comment:", error);
    throw new Error(error.message);
  }
  return data as Comment;
}
