import React from "react";
import styled from "styled-components";

export const FullButton=({ title, action, border })=> {
  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : " #4D4084")};
  background-color: ${(props) => (props.border ? "transparent" : " #4D4084")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#707070" : "#fff")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#580cd2")};
    border: 1px solid  #4D4084;
    color: ${(props) => (props.border ? " #4D4084" : "#fff")};
  }
`;

