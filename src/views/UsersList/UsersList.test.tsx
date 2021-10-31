import { act, render, waitFor, screen } from "@testing-library/react";
import axios from "axios";

import { UsersList } from "./UsersList";

import { mockedUsers } from "src/utils/mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UsersList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders list correctly", async () => {
    await act(async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: mockedUsers })
      );
      render(<UsersList />);
    });

    await waitFor(() => {
      const name = screen.getByText("Leanne Graham");
      const username = screen.getByText("@Bret");
      const title = screen.getByText("Users list");

      expect(name).toBeInTheDocument();
      expect(username).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(mockedAxios.get).toBeCalledTimes(1);
    });
  });

  it("renders list with error", async () => {
    await act(async () => {
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error()));
      render(<UsersList />);
    });

    await waitFor(() => {
      const errorMessage = screen.getByText("Something went wrong...");

      expect(errorMessage).toBeInTheDocument();
      expect(mockedAxios.get).toBeCalledTimes(1);
    });
  });
});
