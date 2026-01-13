import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "@".repeat(limit + 1);
  const textLimit = longText.substring(0, limit) + "...";
  const shortText = "Texto pequeno";

  it("Deve renderizar o texto inteiro com menos de 255 caracteres", () => {
    render(<ExpandableText text={shortText} />);

    const text = screen.getByText(shortText);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(shortText);
  });

  it("Deve renderizar o botão Show More quando o texto tiver mais de 255 caracteres", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(textLimit)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it("Deve renderizar o texto completo quando clicar no botão Show More e deve aparecer o botão Show Less", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("Deve cortar o texto quando o botão Show Less for clicado", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", {
      name: /more/i,
    });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", {
      name: /less/i,
    });
    await user.click(showLessButton);
    expect(screen.getByText(textLimit)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
