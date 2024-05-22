"use client";

import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function CategoriesSelect(
    { categories, selectedCategories, setSelectedCategories } :
    { categories: string[], selectedCategories: string, setSelectedCategories: (categories: string) => void }
) {

    type TopCategory = "REALMS" | "LOCALITIES" | "SCALES" | "STRATEGIES";

    const [topCategory, setTopCategory] = useState<TopCategory | "">(""); 

    const subCat = {
        REALMS: ["AFK", "ORAL", "INVISIBLE", "SONIC"],
        LOCALITIES: ["RITUALIZED", "HETEROTOPIC", "NON-PLACES", "INTIMATE"],
        SCALES: ["SHIFTS", "BODY", "LAND", "PUBLIC"],
        STRATEGIES: ["RADICAL", "NARRATIVE", "IMPROVISATIONS", "TRADE"]
    }
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
                        <option disabled selected>Category</option>
                        <option>REALMS</option>
                        <option>LOCALITIES</option>
                        <option>SCALES</option>
                        <option>STRATEGIES</option>
                    </select>
                    <select 
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setSelectedCategories(e.target.value)}
                        // {...register("category", { required })}
                    >
                        <option disabled selected>Sub-Category</option>
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