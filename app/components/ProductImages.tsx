"use client";
import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/19651067/pexels-photo-19651067/free-photo-of-slice-of-cake-on-a-plate.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/5593497/pexels-photo-5593497.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/30406031/pexels-photo-30406031/free-photo-of-misty-winter-forest-road-in-thuringen.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/30862653/pexels-photo-30862653/free-photo-of-charming-village-scene-in-lopud-croatia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
// ];

interface ProductImage {
  _id: string;
  image: {
    url: string;
  };
}

const ProductImages = ({ items }: { items: ProductImage[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          sizes="50vw"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item, i) => (
          <div
            key={item._id}
            onClick={() => setIndex(i)}
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
          >
            <Image
              src={item.image?.url}
              alt=""
              sizes="30vw"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;
