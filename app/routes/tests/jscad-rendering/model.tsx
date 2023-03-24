import { colorize } from "@jscad/modeling/src/colors";
import { extrudeLinear } from "@jscad/modeling/src/operations/extrusions";
import { circle, cube, sphere, star } from "@jscad/modeling/src/primitives";

const getSimpleModel = () => {
  const models = [];

  // models.push(cube({ size: 12, center: [0, 0, 6] }));
  // models.push(colorize([1, 0, 0], sphere({ radius: 6 })));
  // models.push(extrudeLinear({ height: 10 }, circle({ radius: 10 })));
  models.push(
    extrudeLinear({ height: 10 }, star({ vertices: 8, outerRadius: 10 }))
  );
  return models;
};

export { getSimpleModel };
