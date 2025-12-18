"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Factory,
  Shield,
  Truck,
  Globe,
  Award,
  CheckCircle,
  Users,
  Package,
  Clock,
  ThumbsUp,
  BadgeCheck,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function IndustrialHero() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const tabs = [
    { id: 0, name: "DÂY ĐAI CÔNG NGHIỆP", color: "from-emerald-600 to-teal-500" },
    { id: 1, name: "DÂY COTTON & THUN", color: "from-blue-600 to-cyan-500" },
    { id: 2, name: "DÂY DỆT ĐẶC BIỆT", color: "from-violet-600 to-purple-500" }
  ];

  const products = [
    {
      id: 1,
      title: "Dây Đai PP 75mm",
      category: "Vận chuyển & Logistics",
      description: "Độ bền cao, chịu lực tốt, phù hợp đóng gói pallet",
      specs: ["Chịu lực: 2.5T", "Màu sắc: Đa dạng", "Chứng chỉ: REACH"],
      color: "emerald",
      image: "PP_75mm",
      popular: true
    },
    {
      id: 2,
      title: "Dây Đai Cotton 50mm",
      category: "Thời trang & Nội thất",
      description: "Mềm mại, thân thiện với da, không phai màu",
      specs: ["Chất liệu: 100% Cotton", "Co giãn 2 chiều", "An toàn sức khỏe"],
      color: "blue",
      image: "Cotton_50mm",
      featured: true
    },
    {
      id: 3,
      title: "Dây Đai Phản Quang",
      category: "An toàn & Cảnh báo",
      description: "Phản quang cao, cảnh báo từ xa, độ bền vượt trội",
      specs: ["Phản quang 360°", "Chống UV", "Chống thấm nước"],
      color: "violet",
      image: "Reflective",
      new: true
    }
  ];

  const stats = [
    { value: "15+", label: "Năm kinh nghiệm", icon: Award, color: "text-emerald-600" },
    { value: "500+", label: "Khách hàng doanh nghiệp", icon: Users, color: "text-blue-600" },
    { value: "10K+", label: "Đơn hàng thành công", icon: Package, color: "text-cyan-600" },
    { value: "99%", label: "Tỷ lệ hài lòng", icon: ThumbsUp, color: "text-violet-600" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Chất lượng ISO",
      description: "Đạt tiêu chuẩn quốc tế REACH/ROHS",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Factory,
      title: "Sản xuất trực tiếp",
      description: "Không qua trung gian, giá tốt nhất",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh",
      description: "Hỗ trợ vận chuyển toàn quốc",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Globe,
      title: "Xuất khẩu toàn cầu",
      description: "Đã xuất khẩu 15+ quốc gia",
      gradient: "from-violet-500 to-violet-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = scrollY * 0.3;

  return (
    <div ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Animated background elements - Nhẹ hơn */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${parallaxY * 0.5}px)`
          }}
        />
        
        {/* Subtle gradient orbs */}
        <div className="absolute -top-40 -right-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-cyan-100/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay - Mờ hơn */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                           linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* PADDING ĐIỀU CHỈNH */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        {/* Grid layout - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left content - Mobile full width, Desktop 50% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-teal-100 backdrop-blur-sm rounded-full border border-emerald-200">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-800">NHÀ SẢN XUẤT HÀNG ĐẦU</span>
            </div>

            {/* Main heading - CHỮ NHỎ HƠN */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-tight">
              <span className="text-gray-900">SẢN XUẤT</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                DÂY ĐAI CÔNG NGHIỆP
              </span>
              <br />
              <span className="text-gray-800">CHẤT LƯỢNG CAO</span>
            </h1>

            {/* Decorative line */}
            <div className="flex items-center gap-2 sm:gap-3 pt-2">
              <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
              <div className="h-1 w-4 sm:w-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
              <div className="h-1 w-2 sm:w-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
            </div>

            {/* Description - CHỮ NHỎ HƠN */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
              Chuyên sản xuất và cung cấp các loại dây đai công nghiệp với đầy đủ chứng chỉ REACH/ROHS. Giải pháp tối ưu cho vận chuyển, đóng gói và sản xuất.
            </p>

            {/* CTA Buttons - Stack on mobile, inline on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => router.push('/san-pham')}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center gap-3"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">XEM DANH MỤC SẢN PHẨM</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => window.open('tel:0903776456', '_blank')}
                className="group px-6 py-3 sm:px-8 sm:py-4 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 font-bold rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm opacity-80">HOTLINE 24/7</div>
                  <div className="text-emerald-700 text-sm sm:text-base">0903 776 456</div>
                </div>
              </button>
            </div>

            {/* Stats - Grid responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-3 sm:p-4 text-center hover:bg-white transition-all duration-300 shadow-sm"
                >
                  <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 ${stat.color}`} />
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Product showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 sm:mt-10 lg:mt-0"
          >
            {/* Main product card - NỀN SÁNG HƠN */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden group">
              {/* 3D effect background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-blue-100/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.1),transparent_50%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                {/* Tabs - Responsive */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                {/* Product showcase */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                          {products[activeTab].title}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1 bg-emerald-50 backdrop-blur-sm rounded-full">
                          <span className="text-xs sm:text-sm text-emerald-700">{products[activeTab].category}</span>
                        </div>
                      </div>
                      {products[activeTab].popular && (
                        <div className="px-2.5 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs sm:text-sm font-bold text-white">
                          BÁN CHẠY
                        </div>
                      )}
                    </div>

                    {/* Product description - CHỮ NHỎ HƠN */}
                    <p className="text-sm sm:text-base text-gray-600">
                      {products[activeTab].description}
                    </p>

                    {/* Specifications */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="text-xs sm:text-sm text-gray-500">THÔNG SỐ KỸ THUẬT</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {products[activeTab].specs.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gray-50 rounded-lg"
                          >
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                            <span className="text-xs sm:text-sm text-gray-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4">
                      <button
                        onClick={() => router.push('/san-pham')}
                        className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <span>XEM CHI TIẾT</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => window.open('tel:0903776456', '_blank')}
                        className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base shadow-sm"
                      >
                        BÁO GIÁ NGAY
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Decorative elements */}
                <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl" />
                <div className="absolute -top-5 sm:-top-10 -left-5 sm:-left-10 w-20 h-20 sm:w-40 sm:h-40 bg-blue-200/20 rounded-full blur-3xl" />
              </div>

              {/* 3D effect border */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-200/30 via-transparent to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating certification badges - Responsive positioning */}
            <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 z-20">
              <div className="relative">
                <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg shadow-lg sm:shadow-2xl transform rotate-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm md:text-base">ISO 9001:2015</span>
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-ping" />
              </div>
            </div>

            <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:-left-4 z-20">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg shadow-lg sm:shadow-2xl transform -rotate-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">REACH/ROHS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 lg:mt-20 xl:mt-28"
        >
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              VÌ SAO CHỌN CHÚNG TÔI?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Cam kết chất lượng và dịch vụ vượt trội trong ngành dây đai công nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:border-gray-300 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" style={{
                  backgroundImage: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, transparent)`
                }} />

                <div className="relative z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {feature.description}
                  </p>
                  
                  {/* Animated arrow */}
                  <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-emerald-600">
                      <span>Tìm hiểu thêm</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${feature.gradient} transform rotate-45 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 xl:mt-28"
        >
          <div className="relative bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-cyan-100/20 to-blue-100/20" />
            
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                    Cần tư vấn kỹ thuật hoặc báo giá?
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                    Đội ngũ kỹ sư của chúng tôi sẵn sàng hỗ trợ bạn 24/7 với giải pháp tối ưu nhất.
                  </p>
                  <div className="space-y-2 sm:space-y-3 pt-2">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base">Thời gian làm việc: 7:30 - 17:30 (Thứ 2 - Thứ 7)</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base">Email: info@webbingvietnam.com</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base">Địa chỉ: KCN Biên Hòa, Đồng Nai</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-auto space-y-3 sm:space-y-4">
                  <button
                    onClick={() => window.open('tel:0903776456', '_blank')}
                    className="w-full sm:w-auto lg:w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 shadow-md"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <div className="text-left">
                      <div className="text-xs sm:text-sm opacity-90">HOTLINE HỖ TRỢ</div>
                      <div className="text-sm sm:text-base md:text-lg">0903 776 456</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => router.push('/lien-he')}
                    className="w-full sm:w-auto lg:w-full py-3 sm:py-4 bg-white border border-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base px-6 shadow-sm"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>GỬI YÊU CẦU QUA EMAIL</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Animated elements */}
            <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-emerald-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-200/30 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-500">Cuộn xuống</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}