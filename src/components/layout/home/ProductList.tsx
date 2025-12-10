"use client";

import { useState, useMemo } from "react";
import { Pagination } from "antd";
import { useAllProducts } from "@/hooks/product/useAllProducts";
import { Product } from "@/types/product.type";
import ProductCardFeatured from "../product/ProductCardFeatured";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  // Sử dụng useAllProducts hook (không có search)
  const { data: allProducts = [], isLoading, isError } = useAllProducts();

  // Tính toán phân trang
  const { paginatedProducts, totalProducts } = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) {
      return { paginatedProducts: [], totalProducts: 0 };
    }

    // Lọc sản phẩm isFeatured
    const filteredProducts = allProducts.filter((p: Product) => p.isFeatured);
    
    // Tính toán phân trang
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginated = filteredProducts.slice(startIndex, endIndex);

    return {
      paginatedProducts: paginated,
      totalProducts: filteredProducts.length,
    };
  }, [allProducts, currentPage]);

  console.log("allProducts", allProducts);
  console.log("paginatedProducts", paginatedProducts);
  console.log("totalProducts", totalProducts);

  if (isLoading) return <div className="py-20 text-center text-gray-500">Đang tải...</div>;
  if (isError) return <div className="py-20 text-center text-red-500">Có lỗi xảy ra khi tải sản phẩm</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - Minimalist */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Gợi ý cho bạn
          </h2>
          <div className="w-16 h-1 bg-gray-900 rounded-full mb-4"></div>
          <p className="text-gray-500 max-w-2xl">
            Tuyển tập những sản phẩm xu hướng mới nhất
          </p>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {paginatedProducts.map((product: Product, index: number) => (
                <ProductCardFeatured key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination - Clean */}
            {totalProducts > PRODUCTS_PER_PAGE && (
              <div className="flex justify-center mt-12">
                <Pagination
                  current={currentPage}
                  total={totalProducts}
                  pageSize={PRODUCTS_PER_PAGE}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                  className="custom-pagination-modern"
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Không tìm thấy sản phẩm nổi bật nào
          </div>
        )}
      </div>
    </section>
  );
}