import { extrudeLinear } from "@jscad/modeling/src/operations/extrusions";
import { star } from "@jscad/modeling/src/primitives";
import { useControls } from "leva";
import React, { lazy, Suspense, useEffect } from "react";
import Layout from "~/components/layout";

// lazy load to reduce the loading time
const Renderer = lazy(() =>
  import("jscad-react").then((lib) => {
    return { default: lib.default.Renderer };
  })
);

let isHydrating = true;

export default function Index() {
  const [isHydrated, setIsHydrated] = React.useState(!isHydrating);

  // Leva configuration
  const { starVertex, starHeigh } = useControls({
    starVertex: {
      value: 6,
      min: 5,
      max: 10,
      step: 1,
    },
    starHeigh: {
      value: 10,
      max: 20,
      min: 3,
      step: 1,
    },
  });

  // create a star model based on the configuration
  const getStar = () => {
    const models = [];
    models.push(
      extrudeLinear(
        { height: starHeigh },
        star({
          vertices: starVertex,
          outerRadius: 10,
        })
      )
    );
    return models;
  };

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  // Make sure is in client side
  if (isHydrated) {
    return (
      <Layout title="JSCad Rendering Test">
        <Suspense fallback="loading">
          <Renderer solids={getStar()} height={800} width={800} />
        </Suspense>
      </Layout>
    );
  } else {
    return <h1>loading</h1>;
  }
}
