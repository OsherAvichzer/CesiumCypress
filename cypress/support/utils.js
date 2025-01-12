export const entitysCoordinate = (Cesium, viewer, index) => {
  debugger;
  const cartographic = Cesium.Cartographic.fromCartesian(
    viewer.entities.values[index].position._value
  );
  const longitude = Cesium.Math.toDegrees(cartographic.longitude);
  const latitude = Cesium.Math.toDegrees(cartographic.latitude);
  // const altitude = cartographic.height;

  return { longitude, latitude };
};

