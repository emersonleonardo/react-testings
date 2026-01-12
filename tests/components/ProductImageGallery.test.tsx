import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("Não deve exibir o componente de imagem com o array vazio", () => {
    const result = render(<ProductImageGallery imageUrls={[]} />);

    expect(result.container).toBeEmptyDOMElement();
  });

  it("Não deve exibir o componente de imagem com o array vazio", () => {
    const imageUrls = ["/1.jpg", "/2.png", "/asd.png"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const gallery = screen.getAllByRole("img");
    expect(gallery).toHaveLength(3);
    imageUrls.forEach((url, index) => {
      expect(gallery[index]).toHaveAttribute("src", url);
    });
  });
});
