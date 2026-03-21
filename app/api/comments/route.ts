import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const post_slug = searchParams.get("post_slug");

  if (!post_slug) {
    return NextResponse.json({ error: "Missing post_slug" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_slug", post_slug)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { post_slug, author_name, content } = body;

    if (!post_slug || !author_name || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_slug, author_name, content }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
