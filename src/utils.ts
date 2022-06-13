import { EnumCategories, TypeCategories } from "./atoms";

export function transKor(category: TypeCategories) {
  switch (category) {
    case EnumCategories.DOING:
      return "하는중";
    case EnumCategories.DONE:
      return "완료";
    case EnumCategories.TO_DO:
      return "할 일";
    default:
      return category;
  }
}
