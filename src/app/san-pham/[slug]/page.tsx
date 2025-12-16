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
  Skeleton,
  Dropdown,
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
import {
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  Gift,
  Star,
  ArrowLeft,
  Home,
  Package,
  Menu,
  MoreVertical,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;

// ==================== SKELETON LOADING COMPONENT ====================
const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-gray-200 mb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Skeleton.Input active size="small" style={{ width: 80 }} />
            <Skeleton.Input active size="small" style={{ width: 10 }} />
            <Skeleton.Input active size="small" style={{ width: 100 }} />
            <Skeleton.Input active size="small" style={{ width: 10 }} />
            <Skeleton.Input active size="small" style={{ width: 200 }} />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Product Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 mb-8">
          {/* Image Gallery Skeleton */}
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
            <div className="space-y-4">
              {/* Main Image Skeleton */}
              <Skeleton.Image 
                active 
                className="!w-full !h-[400px] lg:!h-[500px] rounded-xl" 
              />
              
              {/* Thumbnails Skeleton */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, idx) => (
                  <Skeleton.Image 
                    key={idx} 
                    active 
                    className="!w-full !h-[80px] rounded-lg" 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6">
            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton.Input active size="small" style={{ width: 80, height: 32 }} />
              <Skeleton.Input active size="small" style={{ width: 100, height: 32 }} />
              <Skeleton.Input active size="small" style={{ width: 60, height: 32 }} />
            </div>

            {/* Product Name Skeleton */}
            <div>
              <Skeleton.Input 
                active 
                size="large" 
                style={{ width: '100%', height: 40 }} 
                className="!rounded-lg"
              />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton.Input active size="small" style={{ width: 100 }} />
              <Skeleton.Input active size="small" style={{ width: 60 }} />
            </div>

            {/* Promotion Badge Skeleton */}
            <Skeleton.Input 
              active 
              style={{ width: '100%', height: 80 }} 
              className="!rounded-xl"
            />

            {/* Price Skeleton */}
            <div className="space-y-2">
              <Skeleton.Input active style={{ width: 120, height: 20 }} />
              <Skeleton.Input active style={{ width: 200, height: 40 }} />
            </div>

            {/* Action Button Skeleton */}
            <Skeleton.Button 
              active 
              size="large" 
              style={{ width: '100%', height: 56 }} 
              className="!rounded-xl"
            />

            {/* Trust Badges Skeleton */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="text-center p-3 rounded-xl">
                  <Skeleton.Avatar active size="large" />
                  <Skeleton.Input 
                    active 
                    size="small" 
                    style={{ width: '100%', marginTop: 8 }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section Skeleton */}
        <div className="mt-8 mb-8">
          <div className="mb-4">
            <Skeleton.Input active style={{ width: 200, height: 40 }} />
          </div>
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>

        {/* Rating Section Skeleton */}
        <div className="mt-8">
          <Skeleton.Input active style={{ width: 150, height: 40, marginBottom: 16 }} />
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>
    </div>
  );
};

// ==================== MOBILE BREADCRUMB ====================
const MobileBreadcrumb = ({ 
  categoryName, 
  productName, 
  categoryId 
}: { 
  categoryName?: string; 
  productName: string;
  categoryId?: number;
}) => {
  const router = useRouter();
  const [showFullPath, setShowFullPath] = useState(false);

  const items = [
    {
      key: 'home',
      label: (
        <Link href="/" className="flex items-center gap-2 py-2 px-3">
          <Home className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
      ),
    },
    {
      key: 'products',
      label: (
        <Link href="/san-pham" className="flex items-center gap-2 py-2 px-3">
          <Package className="w-4 h-4" />
          <span>Sản phẩm</span>
        </Link>
      ),
    },
    ...(categoryName && categoryId ? [{
      key: 'category',
      label: (
        <Link 
          href={`/san-pham?category=${categoryId}`}
          className="flex items-center gap-2 py-2 px-3"
        >
          <span className="truncate max-w-[150px]">{categoryName}</span>
        </Link>
      ),
    }] : []),
    {
      key: 'current',
      label: (
        <div className="flex items-center gap-2 py-2 px-3">
          <span className="font-semibold text-blue-600 truncate max-w-[180px]">
            {productName}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="lg:hidden bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="px-3 py-3 flex items-center justify-between">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors p-1.5"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium hidden xs:inline">Quay lại</span>
        </button>

        {/* Dropdown for full path */}
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          overlayClassName="w-64 shadow-lg rounded-lg"
        >
          <button className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </Dropdown>
      </div>

      {/* Close full path view */}
      {showFullPath && (
        <div className="px-3 pb-2 flex justify-center">
          <button
            onClick={() => setShowFullPath(false)}
            className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
          >
            <ChevronUp className="w-3 h-3" />
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== DESKTOP BREADCRUMB ====================
const DesktopBreadcrumb = ({ 
  categoryName, 
  productName, 
  categoryId 
}: { 
  categoryName?: string; 
  productName: string;
  categoryId?: number;
}) => {
  return (
    <div className="hidden lg:block border-b border-gray-200 bg-white mb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <Link
            href="/san-pham"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sản phẩm
          </Link>
          {categoryName && categoryId && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
              <Link
                href={`/san-pham?category=${categoryId}`}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors truncate max-w-[180px]"
              >
                {categoryName}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
          <span className="text-gray-600 truncate max-w-[300px] font-semibold">
            {productName}
          </span>
        </nav>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // States
  const [isAdding, setIsAdding] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Hooks
  const { 
    data: product, 
    isLoading: loadingProduct, 
    isError 
  } = useProductBySlug({ slug: slug as string });
  
  const addItemOptimistic = useCartStore((state) => state.addItemOptimistic);
  const { data: allCategories } = useAllCategories();
  const { data: allBrands } = useAllBrands();

  // Memoized data
  const categoryName = allCategories?.find(
    (cat: any) => cat.id === currentProduct?.categoryId
  )?.name;
  
  const brandName = allBrands?.find(
    (brand: any) => brand.id === currentProduct?.brandId
  )?.name;

  // Initialize product and image
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

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    if (!currentProduct) return;

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (isAdding) return;
    setIsAdding(true);

    try {
      // Calculate final price
      const basePrice = currentProduct.basePrice;
      let finalPrice = basePrice;
      
      if (currentProduct.promotionProducts && currentProduct.promotionProducts.length > 0) {
        const promo = currentProduct.promotionProducts[0];
        if (promo.discountType === "PERCENT") {
          finalPrice = basePrice * (1 - promo.discountValue / 100);
        } else if (promo.discountType === "FIXED") {
          finalPrice = Math.max(0, basePrice - promo.discountValue);
        }
      }

      // Create cart item
      const newCartItem: CartItem = {
        id: Date.now(),
        productVariantId: 0,
        productId: currentProduct.id,
        cartId: 0,
        quantity: 1,
        priceAtAdd: finalPrice,
        finalPrice: finalPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        variant: {
          id: 0,
          productId: currentProduct.id,
          sku: currentProduct.slug || '',
          barcode: '',
          priceDelta: 0,
          price: finalPrice,
          attrValues: {},
          thumb: currentProduct.thumb || '',
          warehouseId: null,
          product: {
            id: currentProduct.id,
            tenantId: currentProduct.tenantId,
            name: currentProduct.name,
            slug: currentProduct.slug,
            description: currentProduct.description || '',
            basePrice: currentProduct.basePrice,
            thumb: currentProduct.thumb || '',
            images: currentProduct.images || [],
            status: (currentProduct.status === 'ACTIVE' || currentProduct.status === 'INACTIVE') 
              ? currentProduct.status 
              : 'ACTIVE',
            isPublished: currentProduct.isPublished || false,
            isFeatured: currentProduct.isFeatured || false,
            totalRatings: currentProduct.totalRatings || 0,
            totalReviews: currentProduct.totalReviews || 0,
            numberSold: currentProduct.numberSold || 0,
            seoTitle: currentProduct.seoTitle || '',
            seoDescription: currentProduct.seoDescription || '',
            seoKeywords: currentProduct.seoKeywords || '',
            categoryId: currentProduct.categoryId || 0,
            brandId: currentProduct.brandId || 0,
            createdById: currentProduct.createdById || 0,
            weight: currentProduct.weight || 0,
            length: currentProduct.length || 0,
            width: currentProduct.width || 0,
            height: currentProduct.height || 0,
            createdAt: currentProduct.createdAt || new Date().toISOString(),
            updatedAt: currentProduct.updatedAt || new Date().toISOString(),
            promotionProducts: currentProduct.promotionProducts || [],
          },
        },
      };

      // Add to store
      addItemOptimistic(newCartItem);
      message.success("Đã thêm vào giỏ hàng!");
      
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    } finally {
      setIsAdding(false);
    }
  }, [currentProduct, isAuthenticated, isAdding, addItemOptimistic]);

  // Calculate discounted price
  const getDiscountedPrice = useCallback(() => {
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
  }, [currentProduct]);

  // Price calculations
  const discountedPrice = getDiscountedPrice();
  const finalPrice = discountedPrice ?? currentProduct?.basePrice ?? 0;
  const originalPrice = currentProduct?.basePrice ?? 0;

  // Loading state
  if (loadingProduct || !currentProduct) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Title level={3} className="!mb-4 text-gray-800">Không tìm thấy sản phẩm</Title>
          <p className="text-gray-600 mb-6">
            Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => router.back()} className="rounded-lg">
              Quay lại
            </Button>
            <Button type="primary" onClick={() => router.push("/san-pham")} className="rounded-lg">
              Xem sản phẩm khác
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Breadcrumb */}
      <MobileBreadcrumb 
        categoryName={categoryName}
        productName={currentProduct.name}
        categoryId={currentProduct.categoryId ?? undefined}
      />

      {/* Desktop Breadcrumb */}
      <DesktopBreadcrumb 
        categoryName={categoryName}
        productName={currentProduct.name}
        categoryId={currentProduct.categoryId ?? undefined}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 mb-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-xl border border-gray-100">
            <ProductImageGallery
              currentData={currentProduct}
              productTitle={currentProduct.name}
              mainImage={mainImage}
              onThumbnailClick={handleThumbnailClick}
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 space-y-4 lg:space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3 lg:mb-4">
              {brandName && (
                <Tag color="blue" className="px-3 py-1 text-xs lg:text-sm font-medium rounded-full">
                  {brandName}
                </Tag>
              )}
              {categoryName && (
                <Tag color="purple" className="px-3 py-1 text-xs lg:text-sm font-medium rounded-full">
                  {categoryName}
                </Tag>
              )}
              <Tag color="green" className="px-3 py-1 text-xs lg:text-sm font-medium rounded-full">
                Mới
              </Tag>
              <Tag color="orange" className="px-3 py-1 text-xs lg:text-sm font-medium rounded-full">
                Còn hàng
              </Tag>
            </div>

            {/* Product Name */}
            <div>
              <Title
                level={2}
                className="!mb-2 !text-xl lg:!text-3xl !font-bold text-gray-900"
              >
                {currentProduct.name}
              </Title>
            </div>
            

            {/* Promotion Badge */}
            {currentProduct.promotionProducts && currentProduct.promotionProducts.length > 0 && (
              <div className="mb-4 p-3 lg:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm lg:text-base font-bold">
                      {currentProduct.promotionProducts[0].promotion.isFlashSale ? 'FLASH' : 'SALE'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm lg:text-base text-gray-900 truncate">
                      {currentProduct.promotionProducts[0].promotion.name}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 mt-0.5">
                      Kết thúc: {new Date(currentProduct.promotionProducts[0].promotion.endTime).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg font-bold text-sm lg:text-base">
                    {currentProduct.promotionProducts[0].discountType === "PERCENT"
                      ? `-${currentProduct.promotionProducts[0].discountValue}%`
                      : `-${currentProduct.promotionProducts[0].discountValue.toLocaleString()}đ`}
                  </div>
                </div>
              </div>
            )}

            {/* Gift Section */}
            {currentProduct.promotionProducts && 
             currentProduct.promotionProducts.length > 0 && 
             currentProduct.promotionProducts[0].giftProduct && (
              <div className="mb-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl lg:rounded-2xl p-3 lg:p-5 border border-pink-200">
                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                  <Gift className="w-4 h-4 lg:w-5 lg:h-5 text-pink-600" />
                  <span className="font-bold text-sm lg:text-base text-gray-900">
                    Quà tặng kèm
                  </span>
                  <span className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs lg:text-sm font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full">
                    MIỄN PHÍ
                  </span>
                </div>
                <div className="flex items-center gap-3 lg:gap-4 bg-white rounded-lg lg:rounded-xl p-2 lg:p-3">
                  <div className="relative w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-lg overflow-hidden border border-pink-200">
                    <img 
                      src={getImageUrl(currentProduct.promotionProducts[0].giftProduct.thumb) || ''}
                      alt={currentProduct.promotionProducts[0].giftProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1 lg:px-2 py-0.5 rounded-bl-lg">
                      x{currentProduct.promotionProducts[0].giftQuantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm lg:text-base truncate">
                      {currentProduct.promotionProducts[0].giftProduct.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs lg:text-sm text-gray-500 line-through">
                        {currentProduct.promotionProducts[0].giftProduct.basePrice.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price Card */}
            {currentProduct.promotionProducts && currentProduct.promotionProducts.length > 0 ? (
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-yellow-400 text-red-800 text-xs font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow">
                  {currentProduct.promotionProducts[0].promotion.name}
                </div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <span className="text-xs lg:text-sm font-medium opacity-90">Giá gốc:</span>
                  <span className="text-sm lg:text-base line-through opacity-70">
                    {originalPrice.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex items-baseline gap-2 lg:gap-3">
                  <span className="text-sm lg:text-base font-medium opacity-90">Giá khuyến mãi:</span>
                  <span className="text-3xl lg:text-5xl font-black">{finalPrice.toLocaleString()}</span>
                  <span className="text-lg lg:text-xl font-bold">VNĐ</span>
                </div>
                <div className="mt-2 lg:mt-3 flex items-center gap-1 lg:gap-2">
                  <span className="bg-white/30 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm font-bold">
                    {currentProduct.promotionProducts[0].discountType === "PERCENT"
                      ? `-${currentProduct.promotionProducts[0].discountValue}%`
                      : `-${currentProduct.promotionProducts[0].discountValue.toLocaleString()}đ`}
                  </span>
                  <span className="text-xs lg:text-sm opacity-80">
                    Tiết kiệm: {(originalPrice - finalPrice).toLocaleString()}đ
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white">
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="text-sm lg:text-base font-medium">Giá bán:</span>
                  <span className="text-xl lg:text-2xl font-bold">Liên hệ: 0903 776 456</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-3 lg:pt-4">
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={isAdding}
                loading={isAdding}
                className="w-full !h-12 lg:!h-14 !rounded-xl !text-base lg:!text-lg font-semibold !bg-gradient-to-r !from-green-600 !to-green-700 hover:!from-green-700 hover:!to-green-800 !border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2">
                  {isAdding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang thêm vào giỏ...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                      <span>Thêm vào giỏ hàng</span>
                    </>
                  )}
                </div>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-200">
              <div className="text-center p-2 lg:p-3 bg-green-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg mb-1 lg:mb-2">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                </div>
                <div className="text-xs font-medium text-gray-900">Chính hãng</div>
              </div>
              <div className="text-center p-2 lg:p-3 bg-blue-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg mb-1 lg:mb-2">
                  <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                </div>
                <div className="text-xs font-medium text-gray-900">Giao nhanh</div>
              </div>
              <div className="text-center p-2 lg:p-3 bg-purple-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg mb-1 lg:mb-2">
                  <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                </div>
                <div className="text-xs font-medium text-gray-900">Đổi trả</div>
              </div>
              <div className="text-center p-2 lg:p-3 bg-orange-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg mb-1 lg:mb-2">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-900">Đảm bảo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 lg:mt-8 mb-6 lg:mb-8">
          <Tabs
            defaultActiveKey="description"
            size="middle"
            className="bg-white rounded-xl lg:rounded-2xl shadow-sm border p-2 lg:p-4"
            items={[
              {
                key: "description",
                label: <span className="font-semibold text-sm lg:text-base">📝 Mô tả sản phẩm</span>,
                children: (
                  <div className="pt-3 lg:pt-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentProduct.description || 
                          '<div class="text-gray-500 text-center py-6 lg:py-8">Chưa có mô tả chi tiết cho sản phẩm này.</div>',
                      }}
                      className="prose max-w-none text-gray-700 text-sm lg:text-base"
                    />
                  </div>
                ),
              },
              {
                key: "policy",
                label: <span className="font-semibold text-sm lg:text-base">📋 Chính sách</span>,
                children: (
                  <div className="space-y-4 lg:space-y-6 pt-3 lg:pt-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-green-200">
                      <div className="flex items-center gap-2 mb-2 lg:mb-3">
                        <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        <Title level={4} className="!mb-0 !text-sm lg:!text-base">Chính sách vận chuyển</Title>
                      </div>
                      <Paragraph className="!mb-0 text-gray-700 text-sm lg:text-base">
                        Giao hàng nhanh chóng và an toàn, từ 2-5 ngày làm việc. Miễn phí vận chuyển cho đơn hàng trên 500.000đ.
                      </Paragraph>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2 lg:mb-3">
                        <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        <Title level={4} className="!mb-0 !text-sm lg:!text-base">Chính sách đổi trả</Title>
                      </div>
                      <Paragraph className="!mb-0 text-gray-700 text-sm lg:text-base">
                        Hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.
                      </Paragraph>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

      </div>

      {/* Login Modal */}
      <Modal
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        onOk={() => {
          setIsLoginModalOpen(false);
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        }}
        okText="Đăng nhập ngay"
        cancelText="Để sau"
        centered
        className="rounded-2xl"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
          <Title level={4} className="!mb-2 !text-gray-900">Đăng nhập để tiếp tục</Title>
          <p className="text-gray-600 mb-6 text-sm lg:text-base">
            Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng và mua sắm.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Sản phẩm đã chọn:</p>
            <p className="font-bold text-gray-800 truncate">{currentProduct.name}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}