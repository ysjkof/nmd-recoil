import { atom, selector } from "recoil";

export enum EnumCategories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export type TypeCategories = string | EnumCategories;

export interface IToDo {
  text: string;
  id: number;
  category: TypeCategories;
}

export const LOCAL_TO_DO_STATE_KEY = "toDoList";
export const LOCAL_CATEGORY_STATE_KEY = "toDoCategories";
const localToDoState = localStorage.getItem(LOCAL_TO_DO_STATE_KEY);
const localCategoriesState = localStorage.getItem(LOCAL_CATEGORY_STATE_KEY);
// 선택된 카테고리를 기억
export const categoryState = atom<TypeCategories>({
  key: "category",
  default: EnumCategories.TO_DO,
});

export const categoriesState = atom<TypeCategories[]>({
  key: "categories",
  default: localCategoriesState
    ? JSON.parse(localCategoriesState)
    : Object.values(EnumCategories),
});

// to do 목록을 기억
export const toDoListState = atom<IToDo[]>({
  key: "toDo",
  default: localToDoState ? JSON.parse(localToDoState) : [],
});

// selector는 atom의 state 원본을 변형하지 않고 원본을 토대로 가공한 데이터를 사용하기 위한 목적
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoListState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

// 선택하지 않은 카테고리 목록 반환
export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: ({ get }) => {
    const category = get(categoryState);
    const categories = get(categoriesState);
    return categories.filter((categories) => categories !== category);
  },
});
