export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
      <div className="container mx-auto px-4 max-w-5xl text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} CSY. All rights reserved.</p>
      </div>
    </footer>
  );
}
