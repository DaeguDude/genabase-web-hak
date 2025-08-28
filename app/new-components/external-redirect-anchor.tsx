import { cn } from "@heroui/react";

type TAnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

// STUPID SHOPIFY DOESN'T have a doc
// https://sondh5.github.io/shopify-app-open-in-new-tab/#:~:text=Recently%20I%20moved%20to%20a,References
export function ExternalRedirectAnchor({
  className,
  href,
  ...props
}: Omit<TAnchorProps, "rel" | "target" | "href"> & { href: string }) {
  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      {...props}
      className={cn(className)}
    >
      {props.children}
    </a>
  );
}
