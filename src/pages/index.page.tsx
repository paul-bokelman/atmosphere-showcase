import type { NextPage, GetStaticProps } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBooksPayload } from "~/pages/api/types";
import React from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Logo } from "~/components";
import { getAllBooks } from "~/lib/queries";

type Props = PropsWithConfig<{ books: GetBooksPayload["books"] }>;

const Landing: NextPage<Props> = ({ books }) => {
  const [sliderTrackRef, setSliderTrackRef] = React.useState<HTMLDivElement | null>(null);
  let duration = 35;
  const xTranslation = useMotionValue(0);

  React.useEffect(() => {
    let scrollWidth = sliderTrackRef?.scrollWidth || 0;
    let finalPosition = -scrollWidth / 2 - 8;

    let controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: duration,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls?.stop;
  }, [xTranslation, duration, sliderTrackRef]);

  return (
    <div className="w-full md:w-[600px] mx-auto flex flex-col items-center justify-center mt-20">
      <Logo />
      <h1 className="text-primary text-lg font-primary mt-4 mb-8">Atmosphere</h1>
      <p className="text-secondary text-center">
        Welcome to <span className="text-primary font-semibold">Atmosphere</span>, a tool designed to create immersive
        audiobooks <span className="text-primary font-semibold">powered by Google Gemini</span>. Experience the future
        of storytelling with advanced technology that{" "}
        <span className="text-primary font-semibold">brings your favorite narratives to life</span>.
      </p>
      <div className="relative w-full mt-20">
        <div className="relative w-[calc(100%+100px)] right-[50px] h-full pointer-events-none overflow-hidden">
          <div className="absolute z-10 w-full left-0 h-[200px] md:h-[218px] bg-gradient-to-r from-bg via-bg/0 to-bg" />
          <motion.div ref={(ref) => setSliderTrackRef(ref)} className="w-full flex gap-4" style={{ x: xTranslation }}>
            {[...books, ...books].map((book, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <motion.img
                key={book.slug + index}
                src={book.cover ?? "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png"}
                alt={book.title}
                className="rounded-2xl h-[200px] md:h-[218px]"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = await getAllBooks({ body: {} });

  if (query.status === "error") {
    return { redirect: { destination: "/500", permanent: false } };
  }

  const books = query.books;
  return {
    props: {
      books,
      config: {
        layout: {
          nav: {
            items: [
              {
                span: 1,
                variant: "secondary",
                external: true,
                href: "https://github.com/paul-bokelman/atmosphere",
                icon: "github",
              },
              {
                span: 2,
                variant: "primary",
                href: "/books",
                children: "Continue",
              },
            ],
          },
        },
        seo: {
          title: "Atmosphere",
          description: "Welcome to Atmosphere, a tool designed to create immersive audiobooks.",
        },
      },
    },
  };
};

export default Landing;
