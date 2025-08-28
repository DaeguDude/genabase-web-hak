import { TThread } from "../../type";
import { Thread } from "./thread";

interface ThreadListProps {
  threads: TThread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  if (!Array.isArray(threads) || threads.length === 0) {
    return (
      <span className="text-gray-400 px-4 py-2 block">
        No conversations yet.
      </span>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-[6px] text-[#8f8f8f]">
        <div className="flex min-h-[36px] px-[10px] py-[8px]">Chats</div>
      </div>

      {/* TODO: when chat list is empty it doesn't show */}
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
