"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Factory, Star, Package, Truck, Shield, Phone, ArrowRight, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const stats = [
    { number: "2005", label: "Thành lập", icon: <Star className="w-5 h-5" /> },
    { number: "1000+", label: "Khách hàng", icon: <Users className="w-5 h-5" /> },
    { number: "500+", label: "Sản phẩm", icon: <Package className="w-5 h-5" /> },
    { number: "100%", label: "Hài lòng", icon: <Shield className="w-5 h-5" /> }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Nhà sản xuất dây đai hàng đầu Việt Nam</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Chuyên sản xuất
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                  Dây đai
                </span>
                chất lượng cao
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Với máy móc nhập khẩu 100% từ Hàn Quốc, chúng tôi cam kết mang đến sản phẩm 
                dây đai đa dạng mẫu mã với chất lượng tốt nhất.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/products" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Xem sản phẩm
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0903776456" className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-blue-600 transition-all flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  0903 776 456
                </a>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Card - Stats & Features */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl opacity-20"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                      <Factory className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Webbing Production</div>
                      <div className="text-sm text-gray-500">Made in Vietnam</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Dây đai PP</span>
                        <span className="text-xs text-blue-600 font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Dây đai Cotton</span>
                        <span className="text-xs text-green-600 font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Dây dệt chữ</span>
                        <span className="text-xs text-purple-600 font-semibold">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Độ hài lòng khách hàng</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">+15% năm nay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}