import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import Layout from "~/components/layout";
import getAnimal from "../../models/openai.server";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const petType = body.get("pet");
  console.log("petType", petType);

  const errors: { message: string } = { message: "" };

  if (!petType) {
    errors.message = "pet must not empty";
  }

  if (errors.message) {
    return json(errors, { status: 422 });
  }

  return json({
    data: await getAnimal(petType),
  });
}

export default function Posts() {
  const data = useActionData<typeof action>();
  console.log('data', data);

  let transition = useTransition();

  return (
    <Layout title="Open AI Test">
      <Form method="post">
        <label>
          Type of you pet
          <input
            type="text"
            name="pet"
            className="w-full rounded-md border-2 border-gray-300 p-2"
            placeholder="Enter your pet type"
          />
        </label>
        <button type="submit"> Submit</button>
      </Form>
      <div>{transition.state === "submitting" && "Waiting..."}</div>
      <div>{data?.data ? data.data : ""}</div>
    </Layout>
  );
}
