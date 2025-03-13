"use client";

import { useState } from "react";

import { CategoryTabs } from "@/components/dashboard/category-tabs";
import { RoomsList } from "@/components/dashboard/rooms-list";

export function DashboardPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CategoryTabs
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />
      <RoomsList category={activeCategory} searchQuery={searchQuery} />
    </>
  );
}
