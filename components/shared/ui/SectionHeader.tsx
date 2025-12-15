import Link from "next/link";

export default function SectionHeader({ title, linkTo }: { title: string, linkTo: string }) {
  return (
    <div className="flex items-center justify-between px-3">
      <h2 className="font-600 text-secondary text-[clamp(1.25rem,2.5vw+0.5rem,1.75rem)]">{title}</h2>
      <Link href={linkTo} className="font-600 text-primary text-[clamp(0.75rem,1.5vw+0.5rem,1rem)]">Показать все</Link>
    </div>
  );
}