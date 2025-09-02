"use client";
import { cn } from "@heroui/react";
import { ActionList, Button, Popover } from "@shopify/polaris";
import {
  DeleteIcon,
  EditIcon,
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import { useState } from "react";
import { TThread } from "../../type";
import Link from "next/link";
import { DeleteThreadModal } from "./delete-thread-modal";
import { RenameThreadModal } from "./rename-thread-modal";
import { renameThread } from "@/app/api/new-api";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionStorage } from "@/app/hooks/use-session-storage";
import { usePathname } from "next/navigation";

export function Thread({ thread }: { thread: TThread }) {
  const [session_id] = useSessionStorage("session_id", "");
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const handleRenameSubmit = async (name: string) => {
    if (!session_id) return;

    await renameThread(thread.id, name, session_id);
    queryClient.invalidateQueries({ queryKey: ["threads"] });
    setRenameModalOpen(false);
  };

  const toggleActive = () => setPopoverActive((active) => !active);

  const activator = (
    <div
      className={cn(
        "flex items-center justify-center",
        "opacity-0 group-hover:opacity-100"
      )}
    >
      <Button
        // STUPID TYPE DESIGN: https://github.com/Shopify/polaris/issues/11234#issuecomment-1873497154
        // @ts-expect-error temporary
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          toggleActive();
        }}
        icon={MenuHorizontalIcon}
        variant="plain"
      />
    </div>
  );

  const isActive = pathname.includes(thread.id);

  return (
    <>
      <div className="px-[6px]">
        <Link
          href={`/threads/${thread.id}`}
          className={cn(
            "flex justify-between items-center min-h-[36px] px-[10px] py-[8px] rounded-lg cursor-pointer",
            "text-[#0d0d0d]",
            "hover:bg-[#0000000a] group",
            isActive && "bg-[#0000000f]"
          )}
        >
          <div className="min-w-0 grow overflow-hidden whitespace-nowrap text-ellipsis">
            {thread.title}
          </div>
          <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={toggleActive}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: "Rename",
                    icon: EditIcon,
                    onAction: () => {
                      setRenameModalOpen(true);
                    },
                  },
                  {
                    destructive: true,
                    content: "Delete Chat",
                    icon: DeleteIcon,
                    onAction: () => setDeleteModalOpen(true),
                  },
                ]}
              />
            </div>
          </Popover>
        </Link>
      </div>

      <RenameThreadModal
        open={renameModalOpen}
        initialName={thread.title || thread.id}
        onClose={() => setRenameModalOpen(false)}
        onSubmit={handleRenameSubmit}
      />

      <DeleteThreadModal
        thread={thread}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
