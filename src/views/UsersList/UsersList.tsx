import { useEffect, useState } from "react";

import { api } from "src/api";

import { User } from "src/types/user.types";

import {
  List,
  ListElement,
  Title,
  Username,
  Wrapper,
} from "./UsersList.styles";

import { SearchBar } from "./components/SearchBar";

export const UsersList = () => {
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<Array<Partial<User>>>([]);
  const [filteredUsers, setFilterdUsers] = useState<Array<Partial<User>>>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.getUsers();

        const filteredData = data.map(({ id, name, username }) => ({
          id,
          name,
          username,
        }));

        setUsers(filteredData);
        setFilterdUsers(filteredData);
      } catch (err) {
        const castedError = err as Error;
        setError(`Error! ${castedError.message}.`);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(({ name }) =>
      name?.toLowerCase().includes(query.toLowerCase())
    );

    setFilterdUsers(filteredResults);
  }, [query, users]);

  return (
    <Wrapper>
      <Title>Users list</Title>
      <SearchBar setQuery={setQuery} />
      {error ? (
        error
      ) : (
        <List>
          {filteredUsers.map(({ id, name, username }) => (
            <ListElement key={id}>
              {name}
              <Username>{`@${username}`}</Username>
            </ListElement>
          ))}
        </List>
      )}
    </Wrapper>
  );
};
