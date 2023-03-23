import * as React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout({title, children}:Props) {
  return (
    <div className="h-full">
      <header>
        <nav>
          <ul>
            <li>
              <a href="/home">Back</a>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <h1>{title}</h1>
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div>copyright</div>
    </div>
  );
}
