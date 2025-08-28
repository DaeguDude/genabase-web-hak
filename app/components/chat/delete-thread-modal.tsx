"use client";
import { Modal } from "@shopify/polaris";
import { TThread } from "@/app/type";
import { deleteThread } from "@/app/api/new-api";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionStorage } from "@/app/hooks/use-session-storage";

interface DeleteThreadModalProps {
  thread: TThread;
  open: boolean;
  onClose: () => void;
}

export function DeleteThreadModal({
  thread,
  open,
  onClose,
}: DeleteThreadModalProps) {
  const [session_id] = useSessionStorage("session_id", "");
  const pathname = usePathname();
  const isOnTheDeletingThread = pathname.includes(thread.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Conversation"
      primaryAction={{
        content: "Delete",
        onAction: async () => {
          if (session_id) {
            await deleteThread(thread.id, session_id);
            queryClient.invalidateQueries({ queryKey: ["threads"] });
          }

          // 상황에 따라서... redirect
          if (isOnTheDeletingThread) {
            router.push(`/threads`);
          }

          onClose();
        },
        destructive: true,
      }}
      secondaryActions={[{ content: "Cancel", onAction: onClose }]}
    >
      <Modal.Section>
        Are you sure you want to delete this conversation?
      </Modal.Section>
    </Modal>
  );
}
