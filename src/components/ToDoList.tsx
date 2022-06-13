import styled from "styled-components";
import {
  EnumCategories,
  categoryState,
  toDoSelector,
  categoriesState,
} from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { transKor } from "../utils";
import CreateCategory from "./CreateCategory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  ul {
    width: ${(props) => props.theme.widthSmall};
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => props.theme.widthSmall};
  justify-content: space-between;
  margin-bottom: 1rem;
  > :first-child {
    margin-right: 10px;
    width: 4rem;
  }
`;

const Title = styled.h1`
  border-bottom: 2px solid white;
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
  margin-bottom: 24px;
`;

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <Container>
      <Title>{transKor(EnumCategories.TO_DO)}</Title>
      <h2>카테고리</h2>
      <CategoryContainer>
        <select value={category} onInput={onInput}>
          {Object.values(categories).map((value, i) => (
            <option key={i} value={value}>
              {transKor(value)}
            </option>
          ))}
        </select>
        <CreateCategory />
      </CategoryContainer>
      <CreateToDo />
      <ul>
        {toDos.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            category={todo.category}
            text={todo.text}
          />
        ))}
      </ul>
    </Container>
  );
}

export default ToDoList;
