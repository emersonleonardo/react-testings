import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndCondition", () => {
  it("Deve renderizar com o texto correto e estado inicial", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Deve habilitar o botão quando o checkbox estiver marcado", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();

    await user.click(checkbox);
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
