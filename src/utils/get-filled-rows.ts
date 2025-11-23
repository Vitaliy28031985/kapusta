import { IComment } from "@/app/interfaces/comments";

export const getFilledRows = (data: IComment[], minRows = 6) => {
  const emptyRowsCount = Math.max(minRows - data.length, 0);

  const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => ({
    _id: `empty-${index}`,
    date: "",
    description: "",
    category: "",
    sum: "",
    isShow: false,
    isDelete: false,
    isEmpty: true,
  }));

  return [...data, ...emptyRows];
};
