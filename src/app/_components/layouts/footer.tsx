// src/app/_components/footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 bg-primary">
      <div className="container flex h-14 items-center justify-center">
        <span className="text-sm font-bold text-white">© 2025-{new Date().getFullYear()} pengineer</span>
      </div>
    </footer>
  );
}
