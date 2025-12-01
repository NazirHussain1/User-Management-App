import "./globals.css";

export const metadata = {
  title: "User Management App",
  description: "Manage users with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">User Management</h1>
        </header>

        {/* Main content */}
        <main className="p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-200 text-gray-700 p-4 text-center mt-10">
          &copy; 2025 MyApp. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
