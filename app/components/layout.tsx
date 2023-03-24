import * as React from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout({ title, children }: Props) {
  return (
    <div className="h-full">
      <header className="flex items-center justify-between bg-gray-100 p-4">
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <div>
          <nav>
            <ul className="flex">
              <li>
                <a href="/home" className="text-gray-600 hover:text-gray-800">
                  Back
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="flex items-center justify-between bg-gray-100 p-4">
        <div>
          <p className="text-sm text-gray-600">Last updated:</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Copyright © 2021</p>
        </div>
      </footer>
    </div>
  );
}
