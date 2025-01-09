export const cartesianToCoordinates = (cartesian) => {
  return Cesium.Cartographic.fromCartesian(cartesian);
};
