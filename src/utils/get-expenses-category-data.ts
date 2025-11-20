import { IComment } from "@/app/interfaces/comments";
import { category as categoryExpenses } from "@/db/categoryExpenses";
import { category as categoryIncomes } from "@/db/categoryIncome";

interface ICategory {
    id: number;
    name: string;
    icon: string;
    sum: number;
}


export const getExpensesCategoryData = (nameComments: string, comments?: IComment[], ): ICategory[] => {
    const category = nameComments === 'expenses' ? categoryExpenses : categoryIncomes;
    if (!comments) return [];

    const categoryList: string[] = [];
    const newCategoryList: ICategory[] = [];

    comments.forEach((comment) => {
        const isCategory = categoryList.filter(item => item === comment.category);
        if (isCategory.length === 0) {
            categoryList.push(comment.category);
        }
    });

    categoryList.forEach(item => {
        const commentItem = comments.filter(({ category }) => category === item);
        const commentsSum = commentItem.reduce((prevItem, comment) => {
            return prevItem + comment.sum;
        }, 0);

        const currentCategory = category.filter(({ name }) => name === item);

        newCategoryList.push({
            id: currentCategory[0].id,
            name: currentCategory[0].name,
            icon: currentCategory[0].icon,
            sum: commentsSum
        });
    });

    return newCategoryList;
};
