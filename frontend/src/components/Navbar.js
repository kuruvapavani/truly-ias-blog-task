"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const navLinks = [
    ...(isLoggedIn
      ? [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "Logout", href: "/", action: () => logout() },
        ]
      : [{ name: "Login", href: "/login" }]),
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; 
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="sticky top-0 z-50 px-4 py-3 flex justify-between items-center border-b backdrop-blur-md
                 bg-white/80 dark:bg-neutral-900/70 dark:border-neutral-700 shadow-sm transition-all"
    >
      <Link
        href="/"
        className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 hover:opacity-90 transition duration-300"
      >
        MyBlog
      </Link>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 dark:text-gray-200 hover:scale-110 transition"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.div>
        </button>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        {navLinks.map(({ name, href, action }) => (
          <Link
            key={name}
            href={href}
            onClick={action}
            className={`transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
              pathname === href
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-900 backdrop-blur-xl shadow-xl md:hidden flex flex-col px-6 py-5 space-y-4 text-center z-40"
          >
            {navLinks.map(({ name, href, action }) => (
              <Link
                key={name}
                href={href}
                onClick={() => {
                  setIsOpen(false);
                  if (action) action();
                }}
                className={`block text-lg transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === href
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
