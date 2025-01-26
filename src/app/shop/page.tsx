"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import ProductCard from "@/app/components/ProductCard"; 

import Image from "next/image"
import React, { useState, useEffect } from "react"
import { type ICategoryWithFoods, type IFood, SortOption } from "@/sanity/lib/interfaces"
import CustomPagination from ".././components/pagination"
import SearchBar from ".././components/searchBar"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
async function fetchCategoriesWithFoods() {

  const query = `*[_type == "food"]{
        _id,
        name,
        price,
        rating,
        tags,
        "imageUrl": image.asset->url
      }`
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error("Failed to fetch foods:", error)
    return []
  }
}

export default function Shop() {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState<ICategoryWithFoods[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.AZ)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    fetchCategoriesWithFoods().then((data) => {
      setCategoriesWithFoods(data)
    })
  }, [])

  const handleCategorySelection = (categoryName: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryName)) {
        return prevSelected.filter((name) => name !== categoryName)
      } else {
        return [...prevSelected, categoryName]
      }
    })
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredFoods:ICategoryWithFoods[] = categoriesWithFoods 
   

  const sortFoods = (a: IFood, b: IFood): number => {
    switch (sortOption) {
      case SortOption.AZ:
        return a.name.localeCompare(b.name)
      case SortOption.ZA:
        return b.name.localeCompare(a.name)
      case SortOption.LowHigh:
        return a.price - b.price
      case SortOption.HighLow:
        return b.price - a.price
      default:
        return 0
    }
  }

  filteredFoods.sort(sortFoods)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div
        className="pt-[150px] lg:pt-0 w-full bg-no-repeat bg-center flex justify-center"
        style={{
          backgroundImage: "url('/unsplash.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          height: "300px",
        }}
      >
        <div className="w-full max-w-5xl flex flex-col justify-center items-center text-white text-center py-16">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Our Shop</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/" className="text-xl sm:text-2xl md:text-3xl">
              Home
            </Link>
            <div className="flex items-center">
              <Image src="/Vector.png" width={10} height={10} alt="Vector Icon" />
              <Link href="/shop" className="ml-2 text-xl sm:text-2xl md:text-3xl text-[#FF9F0D]">
                Our Shop
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-[1320px] mx-auto py-[20px] lg:py-[50px] px-[20px] lg:px-[60px] text-black body-font bg-white">
        <div className="md:grid md:grid-cols-4 gap-4 flex flex-col-reverse">
          <div className="col-span-full md:col-span-3 p-4">
            <div className="mb-6">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] gap-y-4 min-h-[600px]">
              {currentFoods.length > 0 ? (
                currentFoods.map((food) => (
                 
                   <ProductCard
            key={food._id}
            pid={food._id}
            image={food.imageUrl}
            name={food.name}
            price={`$${food.price}`}
            discountedPrice={`$${(food.price * 0.8).toFixed(2)}`}
            discount="20% off"
            rating={food.rating}
            reviews={Math.floor(Math.random() * 100)}
          /> 

                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">No food items found.</div>
              )}
            </div>

            <div className="flex gap-4 justify-center items-center mt-[50px]">
              <CustomPagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
            </div>
          </div>

          <div className="flex gap-y-[30px] flex-col items-center md:items-start col-span-full md:col-span-1 p-4 text-[#333333]">
            <div className="flex gap-[10px] items-center md:items-start">
              <h3 className="font-bold text-[20px] p-0 m-0">Sort By:</h3>
              <div className="sort-dropdown">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[120px] hover:bg-[#FF9F0D] hover:text-white border border-[#FF9F0D]"
                    >
                      {sortOption === SortOption.AZ && "A-Z"}
                      {sortOption === SortOption.ZA && "Z-A"}
                      {sortOption === SortOption.LowHigh && "Low-High"}
                      {sortOption === SortOption.HighLow && "High-Low"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-[#FF9F0D] border border-[#FF9F0D] min-w-[120px]">
                    <DropdownMenuItem
                      onSelect={() => handleSortChange(SortOption.AZ)}
                      className="hover:bg-[#FF9F0D] hover:text-white"
                    >
                      A-Z
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleSortChange(SortOption.ZA)}
                      className="hover:bg-[#FF9F0D] hover:text-white"
                    >
                      Z-A
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleSortChange(SortOption.LowHigh)}
                      className="hover:bg-[#FF9F0D] hover:text-white"
                    >
                      Low-High
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleSortChange(SortOption.HighLow)}
                      className="hover:bg-[#FF9F0D] hover:text-white"
                    >
                      High-Low
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start w-full">
              <h3 className="font-bold text-[20px] ">Categories</h3>
              <div className="flex flex-col sm:flex-row md:flex-col justify-around md:justify-start my-[15px] w-unset sm:w-full">
                {categoriesWithFoods.map((category) => (
                  <div className="flex items-center space-x-2" key={category._id}>
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => handleCategorySelection(category.name)}
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

