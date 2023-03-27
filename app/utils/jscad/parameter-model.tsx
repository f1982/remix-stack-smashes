import { cuboid, roundedCuboid } from "@jscad/modeling/src/primitives";
import { subtract } from "@jscad/modeling/src/operations/booleans";

// const getParameterDefinitions = () => {
//   return [
//     {name: 'outerWidth', caption: 'Outer width of box:', type: 'float', initial: 120},
//     {name: 'outerDepth', caption: 'Outer depth of box:', type: 'float', initial: 100},
//     {name: 'outerHeight', caption: 'Outer height of box:', type: 'float', initial: 50},
//     {name: 'wallThickness', caption: 'Wall Thickness:', type: 'float', initial: 2},
//     {name: 'cornerRadius', caption: 'Inside Corner Radius:', type: 'float', initial: 5},
//    ];
// }
const getParameterDefinitions = {
  outerWidth: 20,
  outerDepth: 10,
  outerHeight: 5,
  wallThickness: 1,
  cornerRadius: 2,
};

const main = (params: any) => {
  return [subtract(outerBox(params), innerBox(params))];
};

const outerBox = (params: any) => {
  console.log("params", params);
  console.log([0, 0, params.outerHeight / 2]);
  return cuboid({
    size: [params.outerWidth, params.outerDepth, params.outerHeight],
    center: [0, 0, params.outerHeight / 2],
  });
};

const innerBox = (params: any) => {
  const size: [number, number, number] = [
    params.outerWidth - 2 * params.wallThickness,
    params.outerDepth - 2 * params.wallThickness,
    params.outerHeight + 2 * params.cornerRadius,
  ];
  const center: [number, number, number] = [
    0,
    0,
    size[2] / 2 + params.wallThickness,
  ];

  return roundedCuboid({
    size,
    center,
    roundRadius: params.cornerRadius,
    segments: 32,
  });
};

export { main, getParameterDefinitions };
