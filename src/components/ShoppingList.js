import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items , setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search , setSearchValue] = useState("")
  const [itemName , setItemName] = useState("")
  const [itemCategory , setItemCategory] = useState("Produce")
 
  

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchValue(event) {
    setSearchValue(event.target.value)
  }

  function handleItemName(event) {
    setItemName(event.target.value)
  }

  function handleItemCategory(event) {
    setItemCategory(event.target.value)
  }

   const newItem = {
      id: uuid() ,
      name : itemName ,
      category : itemCategory
    }
  function handleItemFormSubmit(event) {
    event.preventDefault()
    const dataArray = [...items , newItem]
    setItems(dataArray)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  
  const filteredByName = itemsToDisplay.filter(item => {
    if (item.name === "") return true;

    return (item.name.includes(search))
  })

  return (
    <div className="ShoppingList">
      <ItemForm 
        onItemFormSubmit={handleItemFormSubmit}
        itemName={itemName}
        itemCategory={itemCategory}
        onItemNameChange={handleItemName}
        onItemCategoryChange={handleItemCategory}
      />
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={handleSearchValue}
        search={search}
      />
      <ul className="Items">
        {filteredByName.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
