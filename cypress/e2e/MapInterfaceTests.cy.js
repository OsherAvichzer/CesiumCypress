import { point } from "@turf/turf";

describe("tests for", () => {
  beforeEach("open cesium geo map", () => {
    cy.visit(
      "https://sandcastle.cesium.com/standalone.html#c=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"
    );
    cy.get("canvas").should("be.visible");
  });
  it("pin on map by geo", () => {
    cy.window().then((win) => {
      const viewer = win.viewer;

      const lon = -75.59777;
      const lat = 40.03883;
      const alt = 1000; // Altitude in meters

      const point1 = point([lon, lat, alt]);
      const [longitude, latitude, altitude] = point1.geometry.coordinates;

      const fromDegreesToCartesian = (lon, lat, alt = 0) => {
        const EARTH_RADIUS = 6378137;
        const lambda = (lon * Math.PI) / 180;
        const phi = (lat * Math.PI) / 180;

        const x = (EARTH_RADIUS + alt) * Math.cos(phi) * Math.cos(lambda);
        const y = (EARTH_RADIUS + alt) * Math.cos(phi) * Math.sin(lambda);
        const z = (EARTH_RADIUS + alt) * Math.sin(phi);

        return { x, y, z };
      };
      //   const cartesian = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
      const cartesian = fromDegreesToCartesian(lon, lat, alt);

      //   const scene = viewer.scene;
      //   const canvas = scene.canvas;
      const screenPosition =
        win.viewer.camera.worldToCameraCoordinates(cartesian);
      debugger;

      if (cartesian) {
        const { x, y } = cartesian;

        // cy.get("#cesiumContainer canvas").trigger("click", {
        //   clientX: x,
        //   clientY: y,
        // });
        cy.get("#cesiumContainer canvas").click(x, y);
      }
    });
  });
});
