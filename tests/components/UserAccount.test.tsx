import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("Deve renderizar o nome do usuário", () => {
    const userTest: User = {
      id: 123,
      name: "Leonardo",
    };
    render(<UserAccount user={userTest} />);

    const text = screen.getByText(userTest.name);

    expect(text).toBeInTheDocument();
  });

  it("Deve renderizar o botão de Edit sendo admin", () => {
    const userTest: User = {
      id: 123,
      name: "Leonardo",
      isAdmin: true,
    };
    render(<UserAccount user={userTest} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Edit/i);
  });

  it("Não deve renderizar o botão de Edit pois o usuário não é admin", () => {
    const userTest: User = {
      id: 123,
      name: "Leonardo",
      isAdmin: false,
    };
    render(<UserAccount user={userTest} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
