import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndCondition", () => {
  const renderComponents = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
      buttonSubmit: screen.getByRole("button", {
        name: /submit/i,
      }),
    };
  };
  it("Deve renderizar com o texto correto e estado inicial", () => {
    const { heading, checkbox, buttonSubmit } = renderComponents();

    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(buttonSubmit).toBeDisabled();
  });

  it("Deve habilitar o botão quando o checkbox estiver marcado", async () => {
    const { checkbox, button } = renderComponents();

    const user = userEvent.setup();
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });
});
