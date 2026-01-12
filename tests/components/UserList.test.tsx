import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("Deve renderizar no users quando o array estiver vazio", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("Deve renderizar uma lista de usuários", () => {
    const userList: User[] = [
      {
        id: 123,
        name: "Leonardo",
      },
      {
        id: 321,
        name: "Lima",
      },
    ];
    render(<UserList users={userList} />);

    userList.forEach((user) => {
      const link = screen.getByRole("link", {
        name: user.name,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
