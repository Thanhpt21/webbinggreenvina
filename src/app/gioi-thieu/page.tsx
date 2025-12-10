"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Giới thiệu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header với background xanh */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 md:p-10 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            GIỚI THIỆU
          </h1>
          
          <div className="space-y-4 text-white text-sm md:text-base leading-relaxed">
            <p>
              Công ty TNHH WEBBING GREEN VINA chuyên sản xuất và cung cấp các loại dây đai dệt như: Dây đai, dây cầu, dây giày, dây thun rằn, dây thun y tế, v.v..phục vụ cho các ngành 
              phụ liệu may mặc, ba lô, túi xách, giày dép...Sản phẩm đa dạng về màu mã, kích thước, mẫu sắc đáp ứng mọi yêu cầu của khách hàng.
            </p>

            <p>
              Tất cả máy móc sản xuất nhập khẩu 100% từ Hàn Quốc cùng tôi luôn cung cấp các sản phẩm có chất lượng cao cho Quý khách hàng
            </p>

            <p>
              Công ty TNHH WEBBING GREEN VINA sẵn sàng tư vấn thiết kế mẫu miễn phí về các loại dây dệt và đưa ra những giải pháp lựa chọn sản phẩm phù hợp, đem lại hiệu quả cao nhất 
              cho khách hàng.
            </p>

            <p>
              Với phương châm hoat động "CHỦ TÍN - CHẤT LƯỢNG - TẬN TÌNH". Công ty TNHH WEBBING GREEN VINA luôn mong muốn được mang tới Quý khách hàng những sản phẩm có 
              chất lượng cao và thẩm mỹ.
            </p>

            <p className="font-semibold">
              Rất mong nhận được sự quan tâm và hợp tác của Quý khách hàng!
            </p>

            <div className="mt-6 space-y-2">
              <p className="font-bold text-lg">Mọi chi tiết vui lòng liên hệ:</p>
              <p className="font-semibold">Webbing Green Vina Co., Ltd</p>
              <p>Văn Phòng : 206/24 Tân xuân 2, Ấp Chánh 1, Xã Tân Xuân, Huyện Hóc Môn, TP.HCM</p>
              <p>Nhà Máy: số 122 Nguyễn Thị Lắng, Tân Phú Trung,Huyện Củ Chi, Tp.HCM</p>
              <p>Tài Khoản: 941818 Ngân Hàng TPCP Á Châu ( ACB Bank), chi nhánh HCM</p>
              <p>MST: 0314974846</p>
              <p>ĐT : +84. 28. 3636 1435 Fax: +84. 28. 3636 7418</p>
              <p>Hotline: 0903 776 456 Mr. Johnny Khanh - Email: johnny@webbinggreenvina.com - webbinggreenvina@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Timeline Image */}
        <div className="mb-8">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/image/gt1.jpg"
              alt="Company Timeline"
              fill
              priority
              style={{ objectFit: "contain" }}
              className="bg-white"
            />
          </div>
        </div>

        {/* Company Profile Image */}
        <div className="mb-8">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/image/gt2.jpg"
              alt="Company Profile"
              fill
              style={{ objectFit: "contain" }}
              className="bg-white"
            />
          </div>
        </div>

        {/* Additional Images - Thẳng hàng */}
        <div className="space-y-6">
          {[3, 4, 5, 6, 7].map((num) => (
            <div
              key={num}
              className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={`/image/gt${num}.jpg`}
                alt={`Company Image ${num}`}
                fill
                style={{ objectFit: "contain" }}
                className="bg-white"
              />
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Video giới thiệu
          </h2>
          
          {/* Video 1 */}
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/M4iTg7SPzCk"
              title="Sản xuất dây đai, dây niềng | dây đai PP | dây đai Cotton | Dây đai Polyester"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Video 2 */}
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/i3ySx-uCEDE"
              title="Sản xuất dây đai, dây niềng | dây đai Cotton | dây đai dệt Spun| Dây đai Polyester"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Video 3 */}
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/8avR8JORTeE"
              title="Sản xuất dây đai, dây niềng | dây đai PP | dây đai Cotton | dây đai dệt Spun"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Video 4 */}
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/CkY_62z1Ux0"
              title="Quá trình sản xuất dây đai - dây niềng"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}