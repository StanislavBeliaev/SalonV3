import Link from "next/link";

export default function SectionHeader({ title, linkTo }: { title: string, linkTo: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-secondary">{title}</h2>
      <Link href={linkTo} className="text-xl font-bold text-primary">Показать все</Link>
    </div>
  );
}