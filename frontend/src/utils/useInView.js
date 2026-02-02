import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const {
    once = true,
    root = null,
    rootMargin = "0px 0px -15% 0px",
    threshold = 0.15,
  } = options;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, inView };
}
