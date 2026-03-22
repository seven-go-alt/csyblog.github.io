"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types";

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 60) return "刚刚";
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} 分钟前`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} 小时前`;
  if (diffSeconds < 2592000) return `${Math.floor(diffSeconds / 86400)} 天前`;
  if (diffSeconds < 31536000) return `${Math.floor(diffSeconds / 2592000)} 个月前`;
  return `${Math.floor(diffSeconds / 31536000)} 年前`;
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchComments();

    const channel = supabase
      .channel("public:comments")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments", filter: `post_slug=eq.${slug}` }, (payload) => {
        setComments((prev) => [...prev, payload.new as Comment]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, author_name: authorName, content: newComment })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "提交失败");
      }
      setNewComment("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        评论区 <span className="text-lg text-gray-500 font-normal">({comments.length} 条评论)</span>
      </h3>
      
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
        {error && <p className="mb-4 text-sm text-red-500 font-medium">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md block w-full sm:w-auto"
        >
          {loading ? "提交中..." : "发表评论"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic text-center py-6">还没有评论，来说第一句吧</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center rounded-full font-bold uppercase">
                {comment.author_name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.author_name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
