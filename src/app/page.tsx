import { PostForm } from "@/components/PostForm";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <main className="pb-20 pt-6 flex flex-col items-center">
      <PostForm />
      <div className="w-full mt-4 lg:mt-6 bg-[var(--card-bg)] border-y lg:border lg:rounded-2xl lg:shadow-md lg:max-w-2xl border-[var(--border-color)] overflow-hidden divide-y divide-[var(--border-color)] transition-colors duration-300">
        <Timeline />
      </div>
    </main>
  );
}
