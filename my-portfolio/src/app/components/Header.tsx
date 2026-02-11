import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black">
        <h1 className="text-xl font-bold text-black dark:text-zinc-50">
            My Portfolio
        </h1>
        <nav className="flex gap-4"> 
            <Link href="/" className="text-black dark:text-zinc-50 hover:underline">
                Home
            </Link>
            <Link href="/about" className="text-black dark:text-zinc-50 hover:underline">
                About
            </Link>
            <Link href="/projects" className="text-black dark:text-zinc-50 hover:underline">
                Projects
            </Link>
            <Link href="/contact" className="text-black dark:text-zinc-50 hover:underline">
                Contact
            </Link>
        </nav>
    </header>
  );
}