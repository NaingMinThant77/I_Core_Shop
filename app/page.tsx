import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import TagFilter from "@/components/products/tag-filter";
import { db } from "@/server";

export default async function Home() {
  const productWithVariants = await db.query.productVariants.findMany({
    with: { variantImage: true, variantTags: true, product: true },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main>
      <SearchBox productWithVariants={productWithVariants} />
      <TagFilter />
      {productWithVariants.length > 0 ? <Products productWithVariants={productWithVariants} />
        : <p className="text-red-400 mt-4">There is no products with variants</p>}
    </main>
  );
}
