import { Dispatch, SetStateAction, ChangeEvent, useMemo } from "react";

import { debounce } from "src/utils/helpers";

import { Input } from "./SearchBar.styles";

interface SearchBarProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ setQuery }: SearchBarProps) => {
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
      type="text"
      onChange={debouncedHandleQueryChange}
      placeholder="Search by user name..."
    />
  );
};
