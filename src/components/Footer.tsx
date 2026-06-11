export function Footer() {
  return (
    <footer className="relative z-10 border-t border-cream/10 bg-midnight py-8 text-cream/45">
      <div className="site-container flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-base font-medium text-cream/75">Harry Lal</p>
        <p className="text-sm">Senior Research Engineer · AI & Robotics</p>
        <p className="font-mono text-[11px]">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
