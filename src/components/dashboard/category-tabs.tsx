"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define the categories
const categories = [
  { id: "all", label: "All Rooms" },
  { id: "tech", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
  { id: "gaming", label: "Gaming" },
  { id: "social", label: "Social" },
  { id: "other", label: "Other" },
];

interface CategoryTabsProps {
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export function CategoryTabs({
  onCategoryChange,
  onSearchChange,
}: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-4 border-y p-4 border-dashed">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex overflow-x-auto pb-2 sm:pb-0 -mx-2 px-2 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-auto min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search rooms..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}
