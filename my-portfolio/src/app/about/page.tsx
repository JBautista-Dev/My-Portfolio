import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            Hello! I&apos;m Joshua
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Welcome to my portfolio! I am a passionate developer with experience
            in building web applications using modern technologies. I enjoy
            creating user-friendly and visually appealing websites that provide
            a great user experience. Feel free to explore my projects and get in
            touch if you have any questions or opportunities!
          </p>
        </div>
        <div className="shrink-0">
          <Image
            className="rounded-2xl object-cover"
            src="/assets/wall.jpg"
            alt="About Joshua"
            width={400}
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
