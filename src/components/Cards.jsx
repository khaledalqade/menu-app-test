import React from "react";
import Card from "./Card";

const ProductList = ({ products }) => {
  return (
    <div className="w-full h-full">
      {/* <div className="w-full h-full bg-orange-500">fghxdfgjsfgtj</div> */}
      <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-4">
        {products.map((product) => (
          <Card key={product.id} food={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
