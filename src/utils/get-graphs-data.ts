import { IComment } from "@/app/interfaces/comments";
import { DataItem } from "@/app/interfaces/report";

export const getGraphsData = (data: IComment[], categoryData: string): DataItem[] => {
    const filterCategoryData = data.filter(({category}) => categoryData.toLocaleLowerCase() === category.toLocaleLowerCase())
    
    const descriptionsLabel: string[] = [];
    const graphsData: DataItem[] = [];

    filterCategoryData.forEach(comment => {
      const isEmptyDescription = descriptionsLabel.filter(item => comment.description.toLocaleLowerCase() === item.toLocaleLowerCase())
        if (isEmptyDescription.length === 0) {
            descriptionsLabel.push(comment.description);
        }
    })

    descriptionsLabel.forEach(item => {
     const descriptionItem = filterCategoryData.filter(({ description }) => description.toLocaleLowerCase() === item.toLocaleLowerCase());
     const descriptionsSum = descriptionItem.reduce((prevItem, comment) => {
            return prevItem + comment.sum;
     }, 0);
        graphsData.push({ label: item, value: descriptionsSum });
    })
    
    return graphsData;
}