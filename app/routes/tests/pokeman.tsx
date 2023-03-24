import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Layout from "~/components/layout";

export async function getPokemons() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  ).then((res) => res.json());

  return res.results;
}

export async function getPokemon(name: string | undefined) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
    (res) => res.json()
  );

  return {
    name: name,
    img: res.sprites.front_default,
  };
}


type LoaderData = {
  data: Awaited<ReturnType<typeof getPokemons>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getPokemons(),
  });
};

export default function Posts() {
  const { data } = useLoaderData() as LoaderData;
  return (
    <Layout title="Pokeman">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Which Pokémon do you want to catch?</h1>
      <ul className='mx-auto text-center'>
        {data.map((pokemon: { name: string }) => (
          <li key={pokemon.name}>
            <Link
              to={pokemon.name}
              className="text-blue-600 underline"
            >
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}