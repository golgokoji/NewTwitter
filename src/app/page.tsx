import { Header } from "@/components/Header";
import { PostForm } from "@/components/PostForm";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black">
      <Header />
      <main className="pb-20 flex flex-col items-center">
        <PostForm />
        <div className="w-full mt-4 lg:mt-6 bg-white dark:bg-gray-900 border-y lg:border lg:rounded-2xl lg:shadow-xl lg:max-w-2xl border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 transition-all duration-300">
          <Timeline />
        </div>
      </main>
    </div>
  );
}
