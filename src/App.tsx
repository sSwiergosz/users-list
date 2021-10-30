import { AppWrapper, GlobalStyle } from "./App.styles";

import { UsersList } from "src/views/UsersList";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <UsersList />
      </AppWrapper>
    </>
  );
}

export default App;
