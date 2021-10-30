import styled from "styled-components";

export const List = styled.ul`
  list-style-type: decimal;
`;

export const ListElement = styled.li`
  position: relative;
  padding: 5px;
  list-style-type: none;
  counter-increment: list;
  font-weight: 600;

  &::before {
    content: counter(list) ".";
    position: absolute;
    left: -2rem;
    width: 1rem;
    text-align: left;
    color: ${({ theme }) => theme.gray};
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.gray};
  margin-left: 1em;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
