import * as React from "react";
import { useUser } from "~/utils";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({ title, description, children }: Props) {
  const user = useUser();

  return (
    <div className="h-full">
      <header className="flex items-center justify-between bg-gray-100 p-4">
        {!!title && <h1 className="text-lg font-bold">{title} </h1>}
        <nav>
          <ul className="flex">
            <li>
              <a href="/home" className="text-gray-600 hover:text-gray-800">
                Back
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 p-8">
        {!!description && <div>{description}</div>}
        <div>{children}</div>
      </main>
      <footer className="flex items-center justify-between bg-gray-100 p-4">
        <div>
          <p className="text-sm text-gray-600">
            <span>({user.email})</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Copyright © 2021</p>
        </div>
      </footer>
    </div>
  );
}
