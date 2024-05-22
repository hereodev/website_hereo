"use client";

import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function CategoriesSelect(
    { categories, selectedCategories, setSelectedCategories } :
    { categories: string[], selectedCategories: string, setSelectedCategories: (categories: string) => void }
) {

    const categoriesData = [
    {
              "id": 1,
              "name": "AFK",
              "category_name": "REALMS"
            },
            {
              "id": 2,
              "name": "ORAL",
              "category_name": "REALMS"
            },
            {
              "id": 3,
              "name": "INVISIBLE",
              "category_name": "REALMS"
            },
            {
              "id": 4,
              "name": "SONIC",
              "category_name": "REALMS"
            },
            {
              "id": 5,
              "name": "RITUALIZED",
              "category_name": "LOCALITIES"
            },
            {
              "id": 6,
              "name": "HETEROTOPIC",
              "category_name": "LOCALITIES"
            },
            {
              "id": 7,
              "name": "NON-PLACES",
              "category_name": "LOCALITIES"
            },
            {
              "id": 8,
              "name": "INTIMATE",
              "category_name": "LOCALITIES"
            },
            {
              "id": 9,
              "name": "SHIFTS",
              "category_name": "SCALES"
            },
            {
              "id": 10,
              "name": "BODY",
              "category_name": "SCALES"
            },
            {
              "id": 11,
              "name": "LAND",
              "category_name": "SCALES"
            },
            {
              "id": 12,
              "name": "PUBLIC",
              "category_name": "SCALES"
            },
            {
              "id": 13,
              "name": "RADICAL",
              "category_name": "STRATEGIES"
            },
            {
              "id": 14,
              "name": "NARRATIVE",
              "category_name": "STRATEGIES"
            },
            {
              "id": 15,
              "name": "IMPROVISATIONS",
              "category_name": "STRATEGIES"
            },
            {
              "id": 16,
              "name": "TRADE",
              "category_name": "STRATEGIES"
            }
    ]

    type TopCategory = "REALMS" | "LOCALITIES" | "SCALES" | "STRATEGIES";
    // const [categories, setCategories] = useState(categoriesData);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    const [topCategory, setTopCategory] = useState<TopCategory | "">(""); 

    const subCat = {
        REALMS: ["AFK", "ORAL", "INVISIBLE", "SONIC"],
        LOCALITIES: ["RITUALIZED", "HETEROTOPIC", "NON-PLACES", "INTIMATE"],
        SCALES: ["SHIFTS", "BODY", "LAND", "PUBLIC"],
        STRATEGIES: ["RADICAL", "NARRATIVE", "IMPROVISATIONS", "TRADE"]
    }
    const uniqueCategories = Array.from(new Set(categoriesData.map(category => category.category_name)));

    return (
        <div>
            <label className="form-control w-full">
                <div className="label pb-1">
                    <span className="label-text text-xl font-semibold">Category</span>
                    <span className="label-text-alt text-error text-sm opacity-80">required*</span>
                </div>
                {/* <input 
                    type={type} 
                    placeholder="Type here" 
                    className="input input-bordered w-full" 
                    {...register(name, { required })} 
                    aria-invalid={errors[name] ? "true" : "false"}
                /> */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <select 
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setTopCategory(e.target.value as TopCategory)}
                    >
                        <option disabled >Category</option>
                        <option>REALMS</option>
                        <option>LOCALITIES</option>
                        <option>SCALES</option>
                        <option>STRATEGIES</option>
                        {/* {
                            uniqueCategories.map((category, index) => (
                            <option key={index} value={categories.find(cat => cat.category_name === category)?.id}>
                                {category}
                            </option>
                            ))
                        } */}
                    </select>
                    <select 
                        disabled={topCategory == ""}
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setSelectedCategories(e.target.value)}
                        // {...register("category", { required })}
                    >
                        <option disabled >Sub-Category</option>
                        {
                            topCategory && subCat[topCategory].map((cat, index) => (
                                <option key={index}>{cat}</option>
                            ))
                        }
                    </select>
                </div>
                {/* {
                    errors[name] && (
                        <div className="label">
                            <span className="label-text-alt text-error flex flex-row items-center">
                                <FiAlertCircle className="text-lg mr-2" />
                                {errorMessage || ""}
                            </span>
                            {
                                errors[name]?.type == "required" && (
                                    <span className="label-text-alt">{description || required ? "This field is required" : ""}</span>
                                )
                            }
                        </div>
                    )
                } */}
            </label>

        </div>
    )
}