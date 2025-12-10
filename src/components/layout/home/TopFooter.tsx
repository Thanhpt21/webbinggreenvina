"use client";

import Link from "next/link";
import Image from "next/image";
import { Factory, Award, Users, Truck, Globe, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutAndWhyChooseUs() {
  const features = [
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Máy móc hiện đại",
      description: "Nhập khẩu 100% từ Hàn Quốc, công nghệ tiên tiến",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Chất lượng cao",
      description: "Sản phẩm đạt chuẩn quốc tế, đa dạng màu sắc",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tư vấn miễn phí",
      description: "Thiết kế mẫu và hỗ trợ khách hàng tận tình",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Giao hàng nhanh",
      description: "Đảm bảo tiến độ và thời gian giao hàng",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <>
      {/* Features Section - Tại sao chọn chúng tôi */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-4">
              <Award className="w-4 h-4" />
              Ưu điểm
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cam kết mang đến giá trị và chất lượng tốt nhất cho khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-green-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className={`inline-flex bg-gradient-to-br ${feature.color} w-14 h-14 rounded-2xl items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section - Về chúng tôi */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/image/gt1.jpg"
                alt="Nhà máy sản xuất Webbing Green Vina"
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 font-medium text-sm mb-4">
                <Globe className="w-4 h-4" />
                Về chúng tôi
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Webbing Green Vina Co., Ltd
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Công ty TNHH WEBBING GREEN VINA chuyên sản xuất và cung cấp các loại dây đai dệt như: 
                Dây đai phục vụ cho các ngành 
                phụ liệu may mặc, ba lô, túi xách, giày dép...
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Với phương châm hoạt động <strong>"CHỦ TÍN - CHẤT LƯỢNG - TẬN TÌNH"</strong>, 
                chúng tôi luôn mong muốn được mang tới Quý khách hàng những sản phẩm có chất lượng cao và thẩm mỹ.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Máy móc nhập khẩu 100% từ Hàn Quốc</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Sản phẩm đa dạng màu sắc và kích thước</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Tư vấn thiết kế mẫu miễn phí</span>
                </div>
              </div>

              <Link
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg"
              >
                Xem thêm
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}