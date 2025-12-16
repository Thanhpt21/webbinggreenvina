"use client";

import { Menu, Dropdown, Spin, Avatar, Drawer, Collapse, Popover, Badge } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  LogoutOutlined,
  SettingOutlined,
  FireOutlined,
  GiftOutlined,
  StarOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  RightOutlined,
  GlobalOutlined,
  ExportOutlined,
  TrophyOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  PhoneOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Config } from "@/types/config.type";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/utils/getImageUrl";
import { formatVND } from "@/utils/helpers";
import { useCartStore } from "@/stores/cartStore";
import { useAllCategories } from "@/hooks/category/useAllCategories";
import CartPreviewDropdown from "@/components/layout/cart/CartPreviewDropdown";

const { Panel } = Collapse;

interface HeaderProps {
  config: Config;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  thumb?: string;
}

// ==================== MARQUEE BANNER - HIỂN THỊ CHỨNG CHỈ & THÀNH TỰU ====================
const MarqueeBanner = () => {
  const messages = [
    // Chứng chỉ chất lượng
    { text: "✅ CHỨNG NHẬN ISO 9001:2015 - HỆ THỐNG QUẢN LÝ CHẤT LƯỢNG", color: "text-blue-500" },
    { text: "✅ CHỨNG NHẬN REACH & ROHS - ĐẠT TIÊU CHUẨN CHÂU ÂU", color: "text-green-500" },
    { text: "✅ SẢN PHẨM XUẤT KHẨU ĐI 20+ QUỐC GIA TRÊN THẾ GIỚI", color: "text-purple-500" },
  
    
    // Dịch vụ
    { text: "🚚 GIAO HÀNG TOÀN QUỐC - NHẬN HÀNG TRONG 24H", color: "text-pink-500" },
    { text: "📞 HOTLINE TƯ VẤN KỸ THUẬT 24/7: 0903.776.456", color: "text-teal-500" },
    { text: "💼 NHẬN SẢN XUẤT THEO YÊU CẦU - THIẾT KẾ RIÊNG", color: "text-amber-500" },
  ];

  return (
    <div className="bg-gradient-to-r from-[#097761] to-[#0a8f78] text-white overflow-hidden border-b border-[#097761]/30">
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="flex space-x-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <SafetyCertificateOutlined className="text-xl" />
                <RocketOutlined className="text-xl" />
                <TrophyOutlined className="text-xl" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative py-2.5">
          <div className="flex items-center">
            {/* Fixed label */}
            <div className="flex items-center px-4 py-1 bg-white/20 backdrop-blur-sm rounded-r-lg mr-4 flex-shrink-0 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 font-bold text-xs md:text-sm">
                <FireOutlined className="text-yellow-300 animate-pulse" />
                <span className="hidden sm:inline">WEBBING GREEN VINA</span>
                <span className="sm:hidden">WGV</span>
              </div>
            </div>
            
            {/* Marquee content */}
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {messages.concat(messages).map((msg, index) => ( // Duplicate for seamless loop
                  <div
                    key={index}
                    className="flex items-center gap-3 mx-4 md:mx-6 text-xs md:text-sm font-medium"
                  >
                  
                    <span className="text-white font-semibold">{msg.text}</span>
                    
                    {/* Separator */}
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="hidden lg:flex items-center gap-2 px-4 flex-shrink-0">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PRODUCT DROPDOWN MENU - CẬP NHẬT MÀU ====================
const ProductDropdownMenu = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getHrefWithParams = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set('categoryId', categoryId.toString());
    params.delete('search');
    params.delete('brandId');
    params.delete('hasPromotion');
    params.delete('isFeatured');
    params.delete('page');
    return `/san-pham?${params.toString()}`;
  };

  const handleCategoryClick = (categoryId: number, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('categoryId', categoryId.toString());
    params.delete('search');
    params.delete('brandId');
    params.delete('hasPromotion');
    params.delete('isFeatured');
    params.delete('page');
    router.push(`/san-pham?${params.toString()}`);
  };

  return (
    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[320px] max-w-[400px]">
        <div className="max-h-[500px] overflow-y-auto">
          {categories.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={getHrefWithParams(category.id)}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 group/item cursor-pointer block"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={getImageUrl(category.thumb) || "/images/no-image.png"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      unoptimized
                      sizes="40px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-[#097761] transition-colors line-clamp-1">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Xem sản phẩm
                    </div>
                  </div>

                  <RightOutlined className="text-gray-400 text-xs group-hover/item:text-[#097761] transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="text-gray-500 text-sm">Không có danh mục nào</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== SEARCH BAR COMPONENT - CẬP NHẬT MÀU ====================
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const { data: categories } = useAllCategories();
  const displayCategories = categories?.slice(0, 8) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchValue.trim());
      params.delete('categoryId');
      params.delete('brandId');
      params.delete('hasPromotion');
      params.delete('isFeatured');
      params.delete('page');
      router.push(`/san-pham?${params.toString()}`);
      setIsFocused(false);
      setSearchValue("");
    }
  };

  const getCategoryHref = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set('categoryId', categoryId.toString());
    params.delete('search');
    params.delete('brandId');
    params.delete('hasPromotion');
    params.delete('isFeatured');
    params.delete('page');
    return `/san-pham?${params.toString()}`;
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full h-10 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#097761] focus:border-transparent bg-gray-50 hover:bg-white transition-all"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#097761] transition-colors">
          <SearchOutlined className="text-base" />
        </button>
      </form>

      {(isFocused || searchValue) && displayCategories.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
          <div className="p-4">
            <div className="text-xs font-medium text-gray-500 mb-2">Gợi ý tìm kiếm</div>
            <div className="flex flex-wrap gap-2">
              {displayCategories.map((category: any) => (
                <Link
                  key={category.id}
                  href={getCategoryHref(category.id)}
                  onClick={() => setIsFocused(false)}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:text-[#097761] hover:bg-[#097761]/10 rounded-md transition-colors border border-gray-200 hover:border-[#097761]/30"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== HEADER COMPONENT - CẬP NHẬT MÀU CHỦ ĐẠO ====================
const Header = ({ config }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { currentUser, isLoading: isAuthLoading } = useAuth();
  const { logoutUser, isPending: isLogoutPending } = useLogout();
  const isLoggedInUI = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  const { data: categories, isLoading: isCategoriesLoading } = useAllCategories();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileCartOpen(false);
    setIsCartPopoverOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleLogout = () => logoutUser();
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const userDropdownMenuItems = [
    isAuthLoading
      ? { key: "loading", label: <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} />, disabled: true }
      : isLoggedInUI
      ? [
          { key: "account", label: <Link href="/tai-khoan" className="flex items-center gap-2">Tài khoản</Link> },
          isAdmin && { key: "admin", label: <Link href="/admin" className="flex items-center gap-2">Quản trị</Link> },
          { key: "logout", label: <span onClick={handleLogout} className="flex items-center gap-2 text-red-600 cursor-pointer">{isLogoutPending ? <Spin indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />} /> : <>Đăng xuất</>}</span> },
        ]
      : [{ key: "login", label: <Link href="/login">Đăng nhập</Link> }],
  ];

  const filteredUserDropdownMenuItems = userDropdownMenuItems.flat().filter((item) => item !== false);
  const userDropdownMenu = <Menu items={filteredUserDropdownMenuItems} className="!rounded-lg !shadow-lg !border !border-gray-100 !py-2" />;

  const mainMenuItems = [
    { label: "Trang chủ", href: "/", hasDropdown: false },
    { label: "Sản phẩm", href: "/san-pham", hasDropdown: true },
    { label: "Về chúng tôi", href: "/gioi-thieu", hasDropdown: false },
    { label: "Tin tức", href: "/tin-tuc", hasDropdown: false },
    { label: "Liên hệ", href: "/lien-he", hasDropdown: false },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const CartButton = (
    <Link 
      href="/gio-hang"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <ShoppingCartOutlined className="text-lg text-gray-700" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-[#097761] text-white text-xs font-bold rounded-full">
          {cartItemCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Marquee Banner */}
      <MarqueeBanner />

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold text-[#097761]">{config?.name || "Webbing Green Vina"}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 mx-8">
              {mainMenuItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href) 
                        ? "text-[#097761]" 
                        : "text-gray-700 hover:text-[#097761]"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Active Underline */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    isActive(item.href) 
                      ? "w-full bg-[#097761]" 
                      : "w-0 group-hover:w-full bg-[#097761]/70"
                  }`} />

                  {/* Dropdown Menu for Products */}
                  {item.hasDropdown && categories && categories.length > 0 && (
                    <ProductDropdownMenu categories={categories} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Desktop Search - Always visible */}
              <div className="hidden lg:block">
                <SearchBar />
              </div>

              {/* Mobile Search Toggle */}
              <button 
                onClick={toggleSearch}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSearchOpen ? (
                  <CloseOutlined className="text-lg text-gray-700" />
                ) : (
                  <SearchOutlined className="text-lg text-gray-700" />
                )}
              </button>

              {CartButton}

              {/* User Menu */}
              <div className="hidden md:block">
                {isLoggedInUI ? (
                  <Dropdown 
                    overlay={userDropdownMenu} 
                    trigger={["click"]} 
                    placement="bottomRight"
                  >
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50" 
                      disabled={isAuthLoading || isLogoutPending}
                    >
                      {isLogoutPending ? (
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                      ) : currentUser?.avatar ? (
                        <Avatar src={getImageUrl(currentUser.avatar)} size={32} />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          <UserOutlined className="text-sm" />
                        </div>
                      )}
                    </button>
                  </Dropdown>
                ) : (
                  <Link href="/login">
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        <UserOutlined className="text-sm" />
                      </div>
                    </button>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MenuOutlined className="text-lg text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-20 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}>
            <div className="pt-3 border-t border-gray-100">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mounted && (
        <Drawer
          title={<span className="font-bold text-[#097761]">Menu</span>}
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={280}
          closeIcon={<CloseOutlined className="text-gray-600" />}
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 py-2 overflow-y-auto">
              {/* Menu Links */}
              {mainMenuItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown && categories && categories.length > 0 ? (
                    <Collapse ghost expandIconPosition="end" className="mobile-menu-collapse">
                      <Panel 
                        header={
                          <span className={`text-sm font-medium ${
                            isActive(item.href) ? "text-[#097761]" : "text-gray-700"
                          }`}>
                            {item.label}
                          </span>
                        } 
                        key="1" 
                        className="border-0"
                      >
                        {isCategoriesLoading ? (
                          <div className="flex justify-center py-4"><Spin size="small" /></div>
                        ) : (
                          <div className="space-y-1 pl-4">
                            {categories.map((category: any) => (
                              <Link
                                key={category.id}
                                href={`/san-pham?categoryId=${category.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-[#097761] hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </Panel>
                    </Collapse>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href) 
                          ? "text-[#097761] bg-[#097761]/10" 
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* User Section */}
              <div className="mt-6 px-4 pb-6">
                {isLoggedInUI ? (
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      {currentUser?.avatar ? (
                        <Avatar src={getImageUrl(currentUser.avatar)} size={40} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          <UserOutlined className="text-lg" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{currentUser?.name || "Người dùng"}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">{currentUser?.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/tai-khoan"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <UserOutlined /> Tài khoản
                    </Link>
                    
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <SettingOutlined /> Quản trị
                      </Link>
                    )}

                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors text-left"
                    >
                      {isLogoutPending ? <Spin size="small" /> : <><LogoutOutlined /> Đăng xuất</>}
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 bg-[#097761] text-white text-sm font-bold rounded-lg hover:bg-[#086a57] transition-colors"
                    >
                      Đăng nhập / Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </Drawer>
      )}

      {/* Mobile Cart Drawer */}
      {mounted && (
        <Drawer
          title={
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-bold flex items-center gap-2 text-[#097761]">
                <ShoppingCartOutlined /> Giỏ hàng ({cartItemCount})
              </span>
            </div>
          }
          width="100%"
          placement="right"
          onClose={() => setIsMobileCartOpen(false)}
          open={isMobileCartOpen}
          closeIcon={<CloseOutlined className="text-gray-600" />}
          bodyStyle={{ padding: 0 }}
          headerStyle={{ padding: "16px" }}
        >
          <CartPreviewDropdown
            items={cartItems as any[]}
            isLoading={false}
            getImageUrl={(url?: string) => getImageUrl(url) as string}
            formatVND={formatVND}
          />
        </Drawer>
      )}

      <style jsx global>{`
        .mobile-menu-collapse .ant-collapse-header {
          padding: 12px 16px !important;
        }
        .mobile-menu-collapse .ant-collapse-content-box {
          padding: 8px 0 !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .ant-popover-arrow {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default Header;