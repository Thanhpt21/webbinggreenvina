"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Typography,
  Tabs,
  message,
  Modal,
  Tag,
  Rate,
} from "antd";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import ProductImageGallery from "@/components/layout/product/ProductImageGallery";
import { useProductBySlug } from "@/hooks/product/useProductBySlug";
import { useAllCategories } from "@/hooks/category/useAllCategories";
import { useAllBrands } from "@/hooks/brand/useAllBrands";
import RatingComponent from "@/components/layout/rating/RatingComponent";
import { getImageUrl } from "@/utils/getImageUrl";
import { Product } from "@/types/product.type";
import { CartItem } from "@/types/cart.type";
import { useCartStore } from "@/stores/cartStore";

const { Title, Text, Paragraph } = Typography;

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const {
    data: product,
    isLoading: loadingProduct,
    isError,
  } = useProductBySlug({ slug: slug as string });
  
  const addItemOptimistic = useCartStore((state) => state.addItemOptimistic);
  const [isAdding, setIsAdding] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const { data: allCategories } = useAllCategories();
  const { data: allBrands } = useAllBrands();

  const categoryName = allCategories?.find(
    (cat: any) => cat.id === currentProduct?.categoryId
  )?.name;
  const brandName = allBrands?.find(
    (brand: any) => brand.id === currentProduct?.brandId
  )?.name;

  useEffect(() => {
    if (product && !currentProduct) {
      setCurrentProduct({
        ...product,
        thumb: getImageUrl(product.thumb ?? null),
      });
      setMainImage(getImageUrl(product.thumb ?? null));
    }
  }, [product, currentProduct]);

  const handleThumbnailClick = (img: string) => setMainImage(img);

