import Link from "next/link";

export default function SectionHeader({ title, linkTo }: { title: string, linkTo: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="md:text-fs28 text-fs20 font-bold text-secondary">{title}</h2>
      <Link href={linkTo} className="md:text-fs20 text-fs18 font-bold text-primary">Показать все</Link>
    </div>
  );
}