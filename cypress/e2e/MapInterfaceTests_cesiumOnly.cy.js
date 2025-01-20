import { entitysCoordinate } from "../support/utils";

let Cesium;
let viewer;
let camera;

describe("map interface", () => {
  beforeEach("Pin by coordinate", () => {
    // Visit the page
    cy.visit(
      "https://sandcastle.cesium.com/standalone.html#c=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"
    );

    cy.window().then((win) => {
      Cesium = win.Cesium;
      viewer = win.viewer;
      const scene = viewer.scene;
      camera = scene.camera;
    });

    cy.zoomToTLV();
    cy.pinInTLV();
  });

  it("logs entity's properties", () => {
    debugger;
    cy.log(`entity's id- ${viewer.entities.values[0].id}`);

    cy.log(`entity's lable- ${viewer.entities.values[0].label.text._value}`);

    cy.log(`entity's coordinates- ${entitysCoordinate(Cesium, viewer, 0)}`);

    //cy.log(`pinned coordinates- ${lon}, ${lat}, ${alt}`);
  });

  it("checks if the right coordinate was created", () => {
    const entity = shortenedCoordinate(entitysCoordinate(Cesium, viewer, 0));

    const pinned = shortenedCoordinate({ longitude, latitude });
    debugger;
    const isEqual = entity === pinned;
    cy.log(isEqual);
  });

  it("checks if the right coordinate was created", () => {
    cy.shortenedCoordinate(entitysCoordinate(Cesium, viewer, 0)).then(
      (entity) => {
        cy.shortenedCoordinate({ longitude, latitude }).should(
          "deep.equal",
          entity
        );
      }
    );
  });

  it("zoom in", () => {
    const initialZoom = camera.positionCartographic.height;
    camera.zoomIn(100000);

    const currentZoom = camera.positionCartographic.height;

    expect(currentZoom).to.be.lessThan(initialZoom);
  });

  it("zoom out", () => {
    const initialZoom = camera.positionCartographic.height;
    camera.zoomOut(100000);

    const currentZoom = camera.positionCartographic.height;

    expect(currentZoom).to.be.greaterThan(initialZoom);
  });
});
