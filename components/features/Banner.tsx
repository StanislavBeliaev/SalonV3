import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full">
      <Image src="/partners-banner.png" alt="Banner" width={1440} height={240} className="w-full object-cover" />
    </div>
  );
}