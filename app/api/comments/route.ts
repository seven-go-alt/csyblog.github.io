import { NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "缺少必填参数 slug" }, { status: 400 });
  }

  try {
    const comments = await getComments(slug);
    return NextResponse.json(comments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, author_name, content } = body;

    if (!slug || !author_name || !content) {
      return NextResponse.json({ error: "缺少必填字段: slug, author_name, content" }, { status: 400 });
    }

    if (author_name.trim() === "" || content.trim() === "") {
      return NextResponse.json({ error: "昵称和内容不能为空" }, { status: 400 });
    }

    const data = await addComment(slug, author_name.trim(), content.trim());
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
