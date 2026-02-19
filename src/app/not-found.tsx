import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <span className="text-[150px] font-bold text-gray-100 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-muted mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or doesn&apos;t exist anymore.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse Shop
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 max-w-xs mx-auto">
          <Link href="/shop" className="text-sm text-muted hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
