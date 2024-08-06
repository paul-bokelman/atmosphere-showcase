import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    blinderHeight: number;
    shouldScrollState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  }
>;

export const ScrollContainer: React.FC<Props> = ({
  blinderHeight,
  shouldScrollState = undefined,
  children,
  ...props
}) => {
  const [containerRef, setContainerRef] = React.useState<HTMLDivElement | null>(null);
  const [showTop, setShowTop] = React.useState<boolean>(false);
  const [showBottom, setShowBottom] = React.useState<boolean>(false);

  const hideDistancePadding = 12;

  const handleBlinderState = (y: number, maxHeight: number) => {
    console.log(y, maxHeight);
    setShowTop(y - hideDistancePadding > 0);
    setShowBottom(y < maxHeight - hideDistancePadding);
  };

  React.useEffect(() => {
    if (window && containerRef) {
      const handleScroll = () => {
        handleBlinderState(containerRef.scrollTop, containerRef.scrollHeight - containerRef.clientHeight);
      };

      const handleResize = () => {
        if (containerRef) {
          handleBlinderState(containerRef.scrollTop, containerRef.scrollHeight - containerRef.clientHeight);
        }
      };

      handleScroll();
      handleResize();
      containerRef.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      return () => {
        containerRef.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (shouldScrollState && containerRef) {
      const [shouldScrollTop, setShouldScrollTop] = shouldScrollState;
      if (shouldScrollTop) {
        containerRef.scrollTo(0, 0);
        setShouldScrollTop(false);
      }
    }
  }, [containerRef, shouldScrollState]);

  return (
    <div {...props}>
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ height: `${blinderHeight}px` }}
            className="absolute top-0 z-10 w-full pointer-events-none bg-gradient-to-t from-transparent via-bg/50 to-bg"
          />
        )}
      </AnimatePresence>
      <div ref={(r) => setContainerRef(r)} className="relative flex h-full overflow-scroll no-scrollbar">
        {children}
      </div>
      <AnimatePresence>
        {showBottom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ height: `${blinderHeight}px` }}
            className="absolute z-10 bottom-0 w-full pointer-events-none bg-gradient-to-b from-transparent to-bg"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
