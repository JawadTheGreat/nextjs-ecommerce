import Image from "next/image";
import Link from "next/link";
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: { [key: string]: string | undefined };
}) => {
  const PRODUCTS_PER_PAGE = 8;

  const wixClient = await wixClientServer();
  let productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999)
    .limit(limit || PRODUCTS_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCTS_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery = productQuery.ascending(sortBy as "price" | "lastUpdated");
    }
    if (sortType === "desc") {
      productQuery = productQuery.descending(sortBy as "price" | "lastUpdated");
    }
  }

  const res = await productQuery.find();

  // my solution

  // let res = await productQuery.find();

  // if (searchParams?.sort) {
  //   const [sortType, sortBy] = searchParams.sort.split(" ");

  //   if (sortType === "asc") {
  //     res = await productQuery
  //       .ascending(sortBy as "price" | "lastUpdated")
  //       .find();
  //   }
  //   if (sortType === "desc") {
  //     res = await productQuery
  //       .descending(sortBy as "price" | "lastUpdated")
  //       .find();
  //   }
  // }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500 ease-in"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1].image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">{product.priceData?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className="w-max rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </div>
  );
};
export default ProductList;