const handleAddToCart = useCallback(() => {
  if (!product) return;

  if (!isAuthenticated) {
    setIsLoginModalOpen(true);
    return;
  }
  if (isAdding) return;

  setIsAdding(true);

  try {
    // Tính giá cuối cùng
    const basePrice = product.basePrice;
    let finalPrice = basePrice;
    
    if (product.promotionProducts && product.promotionProducts.length > 0) {
      const promo = product.promotionProducts[0];
      if (promo.discountType === "PERCENT") {
        finalPrice = basePrice * (1 - promo.discountValue / 100);
      } else if (promo.discountType === "FIXED") {
        finalPrice = Math.max(0, basePrice - promo.discountValue);
      }
    }

    // Tạo cart item theo đúng cấu trúc CartItem type
    const newCartItem: CartItem = {
      id: Date.now(), // ID tạm thời
      productVariantId: 0, // Không dùng variant nữa
      productId: product.id,
      cartId: 0,
      quantity: 1,
      priceAtAdd: finalPrice,
      finalPrice: finalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variant: {
        id: 0,
        productId: product.id,
        sku: product.slug || '',
        barcode: '',
        priceDelta: 0,
        price: finalPrice,
        attrValues: {},
        thumb: product.thumb || '',
        warehouseId: null,
        product: {
          id: product.id,
          tenantId: product.tenantId,
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          basePrice: product.basePrice,
          thumb: product.thumb || '',
          images: product.images || [],
          status: (product.status === 'ACTIVE' || product.status === 'INACTIVE') 
            ? product.status 
            : 'ACTIVE', // Default to ACTIVE if not matching
          isPublished: product.isPublished || false,
          isFeatured: product.isFeatured || false,
          totalRatings: product.totalRatings || 0,
          totalReviews: product.totalReviews || 0,
          numberSold: product.numberSold || 0,
          seoTitle: product.seoTitle || '',
          seoDescription: product.seoDescription || '',
          seoKeywords: product.seoKeywords || '',
          categoryId: product.categoryId || 0,
          brandId: product.brandId || 0,
          createdById: product.createdById || 0,
          weight: product.weight || 0,
          length: product.length || 0,
          width: product.width || 0,
          height: product.height || 0,
          createdAt: product.createdAt || new Date().toISOString(),
          updatedAt: product.updatedAt || new Date().toISOString(),
          promotionProducts: product.promotionProducts || [],
        },
      },
    };

    // Thêm vào store
    addItemOptimistic(newCartItem);
    message.success("Đã thêm vào giỏ hàng!");
    
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    message.error("Có lỗi xảy ra khi thêm vào giỏ hàng!");
  } finally {
    setIsAdding(false);
  }
}, [
  product,
  isAuthenticated,
  isAdding,
  addItemOptimistic,
]);

  const handleLoginModalOk = () => {
    setIsLoginModalOpen(false);
    const currentPath = window.location.pathname;
    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
  };

  const handleLoginModalCancel = () => {
    setIsLoginModalOpen(false);
  };

  if (loadingProduct || !currentProduct || !mainImage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-300 mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            Đang tải sản phẩm...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-xl text-red-600 font-semibold">
            Lỗi khi tải sản phẩm
          </p>
        </div>
      </div>
    );
  }

  const getDiscountedPrice = () => {
    if (!currentProduct?.promotionProducts?.length) return null;

    const promo = currentProduct.promotionProducts[0];
    const basePrice = currentProduct.basePrice;

    if (promo.discountType === "PERCENT") {
      return basePrice * (1 - promo.discountValue / 100);
    }
    if (promo.discountType === "FIXED") {
      return Math.max(0, basePrice - promo.discountValue);
    }

    return null;
  };

  const discountedPrice = getDiscountedPrice();
  const finalPrice = discountedPrice ?? currentProduct.basePrice;
  const originalPrice = currentProduct.basePrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 mb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/san-pham"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sản phẩm
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-md">
              {currentProduct.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1400px]">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 mb-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
            <ProductImageGallery
              currentData={currentProduct}
              productTitle={currentProduct.name}
              mainImage={mainImage}
              onThumbnailClick={handleThumbnailClick}
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {brandName && (
                <Tag color="blue" className="px-4 py-1 text-sm font-medium rounded-full">
                  {brandName}
                </Tag>
              )}
              {categoryName && (
                <Tag color="purple" className="px-4 py-1 text-sm font-medium rounded-full">
                  {categoryName}
                </Tag>
              )}
              <Tag color="green" className="px-4 py-1 text-sm font-medium rounded-full">
                Mới
              </Tag>
            </div>

            {/* Product Name */}
            <div>
              <Title
                level={2}
                className="!mb-2 !text-3xl !font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {currentProduct.name}
              </Title>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Rate
                disabled
                allowHalf
                value={currentProduct.totalRatings}
                style={{ fontSize: "15px" }}
                className="text-yellow-400"
              />
              <span className="text-gray-400 text-xs">
                ({currentProduct.totalReviews} đánh giá)
              </span>
            </div>

            {/* Promotion Badge */}
            {currentProduct.promotionProducts && currentProduct.promotionProducts.length > 0 ? (
              <div className="mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg flex items-center gap-3 animate-pulse">
                <span className="text-2xl">{currentProduct.promotionProducts[0].promotion.isFlashSale ? 'FlashSale' : ''}</span>
                <div className="flex-1">
                  <div className="font-bold text-lg">
                    {currentProduct.promotionProducts[0].promotion.name}
                  </div>
                  <div className="text-sm opacity-90">
                    Kết thúc: {new Date(currentProduct.promotionProducts[0].promotion.endTime).toLocaleString("vi-VN")}
                  </div>
                </div>
                <div className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-lg">
                  -{currentProduct.promotionProducts[0].discountType === "PERCENT"
                    ? `${currentProduct.promotionProducts[0].discountValue}%`
                    : `${currentProduct.promotionProducts[0].discountValue.toLocaleString()}đ`}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500"></div>
            )}

            {/* Gift Section */}
            {currentProduct.promotionProducts && 
             currentProduct.promotionProducts.length > 0 && 
             currentProduct.promotionProducts[0].giftProduct && (
              <div className="mb-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-5 border-2 border-pink-200 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎁</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Quà tặng kèm
                  </span>
                  <span className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MIỄN PHÍ
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-pink-200 shadow-sm">
                    <img 
                      src={getImageUrl(currentProduct.promotionProducts[0].giftProduct.thumb) || ''}
                      alt={currentProduct.promotionProducts[0].giftProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                      x{currentProduct.promotionProducts[0].giftQuantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">
                      {currentProduct.promotionProducts[0].giftProduct.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        {currentProduct.promotionProducts[0].giftProduct.basePrice.toLocaleString()}đ
                      </span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        Tặng {currentProduct.promotionProducts[0].giftQuantity} sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center text-sm text-gray-600 bg-white/50 rounded-lg py-2 px-3">
                  💝 Tự động thêm vào đơn hàng khi mua sản phẩm này
                </div>
              </div>
            )}

            {/* Price Card */}
            {currentProduct.promotionProducts && currentProduct.promotionProducts.length > 0 ? (
              <div className="bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-yellow-400 text-red-800 text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                  {currentProduct.promotionProducts[0].promotion.name}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium opacity-90">Giá gốc:</span>
                  <span className="text-lg line-through opacity-70">
                    {originalPrice.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-medium opacity-90">Giá khuyến mãi:</span>
                  <span className="text-5xl font-black">{finalPrice.toLocaleString()}</span>
                  <span className="text-xl font-bold">VNĐ</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-white/30 px-3 py-1 rounded-full text-sm font-bold">
                    -{currentProduct.promotionProducts[0].discountType === "PERCENT"
                      ? `${currentProduct.promotionProducts[0].discountValue}%`
                      : `${currentProduct.promotionProducts[0].discountValue.toLocaleString()}đ`}
                  </span>
                  <span className="text-sm opacity-80">
                    Tiết kiệm: {(originalPrice - finalPrice).toLocaleString()}đ
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-medium opacity-90">Giá bán:</span>
                  <span className="text-xl font-bold">Liên hệ: 0903 776 456</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={isAdding || !product}
                className="!h-14 !rounded-xl !text-lg font-semibold !bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:!opacity-50 disabled:!cursor-not-allowed !px-10"
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-white border-r-2"></span>
                    Đang thêm...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-xl">🛒</span>
                    <span>Thêm vào giỏ hàng</span>
                  </span>
                )}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-xs font-medium text-gray-700">Hàng chính hãng</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-2xl mb-1">🚚</div>
                <div className="text-xs font-medium text-gray-700">Giao hàng nhanh</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-2xl mb-1">🔄</div>
                <div className="text-xs font-medium text-gray-700">Đổi trả 7 ngày</div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <Modal
          open={isLoginModalOpen}
          onOk={handleLoginModalOk}
          onCancel={handleLoginModalCancel}
          okText="Đăng nhập ngay"
          cancelText="Để sau"
          centered
        >
          <div className="text-center py-6">
            <div className="text-6xl mb-4">🔐</div>
            <Title level={3} className="!mb-4">Đăng nhập để tiếp tục</Title>
            <p className="text-lg mb-6 text-gray-600">
              Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Sản phẩm đã chọn:</p>
              <p className="font-bold text-lg text-gray-800 mb-2">{product?.name}</p>
              <p className="text-2xl font-bold text-blue-600">
                {finalPrice.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        </Modal>

        {/* Details Section */}
        <div className="mt-8 mb-8">
          <Tabs
            defaultActiveKey="description"
            size="large"
            items={[
              {
                key: "description",
                label: <span className="font-semibold">📝 Mô tả sản phẩm</span>,
                children: (
                  <div className="prose max-w-none pt-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentProduct.description || '<p class="text-gray-500 py-4">Chưa có mô tả chi tiết cho sản phẩm này.</p>',
                      }}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>
                ),
              },
              {
                key: "policy",
                label: <span className="font-semibold">📋 Chính sách</span>,
                children: (
                  <div className="space-y-6 pt-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <Title level={4} className="!mb-3 flex items-center gap-2">
                        <span className="text-2xl">🚚</span>Chính sách vận chuyển
                      </Title>
                      <Paragraph className="!mb-0 text-gray-700">
                        Giao hàng nhanh chóng và an toàn, từ 2-5 ngày làm việc. Miễn phí vận chuyển cho đơn hàng trên 500.000đ.
                      </Paragraph>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <Title level={4} className="!mb-3 flex items-center gap-2">
                        <span className="text-2xl">🔄</span>Chính sách đổi trả
                      </Title>
                      <Paragraph className="!mb-0 text-gray-700">
                        Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả. Sản phẩm phải còn nguyên vẹn và chưa qua sử dụng.
                      </Paragraph>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <Title level={4} className="!mb-3 flex items-center gap-2">
                        <span className="text-2xl">🛡️</span>Chính sách bảo hành
                      </Title>
                      <Paragraph className="!mb-0 text-gray-700">
                        Sản phẩm được bảo hành chính hãng theo quy định của nhà sản xuất. Chi tiết vui lòng liên hệ CSKH để được hỗ trợ.
                      </Paragraph>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Rating Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Đánh giá từ khách hàng
            </h3>
            {currentProduct.totalReviews > 0 && (
              <span className="text-xs text-gray-500">
                {currentProduct.totalReviews} đánh giá
              </span>
            )}
          </div>
          {product?.id && <RatingComponent productId={product.id} />}
        </div>
      </div>
    </div>
  );
}