"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SendHorizontal } from "lucide-react";

export const PostForm = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        content: content.trim(),
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        authorPhoto: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setContent("");
    } catch (error) {
      console.error("Failed to add post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 border-b lg:rounded-b-2xl lg:border-none lg:shadow-xl lg:mt-4 border-gray-200 dark:border-gray-800 transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="shrink-0 mt-1">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
              {user.displayName?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col gap-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            className="w-full bg-transparent text-xl resize-none outline-none placeholder:text-gray-500 py-2 dark:text-white"
            rows={Math.max(1, Math.min(content.split("\\n").length, 8))}
            maxLength={280}
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
            <span className="text-xs text-gray-400">
              {content.length > 0 && `${content.length} / 280`}
            </span>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? "Posting..." : "Post"}
              {!isSubmitting && <SendHorizontal className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
