import React, { lazy } from "react";
import Layout from "~/components/layout";
import { getSimpleModel } from "./model";

const Renderer = lazy(() =>
  import("jscad-react").then((lib) => {
    return { default: lib.default.Renderer };
  })
);

let isHydrating = true;

export default function Index() {
  const [isHydrated, setIsHydrated] = React.useState(!isHydrating);

  React.useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  // Make sure is in client side
  if (isHydrated) {
    return (
      <Layout title="JSCad Rendering Test">
        <div>
          <Renderer solids={getSimpleModel()} height={800} width={800} />
        </div>
      </Layout>
    );
  } else {
    return <h1>loading</h1>;
  }
}
