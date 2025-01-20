import Pixelmatch from "pixelmatch";
const PNG = require(`pngjs`).PNG;

// Tel Aviv coordinates
const latitude = 32.0853;
const longitude = 34.7818;

Cypress.Commands.add("getMap", () => {
  return cy.get("canvas");
});

Cypress.Commands.add("zoomToTLV", () => {
  cy.window().then((win) => {
    const Cesium = win.Cesium;
    const viewer = win.viewer;
    const scene = viewer.scene;
    const camera = scene.camera;

    // Fly the camera to Tel Aviv
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      duration: 2, // Fly duration in seconds
    });

    // Wait for the camera to reach the destination
    cy.wait(10000);

    camera.zoomIn(1000);
  });
});

Cypress.Commands.add("pinInTLV", () => {
  cy.window().then((win) => {
    const Cesium = win.Cesium;
    const viewer = win.viewer;
    const scene = viewer.scene;

    const cartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude);

    const screenPosition = Cesium.SceneTransforms.worldToWindowCoordinates(
      scene,
      cartesian
    );

    debugger
    if (screenPosition) {
      const { x, y } = screenPosition;
      cy.getMap().click(x, y);
      cy.wait(5000);
    }
  });
});

Cypress.Commands.add("shortenedCoordinate", (coordinate) => {
  return {
    latitude: parseFloat(coordinate.latitude.toFixed(2)),
    longitude: parseFloat(coordinate.longitude.toFixed(2)),
    // altitude: parseFloat(coordinate.altitude.toFixed(2)),
  };
});

Cypress.Commands.add(`getPixelDiff`, (baseImg, editedImg) => {
  const img1 = PNG.sync.read(Buffer.from(baseImg, "base64"));
  const img2 = PNG.sync.read(Buffer.from(editedImg, "base64"));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = Pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.005 }
  );
  debugger;
  const diffPercent = (numDiffPixels / (width * height)) * 100;

  return diffPercent;
});
