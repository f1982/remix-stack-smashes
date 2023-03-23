import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import getAnimal from '../../models/openai.server';

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error(error);
//   return (
//     <div>
//       <div>Find a error</div>
//       <h1>{error.message}</h1>
//     </div>
//   );
// }

export const loader = async ({ request }: LoaderArgs) => {
  console.log('request', request);
  const userId = await requireUserId(request);
  console.log('userId', userId);

  return json({
    data: await getAnimal('whale'),
    // data: await getAnimal(null),
  });
};

export default function Posts() {
  const { data } = useLoaderData();
  return (
    <main className="mx-auto max-w-4xl">
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  );
}