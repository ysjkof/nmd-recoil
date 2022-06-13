import styled from "styled-components";
import { useForm } from "react-hook-form";
import { categoriesState, LOCAL_CATEGORY_STATE_KEY } from "../atoms";
import { useSetRecoilState } from "recoil";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr min-content;
  width: ${(props) => props.theme.widthSmall};
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
  category: string;
}

function CreateCategory() {
  const setCategoriesState = useSetRecoilState(categoriesState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ category }: IForm) => {
    setCategoriesState((oldCategories) => {
      const newCategories = [category, ...oldCategories];
      localStorage.setItem(
        LOCAL_CATEGORY_STATE_KEY,
        JSON.stringify(newCategories)
      );
      return newCategories;
    });
    setValue("category", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category")}
        type="text"
        placeholder="새로운 카테고리를 입력하세요"
      />
      <button>카테고리 만들기</button>
    </Form>
  );
}

export default CreateCategory;
