"use client";
import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

interface RenameThreadModalProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function RenameThreadModal({
  open,
  initialName,
  onClose,
  onSubmit,
}: RenameThreadModalProps) {
  const [name, setName] = useState(initialName);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Rename Conversation"
      primaryAction={{ content: "Rename", onAction: () => onSubmit(name) }}
      secondaryActions={[{ content: "Cancel", onAction: onClose }]}
    >
      <Modal.Section>
        <TextField
          name="name"
          label="Conversation name"
          value={name}
          onChange={setName}
          autoFocus
          autoComplete="off"
        />
      </Modal.Section>
    </Modal>
  );
}
