import React, { lazy } from "react";
import Layout from "~/components/layout";
import { getParameterDefinitions, main } from "./parameter-model";

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

  function download(filename: string, text: string) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // Make sure is in client side
  if (isHydrated) {
    return (
      <Layout title="JSCad Rendering Test">
        <div>
          {/* <Renderer solids={getSimpleModel()} height={800} width={800} /> */}
          <Renderer
            solids={main(getParameterDefinitions)}
            height={800}
            width={800}
          />
        </div>
      </Layout>
    );
  } else {
    return <h1>loading</h1>;
  }
}
