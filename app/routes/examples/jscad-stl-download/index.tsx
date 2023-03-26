import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { cube } from "@jscad/modeling/src/primitives";
import Layout from "~/components/layout";
const STLserializer = require("@jscad/stl-serializer");
const saveAs = require("file-saver");

export default function JSCadSTLDownload() {
  const saveSTL = (filename: string, geometries: Geom3[]) => {
    const rawData = STLserializer.serialize({ binary: true }, geometries);
    const blob = new Blob(rawData);
    saveAs(blob, filename + "stl");
  };
  return (
    <Layout title="stl download">
      <div>Click the button to download the stl file</div>
      <button
        onClick={() => {
          saveSTL("test", [cube({ size: 10 })]);
        }}
      >
        Download
      </button>
    </Layout>
  );
}
