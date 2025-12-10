"use client";

import { Card, Tooltip, Image } from "antd";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import { Product } from "@/types/product.type";
import { formatVND } from "@/utils/helpers";
import { TrendingUp } from "lucide-react";

interface ProductCardFeaturedProps {
  product: Product;
  index?: number;
}

export default function ProductCardFeatured({ product: p, index = 0 }: ProductCardFeaturedProps) {
  const thumbUrl = getImageUrl(p.thumb ?? null);

  return (
    <div
      className="group relative animate-in fade-in zoom-in duration-500"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card
        className="relative bg-white rounded-3xl border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
        bodyStyle={{ padding: "12px" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none"></div>

        {/* Badge HOT (top 4) */}
        {index < 4 && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>HOT</span>
          </div>
        )}

        {/* Image */}
        <Link href={`/san-pham/${p.slug}`}>
          <div className="relative w-full overflow-hidden rounded-2xl mb-5">
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
            
            <Image
              src={thumbUrl || "/images/no-image.png"}
              alt={p.name}
              preview={false}
              className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              style={{
                backgroundColor: "transparent"
              }}
            />
          </div>
        </Link>

        {/* Info */}
        <div className="space-y-0.5 relative z-10">
          <Link href={`/san-pham/${p.slug}`}>
            <h5 className="font-bold text-gray-900 text-sm sm:text-base leading-tight cursor-pointer line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
              <Tooltip title={p.name}>{p.name}</Tooltip>
            </h5>
          </Link>

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex-1">
              <p className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">Liên hệ</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}