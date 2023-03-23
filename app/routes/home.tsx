import { Form, Link } from '@remix-run/react'
import React from 'react'

export default function Home() {
  return (
    <div><h1>home</h1>

      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
      <Link
        to="/notes"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        View Notes
      </Link>
    </div>


  )
}
