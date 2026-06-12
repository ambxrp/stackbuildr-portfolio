import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-5xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}