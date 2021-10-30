import { fireEvent, render, waitFor, screen } from "@testing-library/react";

import { SearchBar } from "./SearchBar";

describe("<SearchBar />", () => {
  it("input has correct value and changes value correctly", async () => {
    const onChange = jest.fn();

    const { rerender } = render(
      <SearchBar query="Leanne" setQuery={onChange} />
    );

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    expect(input.value).toBe("Leanne");

    fireEvent.change(input, { target: { value: "John" } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);

      rerender(<SearchBar query="John" setQuery={onChange} />);
      expect(input.value).toBe("John");
    });
  });
});
