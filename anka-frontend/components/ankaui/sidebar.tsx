"use client";

import type React from "react";

import {
  Wallet,
  Users2,
  Menu,
  TrendingUp,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col p-2">
          <div className="flex items-center space-x-2 justify-center p-4 border-b border-dashed border-gray-200 dark:border-[#1F1F23]">
            <div className="w-8 h-8 bg-orange-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Anka.io</span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/clients" icon={Users2}>
                    Clientes
                  </NavItem>
                  <NavItem href="/assets" icon={Wallet}>
                    Ativos
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full p-4 bg-muted/40 rounded-lg border dark:border-zinc-800 flex flex-col items-center text-center space-y-3 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-600" />

            <div className="relative">
              <Image
                src="https://github.com/guirra-byte.png"
                alt="Minha foto"
                width={52}
                height={52}
                className="rounded-full border border-muted shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-orange-500 border-2 border-muted" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Matheus Guirra
              </p>
              <p className="text-xs text-muted-foreground">
                Dev backend | Node.js | TypeScript
              </p>
            </div>

            <div className="space-y-1">
              <a
                href="https://www.linkedin.com/in/matheus-guirra/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-4 h-4 mr-1" />
                linkedin.com/matheus-guirra
              </a>

              <a
                href="https://github.com/guirra-byte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4 mr-1" />
                github.com/guirra-byte
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground italic pt-px">
              Feito com 🧡
            </p>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
