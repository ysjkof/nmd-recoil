import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  categoriesSelector,
  IToDo,
  LOCAL_TO_DO_STATE_KEY,
  toDoListState,
} from "../atoms";
import { transKor } from "../utils";

const Li = styled.li`
  display: grid;
  grid-template-columns: 1fr repeat(4, min-content);
  align-items: center;
  margin: 6px 0;
  span {
  }
  button {
    white-space: nowrap;
    margin-left: 10px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 7px;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesSelector);
  const setToDos = useSetRecoilState(toDoListState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      let newState = [];
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      if (name === "Delete") {
        newState = oldToDos.filter(
          (toDo) => toDo.id !== oldToDos[targetIndex].id
        );
      } else {
        const newToDo = { text, id, category: name as IToDo["category"] };
        newState = [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      localStorage.setItem(LOCAL_TO_DO_STATE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <Li>
      <span>{text}</span>
      {categories.map((category) => (
        <button name={category} onClick={onClick}>
          {transKor(category)}
        </button>
      ))}
      <button name="Delete" onClick={onClick}>
        삭제
      </button>
    </Li>
  );
}

export default ToDo;
