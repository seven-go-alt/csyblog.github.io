"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types";

export function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments?post_slug=${postSlug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    };
    fetchComments();

    const channel = supabase
      .channel("public:comments")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `post_slug=eq.${postSlug}` }, (payload) => {
        setComments((prev) => [payload.new as Comment, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;
    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_slug: postSlug, author_name: authorName, content: newComment })
    });
    setNewComment("");
    setLoading(false);
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">评论区</h3>
      
      <form onSubmit={handleSubmit} className="mb-10 p-6 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="mb-4">
          <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">昵称</label>
          <input
            id="author_name"
            type="text"
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none transition-shadow"
            placeholder="你的昵称"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">评论内容</label>
          <textarea
            id="content"
            required
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none outline-none transition-shadow"
            placeholder="写下你的想法..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
        >
          {loading ? "提交中..." : "发表评论"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic text-center py-6">暂无评论，来做第一个留言的人吧！</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.author_name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at).toLocaleString("zh-CN")}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
