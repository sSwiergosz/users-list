import { Dispatch, SetStateAction, ChangeEvent, useMemo } from "react";

import { debounce } from "src/utils/helpers";

import { Input } from "./SearchBar.styles";

interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  const debouncedHandleQueryChange = useMemo(
    () =>
      debounce(
        (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
        250
      ),
    [setQuery]
  );

  return (
    <Input
      data-testid="search-input"
      type="text"
      onChange={debouncedHandleQueryChange}
      placeholder="Search by user name..."
      value={query}
    />
  );
};
