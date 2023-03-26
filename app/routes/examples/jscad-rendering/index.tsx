import React, { lazy, Suspense } from "react";
import Layout from "~/components/layout";
import { getSimpleModel } from "./model";

// lazy load to reduce the loading time
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

  const renderLoader = () => <div>loading...</div>;

  // Make sure is in client side
  if (isHydrated) {
    return (
      <Layout title="JSCad Rendering Test">
        {/* https://web.dev/code-splitting-suspense/ */}
        <Suspense fallback={renderLoader()}>
          <Renderer solids={getSimpleModel()} height={800} width={800} />
        </Suspense>
      </Layout>
    );
  } else {
    return <h1>loading</h1>;
  }
}
