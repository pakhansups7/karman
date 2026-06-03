import { categories } from "../constants/categories";
import type { Category } from "../types/categories";

type CategoryFilterProps = {
    selectedCategory: Category | 'all';
    onChangeCategory: (value: Category | 'all') => void;
};

export function CategoryFilter({ selectedCategory, onChangeCategory }: CategoryFilterProps) {
    return (

        <select
            className="category-filter"
            value={selectedCategory}
            onChange={(event) => onChangeCategory(event.target.value as Category | 'all')}
        >
            <option value="all">All</option>
            {categories.map((category) => (
                <option key={category.value} value={category.value}>
                    {category.label}
                </option>
            ))}

        </select>
    );
}