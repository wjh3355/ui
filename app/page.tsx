import Hero from "@/app/_section/hero";
import Cards from "@/app/_section/cards";
import TrustedBy from "@/app/_section/trusted-by";

export default function Home() {
  return (
    <div className="max-w-10xl  px-6 md:px-16  mx-auto flex flex-col min-h-svh py-8 gap-8">
      <Hero />
      <Cards className="mt-4" />
      <TrustedBy className="mt-8" />
    </div>
  );
}
