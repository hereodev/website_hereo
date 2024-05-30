"use client";

import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function CategoriesSelect(
    { categories, selectedCategories, setSelectedCategories } :
    { categories: string[], selectedCategories: string, setSelectedCategories: (categories: string) => void }
) {

// Define the TopCategory type
type TopCategory = "REALMS" | "LOCALITIES" | "SCALES" | "STRATEGIES";

// Updated categoriesData based on the new list of tags
const categoriesData = [
  { "id": 1, "name": "Sonic", "category_name": "REALMS" },
  { "id": 2, "name": "Chaos", "category_name": "REALMS" },
  { "id": 3, "name": "Dissonant", "category_name": "REALMS" },
  { "id": 4, "name": "Imagined", "category_name": "REALMS" },
  { "id": 5, "name": "Mythical", "category_name": "REALMS" },
  { "id": 6, "name": "Invisible", "category_name": "REALMS" },
  { "id": 7, "name": "Ancestral", "category_name": "REALMS" },
  { "id": 8, "name": "Oral", "category_name": "REALMS" },
  { "id": 9, "name": "Margin(al)", "category_name": "REALMS" },
  { "id": 10, "name": "AFK", "category_name": "REALMS" },
  { "id": 11, "name": "IRL", "category_name": "REALMS" },
  { "id": 12, "name": "Shifts", "category_name": "SCALES" },
  { "id": 13, "name": "Mutations", "category_name": "SCALES" },
  { "id": 14, "name": "Body", "category_name": "SCALES" },
  { "id": 15, "name": "Home", "category_name": "SCALES" },
  { "id": 16, "name": "Land", "category_name": "SCALES" },
  { "id": 17, "name": "Curatorial", "category_name": "SCALES" },
  { "id": 18, "name": "Wandering", "category_name": "SCALES" },
  { "id": 19, "name": "Public space", "category_name": "SCALES" },
  { "id": 20, "name": "Interstice", "category_name": "SCALES" },
  { "id": 21, "name": "Radical", "category_name": "LOCALITIES" },
  { "id": 22, "name": "Recenter", "category_name": "LOCALITIES" },
  { "id": 23, "name": "Ritualized", "category_name": "LOCALITIES" },
  { "id": 24, "name": "Non-place", "category_name": "LOCALITIES" },
  { "id": 25, "name": "Heterotopic", "category_name": "LOCALITIES" },
  { "id": 26, "name": "Intimate", "category_name": "LOCALITIES" },
  { "id": 27, "name": "Public", "category_name": "LOCALITIES" },
  { "id": 28, "name": "Collective", "category_name": "LOCALITIES" },
  { "id": 29, "name": "Document", "category_name": "STRATEGIES" },
  { "id": 30, "name": "Content", "category_name": "STRATEGIES" },
  { "id": 31, "name": "Index", "category_name": "STRATEGIES" },
  { "id": 32, "name": "Archive", "category_name": "STRATEGIES" },
  { "id": 33, "name": "Collect", "category_name": "STRATEGIES" },
  { "id": 34, "name": "Codify", "category_name": "STRATEGIES" },
  { "id": 35, "name": "Forensic", "category_name": "STRATEGIES" },
  { "id": 36, "name": "Cartographic", "category_name": "STRATEGIES" },
  { "id": 37, "name": "Profiling", "category_name": "STRATEGIES" },
  { "id": 38, "name": "Storytelling / myth-making / fictional", "category_name": "STRATEGIES" },
  { "id": 39, "name": "Care", "category_name": "STRATEGIES" },
  { "id": 40, "name": "Inhabit", "category_name": "STRATEGIES" },
  { "id": 41, "name": "Perform(ative)", "category_name": "STRATEGIES" },
  { "id": 42, "name": "Improvisational", "category_name": "STRATEGIES" },
  { "id": 43, "name": "Cheat", "category_name": "STRATEGIES" },
  { "id": 44, "name": "Trade / Negotiate", "category_name": "STRATEGIES" },
  { "id": 45, "name": "Publicise", "category_name": "STRATEGIES" },
  { "id": 46, "name": "(Dis-)invest", "category_name": "STRATEGIES" }
];

// Updated subCat object based on the new list of tags
const subCat = {
  REALMS: [
    "Sonic", "Chaos", "Dissonant", "Imagined", "Mythical", "Invisible", 
    "Ancestral", "Oral", "Margin(al)", "AFK", "IRL"
  ],
  SCALES: [
    "Shifts", "Mutations", "Body", "Home", "Land", "Curatorial", 
    "Wandering", "Public space", "Interstice"
  ],
  LOCALITIES: [
    "Radical", "Recenter", "Ritualized", "Non-place", "Heterotopic", 
    "Intimate", "Public", "Collective"
  ],
  STRATEGIES: [
    "Document", "Content", "Index", "Archive", "Collect", "Codify", 
    "Forensic", "Cartographic", "Profiling", "Storytelling / myth-making / fictional", 
    "Care", "Inhabit", "Perform(ative)", "Improvisational", "Cheat", 
    "Trade / Negotiate", "Publicise", "(Dis-)invest"
  ]
};

    const uniqueCategories = Array.from(new Set(categoriesData.map(category => category.category_name)));
    // const [categories, setCategories] = useState(categoriesData);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    const [topCategory, setTopCategory] = useState<TopCategory | "">(""); 


    return (
        <div>
            <label className="form-control w-full">
                <div className="label pb-1">
                    <span className="label-text text-xl font-semibold text-primary">Prompt</span>
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