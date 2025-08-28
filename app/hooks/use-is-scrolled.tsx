import { useEffect, useState } from "react";

export function useIsScrolled(scrollContainer: HTMLElement | null) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (scrollContainer?.scrollTop && scrollContainer.scrollTop > 0) {
        if (!isScrolled) {
          setIsScrolled(true);
        }
      } else {
        setIsScrolled(false);
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled, scrollContainer]);

  return isScrolled;
}
