import WidthWrapper from "@/components/chunks/WidthWrapper";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="mt-24">
      <WidthWrapper className="flex flex-col items-start gap-5 md:gap-7 lg:gap-10">
        {/* Hero */}
        <section>
          <h1 className="text-7xl leading-tight tracking-tighter lg:pt-5 lg:text-center lg:text-8xl">
            Let&apos;s{" "}
            <span className="font-semibold text-primary">Revive</span>{" "}
            {/* Try to keep word 'social media' together */}
            <span className="inline-block">Social Media</span>
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-auto lg:text-2xl">
            Are you tired of being a slave of an algorithm?{" "}
            <span className="inline-block">
              It is the time to{" "}
              <span className="text-primary">break the cage</span>!
            </span>
          </p>
        </section>
        {/* Motivation */}
        <Separator />
        <section className="grid grid-cols-1 gap-5">
          <div className="flex flex-col gap-3 md:gap-7">
            <h2 className="text-4xl font-semibold tracking-tight md:text-center md:text-5xl">
              The Problem
            </h2>
            <p className="text-lg md:text-center md:text-3xl lg:mb-3 lg:mt-5">
              Existing social media platforms have some serious problems
            </p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:items-center">
              <ul className="flex flex-col items-center gap-2 text-xl lg:items-start">
                <li className="w-full max-w-[80%] rounded-lg bg-rose-400 px-2 py-3 text-center leading-relaxed tracking-wider text-rose-950">
                  Fake users
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-rose-400 px-2 py-3 text-center leading-relaxed tracking-wider text-rose-950">
                  Toxic community
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-rose-400 px-2 py-3 text-center leading-relaxed tracking-wider text-rose-950">
                  Harmful distractions
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-rose-400 px-2 py-3 text-center leading-relaxed tracking-wider text-rose-950">
                  No control or censor
                </li>
              </ul>
              <p className="text-lg md:text-2xl">
                This has led to major psychological effects such as{" "}
                <span className="font-semibold text-rose-500">depression</span>,{" "}
                <span>addiction</span>, <span>intolerance</span> and even{" "}
                <span className="font-semibold text-rose-500">
                  criminal tendencies
                </span>
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-7 md:gap-10">
            <h2 className="text-4xl font-semibold tracking-tight md:text-center md:text-5xl">
              The Solution
            </h2>
            <div className="flex flex-col gap-2 md:items-center lg:flex-row-reverse lg:justify-between">
              <ul className="flex flex-col items-center gap-2 text-xl lg:flex-1 lg:items-start">
                <li className="w-full max-w-[80%] rounded-lg bg-emerald-400 px-2 py-3 text-center leading-relaxed tracking-wider text-emerald-950">
                  Authentic accounts
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-emerald-400 px-2 py-3 text-center leading-relaxed tracking-wider text-emerald-950">
                  Friendly community
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-emerald-400 px-2 py-3 text-center leading-relaxed tracking-wider text-emerald-950">
                  Productive interactions
                </li>
                <li className="w-full max-w-[80%] rounded-lg bg-emerald-400 px-2 py-3 text-center leading-relaxed tracking-wider text-emerald-950">
                  AI powered censoring
                </li>
              </ul>
              <p className="text-lg md:text-2xl lg:flex-1">
                This can help in{" "}
                <span className="font-semibold text-blue-500">
                  improved mental health
                </span>
                , <span>better screen time</span>,{" "}
                <span>reliable connections</span> and{" "}
                <span className="font-semibold text-blue-500">
                  a more helpful social space
                </span>
              </p>
            </div>
          </div>
        </section>
      </WidthWrapper>
    </main>
  );
}
