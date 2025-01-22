import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link href="/test" className="relative w-full h-80">
        <Image
          src="https://images.pexels.com/photos/29893439/pexels-photo-29893439/free-photo-of-delicious-breakfast-with-bread-and-eggs-dish.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          sizes="25vw"
        />
      </Link>
    </div>
  );
};
export default ProductList;
