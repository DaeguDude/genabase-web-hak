"use client";

import { useEffect, useRef, useState } from "react";
import { ThreadList } from "./thread-list";
import { ActionList, Avatar, Popover } from "@shopify/polaris";
import {
  ComposeIcon,
  LayoutSidebarLeftIcon,
  HomeIcon,
} from "@shopify/polaris-icons";
import { cn } from "@heroui/react";
import Link from "next/link";
import { useShopInfo } from "../../hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useIsScrolled } from "@/app/hooks/use-is-scrolled";
import { useUser } from "@auth0/nextjs-auth0";
interface TThread {
  id: string;
  title?: string;
}

interface SidePanelProps {
  threads: TThread[];
}

function useStopHomeIconFlicker(
  ref: React.RefObject<HTMLDivElement | null>,
  open: boolean
) {
  useEffect(() => {
    const sidebarElement = ref.current;
    function handleTransitionEnd() {
      if (sidebarElement) {
        sidebarElement.style.pointerEvents = "auto";
      }
    }
    if (sidebarElement) {
      sidebarElement.addEventListener("transitionend", handleTransitionEnd);
    }
    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      }
    };
  }, [ref, open]);
}

export function SidePanel({ threads }: SidePanelProps) {
  const shopInfo = useShopInfo();
  const [popoverActive, setPopoverActive] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const isScrolled = useIsScrolled(sidebarRef.current);
  const { user } = useUser();

  const activator = (
    <div
      className="h-full rounded-lg py-[6px] pl-[8px] pr-[10px] hover:bg-[#0000000a] flex items-center gap-2"
      onClick={() => setPopoverActive(true)}
    >
      <Avatar name={user?.name} source={user?.picture} />
      <div>{user?.name}</div>
    </div>
  );

  // TODO: These 2 are hacky ways to stop home icon flickering when collapsing
  // Might need further investigation on improving this(250821, sh)
  useStopHomeIconFlicker(sidebarRef, open);

  const handleCloseSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.pointerEvents = "none";
    }
    setOpen(!open);
  };

  const railWidth = 52; // .25rem * 13
  const router = useRouter();

  const handleHomeClick = () => {
    if (sidebarRef.current) {
      if (sidebarRef.current.scrollTop === 0) {
        router.push(`/threads`);
      } else {
        sidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={sidebarRef}
      // NOTE: don't know why w-[260px] doesn't work
      style={{
        minWidth: open ? 260 : railWidth,
        maxWidth: open ? 260 : railWidth,
      }}
      className={cn(
        `h-full flex flex-col bg-[#f9f9f9]`,
        "transition-all duration-300",
        "overflow-y-auto"
      )}
    >
      {open ? (
        <>
          <div
            style={{}}
            className={cn(
              "sticky top-0 z-10 bg-[#f9f9f9]",
              isScrolled && "border-b border-[rgba(13,13,13,0.05)]"
            )}
          >
            <div className="w-full flex justify-between items-center min-h-[52px] px-2">
              <div className="h-[36px] w-[36px] flex items-center justify-center hover:bg-[#00000012] rounded-lg cursor-pointer">
                {/* When clicked I want to scroll to top */}
                <HomeIcon width={24} height={24} onClick={handleHomeClick} />
              </div>
              <div
                onClick={handleCloseSidebar}
                className="h-[36px] w-[36px] flex items-center justify-center hover:bg-[#00000012] rounded-lg cursor-w-resize"
              >
                <LayoutSidebarLeftIcon
                  width={24}
                  height={24}
                  className="text-[#0d0d0d]"
                />
              </div>
            </div>
          </div>

          <aside className="flex flex-col pt-2 pb-3">
            <div className="px-[6px]">
              <Link
                href={`/threads`}
                className="flex items-center gap-1.5 min-h-[36px] py-[6px] px-[10px] text-[#0d0d0d] hover:bg-[#0000000a] rounded-lg cursor-pointer"
              >
                <div>
                  <ComposeIcon width={24} height={24} />
                </div>
                <div>New Chat</div>
              </Link>
            </div>
          </aside>

          {/* THREADS */}
          <ThreadList threads={threads} />

          {shopInfo?.name && (
            <div className="sticky bottom-0 z-30 py-1.5 bg-[#f9f9f9] min-h-[60px]">
              <div className="h-full w-full px-[6px]">
                <Popover
                  active={popoverActive}
                  activator={activator}
                  autofocusTarget="first-node"
                  preferredPosition="above"
                  onClose={() => setPopoverActive(false)}
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: "Logout",
                        // icon: EditIcon,
                        url: "/auth/logout",
                      },
                    ]}
                  />
                </Popover>
              </div>
            </div>
          )}
        </>
      ) : (
        <SideBarTinyBar onOpenSidebar={() => setOpen(true)} />
      )}
    </div>
  );
}

function SideBarTinyBar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [hovering, setHovering] = useState(false);
  const { user } = useUser();
  const [popoverActive, setPopoverActive] = useState(false);
  const activator = (
    <div
      className="rounded-lg hover:bg-[#0000000a] flex items-center cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setPopoverActive(true);
      }}
    >
      <Avatar name={user?.name} source={user?.picture} size="lg" />
    </div>
  );

  return (
    <div
      className="h-full flex flex-col cursor-e-resize justify-between"
      onClick={onOpenSidebar}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div>
        <div className="w-full flex justify-between items-center min-h-[52px] px-2">
          <div
            onClick={onOpenSidebar}
            className="h-[36px] w-[36px] flex items-center justify-center hover:bg-[#00000012] rounded-lg cursor-e-resize"
          >
            {hovering ? (
              <LayoutSidebarLeftIcon width={24} height={24} />
            ) : (
              <HomeIcon width={24} height={24} />
            )}
          </div>
        </div>

        {/* New CHAT */}
        <div className="mt-2">
          <Link
            href={`/threads`}
            className="max-w-[40px] mx-[6px] flex items-center gap-1.5 min-h-[36px] py-[6px] px-[10px] text-[#0d0d0d] hover:bg-[#0000000a] rounded-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="min-w-[24px] min-h-[24px]">
              <ComposeIcon width={24} height={24} />
            </div>
          </Link>
        </div>
      </div>

      {user?.name && (
        <div className="sticky bottom-0 z-30 py-1.5 bg-[#f9f9f9] min-h-[60px]">
          <div className="h-full w-full px-[6px]">
            <Popover
              active={popoverActive}
              activator={activator}
              autofocusTarget="first-node"
              preferredPosition="above"
              onClose={() => setPopoverActive(false)}
            >
              <ActionList
                actionRole="menuitem"
                items={[
                  {
                    content: "Logout",
                    url: "/auth/logout",
                  },
                ]}
              />
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
