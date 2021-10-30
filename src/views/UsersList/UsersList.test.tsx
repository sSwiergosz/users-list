import { act, cleanup, render, waitFor, screen } from "@testing-library/react";
import axios from "axios";

import { UsersList } from "./UsersList";

import { mockedUsers } from "src/utils/mocks";

beforeEach(() => {
  (axios.get as jest.Mock) = jest.fn(() =>
    Promise.resolve({ data: mockedUsers })
  );
});

afterEach(cleanup);

describe("UsersList", () => {
  it("renders list correctly", async () => {
    act(() => {
      render(<UsersList />);
    });

    await waitFor(() => {
      const name = screen.getByText("Leanne Graham");
      const username = screen.getByText("@Bret");
      const title = screen.getByText("Users list");

      expect(name).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });
});
