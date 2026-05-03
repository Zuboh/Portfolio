import Link from "next/link";

export const ButtonAllProjects = () => {
  return (
    <div className="mt-3 text-center">
      <Link
        href="/works"
        className="inline-flex items-center gap-1.5 text-xs text-tx3 tracking-[.05em] no-underline border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
      >
        View all projects ↗
      </Link>
    </div>
  );
};
