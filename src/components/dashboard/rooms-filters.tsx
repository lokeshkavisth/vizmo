"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function RoomsFilter() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search rooms..."
          className="w-full min-w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-4" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-filter">Creation date</Label>
              <Select>
                <SelectTrigger id="date-filter">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
