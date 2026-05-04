import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type CursorState = "default" | "hover" | "click";

export function MinimalCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springCfg = { damping: 22, stiffness: 350 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);

  // Trailing dot — more lag
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("button");
      const link = target.closest("a");
      const card = target.closest("[data-cursor]") as HTMLElement | null;

      if (card) {
        setState("hover");
        setLabel(card.dataset.cursor || "");
      } else if (btn) {
        setState("hover");
        setLabel("click");
      } else if (link) {
        setState("hover");
        setLabel("open");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const onDown = () => setState("click");
    const onUp = () => setState(label ? "hover" : "default");
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, isVisible, label]);

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <>
      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(255,90,0,0.15) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Main ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHover ? 56 : isClick ? 20 : 32,
          height: isHover ? 56 : isClick ? 20 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-white flex items-center justify-center overflow-hidden"
          animate={{ borderColor: isHover ? "#FF5A00" : "white" }}
          style={{ borderWidth: isHover ? 1.5 : 1 }}
        >
          <AnimatePresence>
            {isHover && label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[7px] tracking-widest uppercase text-white font-mono"
                style={{ mixBlendMode: "difference" }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#FF5A00]"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 4, height: 4 }}
        animate={{ opacity: isHover ? 0 : isVisible ? 1 : 0, scale: isClick ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
}
