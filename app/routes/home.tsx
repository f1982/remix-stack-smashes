import { Form, Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import React from "react";
const fs = require("fs");

export async function loader({ request }: LoaderArgs) {
  return fs
    .readdirSync("./app/routes/examples")
    .map((file: string) => `/examples/${file.split('.')[0]}`);
}

export default function Home() {
  const examples = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
        <h1 className="p-2">This is the homepage of my Remix experiments</h1>
      </div>
      <div>
        {examples.map((link: string) => {
          return (
            <Link
              key={link}
              to={link}
              className="flex items-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              go: {link}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
