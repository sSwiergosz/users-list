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
  const [error, setError] = useState<unknown | null>(null);
  const [users, setUsers] = useState<Array<Partial<User>>>([]);
  const [filteredUsers, setFilterdUsers] = useState<Array<Partial<User>>>([]);
  const [query, setQuery] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

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
        setIsPending(false);
      } catch (err) {
        setError(err);
        setIsPending(false);
      }
    }

    setIsPending(true);
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
      <SearchBar query={query} setQuery={setQuery} />

      {isPending && <p>Loading ...</p>}

      {error && <p>Something went wrong...</p>}

      <List>
        {filteredUsers.map(({ id, name, username }) => (
          <ListElement key={id}>
            {name}
            <Username>{`@${username}`}</Username>
          </ListElement>
        ))}
      </List>
    </Wrapper>
  );
};
