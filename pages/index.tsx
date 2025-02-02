import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/product">
        <div className="">This is Next App</div>
      </Link>
    </div>
  );
}
