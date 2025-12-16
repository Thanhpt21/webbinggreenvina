'use client';

import { Table, Button, InputNumber, Image, Breadcrumb, Modal, message, Checkbox, Empty, Card } from 'antd';
import { DeleteOutlined, HomeOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined, PhoneOutlined, CopyOutlined } from '@ant-design/icons';
import { useState, useEffect, useTransition, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { useRemoveCartItem } from '@/hooks/cart/useRemoveCartItem';
import { useUpdateCartItem } from '@/hooks/cart/useUpdateCartItem';
import { useAllAttributes } from '@/hooks/attribute/useAllAttributes';
import { useAttributeValues } from '@/hooks/attribute-value/useAttributeValues';
import { getImageUrl } from '@/utils/getImageUrl';
import { formatVND } from '@/utils/helpers';
import { useMyCart } from '@/hooks/cart/useMyCart';
import { useCartStore } from '@/stores/cartStore';

const ShoppingCart = () => {
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  
  const {
    items,
    getTotalPrice,
    updateQuantityOptimistic,
    removeItemOptimistic,
    selectedItems,
    setSelectedItems,
    clearCart,
    getSelectedTotal,
    toggleSelectItem,
    selectAll: selectAllFromStore,
    isSelectAll,
    getItemCount,
  } = useCartStore();
  
  const removeItemMutation = useRemoveCartItem();
  const updateItemMutation = useUpdateCartItem();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const { data: allAttributes } = useAllAttributes();
  const { data: allAttributeValues } = useAttributeValues();
  const { data: cartData, isLoading: cartLoading, error: cartError } = useMyCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectAll(isSelectAll());
  }, [selectedItems, items.length, isSelectAll]);

  const attributeMap = useMemo(() => {
    return allAttributes?.reduce((acc: Record<number, string>, attr: any) => {
      acc[attr.id] = attr.name;
      return acc;
    }, {} as Record<number, string>) ?? {};
  }, [allAttributes]);

  const attributeValueMap = useMemo(() => {
    return allAttributeValues?.data?.reduce((acc: Record<number, string>, val: any) => {
      acc[val.id] = val.value;
      return acc;
    }, {} as Record<number, string>) ?? {};
  }, [allAttributeValues]);

  const handleCheckboxChange = (itemId: number) => {
    toggleSelectItem(itemId);
  };

  const handleSelectAll = (checked: boolean) => {
    const allItemIds = items.map((item: any) => item.id);
    setSelectedItems(checked ? new Set(allItemIds) : new Set());
  };

  // Kiểm tra nếu là thiết bị di động
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  };

  // Copy số điện thoại vào clipboard
  const copyPhoneNumber = () => {
    const phoneNumber = '0903776456';
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        message.success('Đã sao chép số điện thoại: ' + phoneNumber);
      })
      .catch(() => {
        message.error('Không thể sao chép số điện thoại');
      });
  };

  // Xử lý liên hệ
  const handleContact = () => {
    if (selectedItems.size === 0) {
      message.warning('Vui lòng chọn ít nhất một sản phẩm để liên hệ');
      return;
    }

    const phoneNumber = '0903776456';
    
    if (isMobile()) {
      // Trên mobile: mở cuộc gọi
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // Trên desktop: hiển thị số điện thoại và nút copy
      setShowPhoneNumber(true);
      copyPhoneNumber();
    }
  };

  if (!mounted || authLoading || cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">Lỗi tải giỏ hàng: {(cartError as any).message}</p>
        </div>
      </div>
    );
  }

  const handleClearCart = () => {
    clearCart();
    message.success('Đã xóa toàn bộ giỏ hàng');
  };

  const handleRemoveItem = (item: any) => {
    startTransition(() => {
      removeItemOptimistic(item.id);
    });
  };

  const onChangeQuantity = (value: number | null, item: any) => {
    if (!value || value < 1 || value === item.quantity) return;

    startTransition(() => {
      updateQuantityOptimistic(item.id, value);
    });
  };

  const handleCheckoutClick = () => {
    if (!currentUser) {
      setIsLoginModalVisible(true);
      return;
    }
    
    if (selectedItems.size === 0) {
      message.warning('Vui lòng chọn ít nhất một sản phẩm để đặt hàng');
      return;
    }
    
    router.push('/dat-hang');
  };

  const renderAttributes = (attrValues: Record<string, any>) => {
    if (!attrValues || Object.keys(attrValues).length === 0) return 'Không có thuộc tính';
    return Object.entries(attrValues)
      .map(([attrId, valueId]) => {
        const attrName = attributeMap[Number(attrId)] || `ID: ${attrId}`;
        const valueName = attributeValueMap[Number(valueId)] || `ID: ${valueId}`;
        return `${attrName}: ${valueName}`;
      })
      .join(', ');
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      key: 'checkbox',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedItems.has(record.id)}
          onChange={() => handleCheckboxChange(record.id)}
        />
      ),
    },
    {
      title: 'Hình ảnh',
      key: 'thumb',
      render: (_: any, record: any) => {
        const thumb = record.variant?.thumb || record.variant?.product?.thumb;
        return (
          <div className="flex items-center gap-4">
            <Image
              src={getImageUrl(thumb) || '/placeholder.png'}
              alt={record.variant?.product?.name || 'Sản phẩm'}
              width={100}
              height={100}
              style={{ objectFit: 'cover', borderRadius: 12 }}
              preview={false}
              fallback="/placeholder.png"
              className="flex-shrink-0"
            />
            <div>
              <div className="font-semibold text-gray-900 mb-1">
                {record.variant?.product?.name || 'Sản phẩm không xác định'}
              </div>
              <div className="text-sm text-gray-500">
                {renderAttributes(record.variant?.attrValues)}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Button
            size="small"
            icon={<MinusOutlined />}
            disabled={record.quantity <= 1 || isPending}
            onClick={() => onChangeQuantity(record.quantity - 1, record)}
            className="!rounded-lg"
          />
          <InputNumber
            min={1}
            value={record.quantity}
            onChange={(v) => typeof v === 'number' && onChangeQuantity(v, record)}
            className="!w-14 text-center !rounded-lg"
            controls={false}
            disabled={isPending}
          />
          <Button
            size="small"
            icon={<PlusOutlined />}
            disabled={isPending}
            onClick={() => onChangeQuantity(record.quantity + 1, record)}
            className="!rounded-lg"
          />
        </div>
      ),
    },
    {
      title: 'Thành tiền',
      key: 'contact',
      width: 100,
      render: () => {
        return (
          <span className="font-semibold text-blue-600">
            Liên hệ
          </span>
        );
      },
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_: any, record: any) => (
        <Button
          danger
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record)}
          loading={isPending}
          className="!rounded-lg hover:!bg-red-50"
        />
      ),
    },
  ];

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 flex items-center gap-2 text-gray-600">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <HomeOutlined />
              <span>Trang chủ</span>
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Giỏ hàng</span>
          </div>

          <Card className="!rounded-3xl !border-2 shadow-lg">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="py-8">
                  <p className="text-xl font-semibold text-gray-700 mb-2">Giỏ hàng của bạn đang trống</p>
                  <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                  <Link href="/">
                    <Button type="primary" size="large" icon={<ShoppingCartOutlined />} className="!rounded-xl">
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto max-w-7xl md:px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-gray-600">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <HomeOutlined />
            <span>Trang chủ</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Giỏ hàng</span>
        </div>

        {/* Header - Desktop only */}
        <div className="hidden md:flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingCartOutlined className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Giỏ hàng của bạn
            </h1>
            <p className="text-gray-600">Bạn có {getItemCount()} sản phẩm trong giỏ hàng</p>
          </div>
        </div>

        {/* Header - Mobile */}
        <div className="md:hidden mb-4">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Giỏ hàng của bạn
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-sm">Bạn có {getItemCount()} sản phẩm</p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table
            rowKey="id"
            dataSource={items}
            columns={columns}
            pagination={false}
            className="!rounded-2xl !overflow-hidden shadow-md"
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          <div className="flex items-center gap-2 p-2 bg-white rounded-xl shadow-sm">
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span className="text-sm font-medium">Chọn tất cả</span>
          </div>
          
          {items.map((item: any) => {
            const thumb = item.variant?.thumb || item.variant?.product?.thumb;
            const promotion = item.variant.product.promotionProducts?.[0];
            const basePrice = item.priceAtAdd;
            let discountedPrice = basePrice;
            let discountText = '';

            if (promotion) {
              if (promotion.discountType === 'PERCENT') {
                discountedPrice = basePrice - (basePrice * promotion.discountValue) / 100;
                discountText = `${promotion.discountValue}%`;
              } else if (promotion.discountType === 'FIXED') {
                discountedPrice = basePrice - promotion.discountValue;
                discountText = formatVND(promotion.discountValue);
              }
            }

            return (
              <Card key={item.id} className="!rounded-xl shadow-sm !p-2">
                <div className="flex gap-2">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mt-1"
                  />
                  
                  <Image
                    src={getImageUrl(thumb) || '/placeholder.png'}
                    alt={item.variant?.product?.name || 'Sản phẩm'}
                    width={70}
                    height={70}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    preview={false}
                    fallback="/placeholder.png"
                    className="flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.variant?.product?.name || 'Sản phẩm không xác định'}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {renderAttributes(item.variant?.attrValues)}
                    </p>
                    
                    <div className="space-y-0.5 text-xs mb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá gốc:</span>
                        <span className="font-medium">{formatVND(basePrice)}</span>
                      </div>
                      {promotion && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Giảm giá:</span>
                            <span className="text-red-600 font-medium">{discountText}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Giá sau giảm:</span>
                            <span className="text-blue-600 font-semibold">{formatVND(discountedPrice)}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="small"
                          icon={<MinusOutlined />}
                          disabled={item.quantity <= 1 || isPending}
                          onClick={() => onChangeQuantity(item.quantity - 1, item)}
                          className="!rounded-lg !h-7 !w-7 !p-0"
                        />
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(v) => typeof v === 'number' && onChangeQuantity(v, item)}
                          className="!w-10 text-center !rounded-lg"
                          size="small"
                          controls={false}
                          disabled={isPending}
                        />
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          disabled={isPending}
                          onClick={() => onChangeQuantity(item.quantity + 1, item)}
                          className="!rounded-lg !h-7 !w-7 !p-0"
                        />
                      </div>
                      
                      <Button
                        danger
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(item)}
                        loading={isPending}
                        className="!rounded-lg"
                      />
                    </div>
                    
                    <div className="mt-1.5 pt-1.5 border-t flex justify-between items-center">
                      <span className="text-xs text-gray-600">Tổng:</span>
                      <span className="text-blue-600 font-bold text-sm">
                        Liên hệ
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 md:mt-8">
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="text-sm text-gray-600">
                Đã chọn: <span className="font-semibold">{selectedItems.size}</span> / {items.length} sản phẩm
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Nút liên hệ */}
                <Button
                  type="primary"
                  size="large"
                  icon={<PhoneOutlined />}
                  onClick={handleContact}
                  disabled={isPending || selectedItems.size === 0}
                  className="w-full md:w-auto md:min-w-48 !rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0"
                >
                  {isMobile() ? 'Gọi 0903776456' : 'Liên hệ 0903776456'}
                </Button>

                {/* Nút copy cho desktop khi đã hiển thị số */}
                {showPhoneNumber && !isMobile() && (
                  <Button
                    type="default"
                    size="large"
                    icon={<CopyOutlined />}
                    onClick={copyPhoneNumber}
                    className="w-full md:w-auto !rounded-xl"
                  >
                    Copy số
                  </Button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal đăng nhập */}
      <Modal
        title={<span className="text-xl font-bold">Yêu cầu đăng nhập</span>}
        open={isLoginModalVisible}
        onOk={() => router.push(`/login?returnUrl=${encodeURIComponent('/gio-hang')}`)}
        onCancel={() => setIsLoginModalVisible(false)}
        okText="Đăng nhập"
        cancelText="Hủy"
        centered
        className="modern-modal"
      >
        <p className="text-gray-600 py-4">Bạn cần đăng nhập để tiến hành thanh toán.</p>
      </Modal>
    </div>
  );
};

export default ShoppingCart;