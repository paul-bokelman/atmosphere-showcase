import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "react-use";

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & { blinderHeight: number }>;

export const ScrollContainer: React.FC<Props> = ({ blinderHeight, children, ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { y } = useScroll(containerRef);
  const maxHeight = containerRef.current
    ? containerRef.current?.scrollHeight - containerRef.current?.clientHeight
    : undefined;
  return (
    <div {...props}>
      <AnimatePresence>
        {y > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: `${blinderHeight}px` }}
            className="absolute top-0 z-10 w-full pointer-events-none bg-gradient-to-t from-transparent via-bg/50 to-bg"
          />
        )}
      </AnimatePresence>
      <div ref={containerRef} className="relative flex h-full overflow-scroll no-scrollbar">
        {children}
      </div>
      <AnimatePresence>
        {((maxHeight && y < maxHeight) || !maxHeight) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: `${blinderHeight}px` }}
            className="absolute z-10 bottom-0 w-full pointer-events-none bg-gradient-to-b from-transparent to-bg"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
