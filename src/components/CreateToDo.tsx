import styled from "styled-components";
import { useForm } from "react-hook-form";
import { categoryState, LOCAL_TO_DO_STATE_KEY, toDoListState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr min-content;
  width: ${(props) => props.theme.widthSmall};
  margin-bottom: 1rem;
  input {
    padding: 0.25rem 1rem;
    border-radius: 7px;
    border-color: transparent;
  }
  button {
    white-space: nowrap;
    margin-left: 10px;
    padding: 0.25rem 1rem;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 7px;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoListState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDoList) => {
      const newToDoList = [
        { id: Date.now(), category, text: toDo },
        ...oldToDoList,
      ];
      localStorage.setItem(LOCAL_TO_DO_STATE_KEY, JSON.stringify(newToDoList));
      return newToDoList;
    });
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo")}
        type="text"
        placeholder="할 일을 입력하세요"
      />
      <button>추가</button>
    </Form>
  );
}

export default CreateToDo;
