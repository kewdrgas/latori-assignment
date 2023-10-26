import { useLoaderData, useNavigate } from '@remix-run/react';
import { ProductCard, TProduct } from '~/components/productCard';
import { useState } from 'react';

export default function MainPage() {
  let initialProducts: TProduct[] = useLoaderData();
  const [products, setProducts] = useState<TProduct[]>(initialProducts);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    const currentOffset = products.length;
    const newOffset = currentOffset + 6;

    fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${currentOffset}&limit=6`
    )
      .then((res) => res.json())
      .then((newProducts) => {
        setProducts((prev) => [...prev, ...newProducts]);
      })
      .catch((error) => console.error('Failed to load more products:', error));
  };

  return (
    <div className="px-4 md:px-0">
      <div className="mt-6 flex flex-col md:grid grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10 md:grid-cols-3">
        {products.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button
        onClick={handleLoadMore}
        className="block m-auto text-xs whitespace-nowrap w-full md:w-auto py-2 px-44 bg-black hover:bg-black/90 text-white uppercase mt-8 mb-10"
      >
        Load More
      </button>
    </div>
  );
}

export const loader = ({ request }: any) => {
  const url = new URL(request.url);

  return fetch(
    `https://api.escuelajs.co/api/v1/products?offset=0&limit=6`
  ).then((res) => res.json());
};
