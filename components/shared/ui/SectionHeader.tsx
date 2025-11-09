import Link from "next/link";

export default function SectionHeader({ title, linkTo }: { title: string, linkTo: string }) {
  return (
    <div className="flex items-center justify-between px-3">
      <h2 className="md:text-fs28 text-fs20 font-600 text-secondary">{title}</h2>
      <Link href={linkTo} className="md:text-fs20 text-fs18 font-600 text-primary">Показать все</Link>
    </div>
  );
}