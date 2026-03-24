import React from "react";
import { formatDistanceToNow } from "date-fns";

export interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string | null;
  createdAt: any; // Firestore Timestamp
}

export const PostCard = ({ post }: { post: Post }) => {
  const timeAgo = post.createdAt?.toDate 
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) 
    : "just now";

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors w-full bg-white dark:bg-gray-900">
      <div className="flex gap-4">
        <div className="shrink-0">
          {post.authorPhoto ? (
            <img
              src={post.authorPhoto}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
              {post.authorName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        
        <div className="flex-grow flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-none">
              {post.authorName}
            </span>
            <span className="text-sm text-gray-500 truncate">
              · {timeAgo}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words text-[15px] leading-snug">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};
