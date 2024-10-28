import { artworksMock } from "@/constants/artworksMock";
import { Artworks } from "@/modules/AllWorks/components/Artworks";
import { mount } from "cypress/react18";
import { BrowserRouter } from "react-router-dom";


describe("Artworks Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = cy.stub();
    cy.stub(require("react-router-dom"), "useNavigate").returns(mockNavigate);

    mount(
      <BrowserRouter>
        <Artworks />
      </BrowserRouter>
    );
  });

  it("should render the correct number of artworks", () => {
    cy.get("[data-cy^='artwork-card-']").should("have.length", artworksMock.length);
  });

  it("should render each artwork with correct image and title", () => {
    artworksMock.forEach((item, index) => {
      cy.get(`[data-cy='artwork-img-${index}']`).should("have.attr", "path", item.img);
      cy.get(`[data-cy='artwork-title-${index}']`).should("contain.text", item.title);
    });
  });
});
