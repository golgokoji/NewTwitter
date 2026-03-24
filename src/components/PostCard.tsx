import React from "react";
import { formatDistanceToNow } from "date-fns";

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string | null;
  createdAt: any;
}

export const PostCard = ({ post }: { post: Post }) => {
  const timeAgo = post.createdAt?.toDate 
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) 
    : "just now";

  return (
    <div className="p-4 border-b border-[var(--border-color)] hover:brightness-[0.97] dark:hover:brightness-[1.1] transition-all duration-300 w-full bg-[var(--card-bg)]">
      <div className="flex gap-4">
        <div className="shrink-0">
          {post.authorPhoto ? (
            <img
              src={post.authorPhoto}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
              {post.authorName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        
        <div className="flex-grow flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[var(--text)] truncate max-w-[200px] sm:max-w-none">
              {post.authorName}
            </span>
            <span className="text-sm text-gray-500 truncate">
              · {timeAgo}
            </span>
          </div>
          <p className="text-[var(--text)] whitespace-pre-wrap break-words text-[15px] leading-snug opacity-90">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};
