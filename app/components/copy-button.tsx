import { useClipboard } from "@heroui/use-clipboard";

import { Button, Icon } from "@shopify/polaris";
import { CheckIcon, ClipboardIcon } from "@shopify/polaris-icons";

interface CopyButtonProps {
  toCopy: string;
}

export function CopyButton({ toCopy }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  return (
    <Button
      icon={copied ? <Icon source={CheckIcon} tone="success" /> : ClipboardIcon}
      variant="tertiary"
      onClick={() => copy(toCopy)}
    />
  );
}
