"use client";

import React, { memo, useMemo } from 'react';
import Link from "next/link";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  GlobalOutlined,
  RightOutlined,
  ShoppingOutlined,
  HeartOutlined,
  StarOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { Config } from "@/types/config.type";

interface FooterProps {
  config: Config;
  isLoading?: boolean;
}

// Skeleton Components - Đổi màu skeleton cho phù hợp với nền xanh đậm
const FooterSkeleton = () => (
  <footer className="relative overflow-hidden bg-[#0a5c4b]">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-white/20 rounded w-32 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
          </div>
          
          <div className="bg-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-white/20 rounded w-20 animate-pulse" />
                <div className="h-3 bg-white/20 rounded w-24 animate-pulse" />
              </div>
            </div>
            <div className="h-10 bg-white/20 rounded w-full animate-pulse" />
          </div>
        </div>

        {/* Column 2, 3, 4 Skeletons */}
        {[1, 2, 3].map((col) => (
          <div key={col}>
            <div className="h-6 bg-white/20 rounded w-32 mb-6 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-4 bg-white/20 rounded w-full animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="mt-16 pt-8 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="h-4 bg-white/20 rounded w-64 animate-pulse" />
          <div className="flex gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-4 bg-white/20 rounded w-16 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// Memoized Social Link Component
const SocialLink = memo(({ 
  icon, 
  url, 
  color, 
  label 
}: { 
  icon: React.ReactNode; 
  url: string;
  color: string; 
  label: string; 
}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      aria-label={`Follow us on ${label}`}
    >
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}
      >
        <span className="text-white text-lg md:text-xl">{icon}</span>
      </div>
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {label}
      </span>
    </Link>
  );
});

SocialLink.displayName = 'SocialLink';

// Memoized Footer Link Component
const FooterLink = memo(({ 
  label, 
  href 
}: { 
  label: string; 
  href: string; 
}) => (
  <li>
    <Link
      href={href}
      className="text-gray-200 hover:text-white transition-colors text-sm flex items-center gap-2 group py-1"
      prefetch={false}
    >
      <RightOutlined className="text-xs text-white opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
      <span className="group-hover:translate-x-1 transition-transform">
        {label}
      </span>
    </Link>
  </li>
));

FooterLink.displayName = 'FooterLink';

const Footer = ({ config, isLoading = false }: FooterProps) => {
  // Show skeleton if loading
  if (isLoading) {
    return <FooterSkeleton />;
  }

  // Filter valid social links
  const socialLinks = useMemo(() => {
    const links = [
      {
        icon: <FacebookOutlined />,
        url: config.facebook,
        color: "bg-blue-600 hover:bg-blue-700",
        label: "Facebook",
      },
      {
        icon: <TwitterOutlined />,
        url: config.x,
        color: "bg-sky-500 hover:bg-sky-600",
        label: "Twitter",
      },
      {
        icon: <InstagramOutlined />,
        url: config.instagram,
        color: "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
        label: "Instagram",
      },
      {
        icon: <YoutubeOutlined />,
        url: config.youtube,
        color: "bg-red-600 hover:bg-red-700",
        label: "Youtube",
      },
    ];
    
    return links
      .filter((link): link is typeof link & { url: string } => 
        typeof link.url === 'string' && 
        link.url.trim() !== '' && 
        link.url !== 'null' && 
        link.url !== 'undefined'
      )
      .map(link => ({
        ...link,
        url: link.url.startsWith('http') ? link.url : `https://${link.url}`
      }));
  }, [config]);

  // Memoize quick links
  const quickLinks = useMemo(() => [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Sản phẩm", href: "/san-pham" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Liên hệ", href: "/lien-he" },
    { label: "Tuyển dụng", href: "/tuyen-dung" },
  ], []);

  // Memoize support links
  const supportLinks = useMemo(() => [
    { label: "Hướng dẫn chọn size", href: "/huong-dan-chon-size" },
    { label: "Khách hàng thân thiết", href: "/chinh-sach-khach-hang-than-thiet" },
    { label: "Câu hỏi thường gặp", href: "/cau-hoi-thuong-gap" },
  ], []);

  // Memoize bottom links
  const bottomLinks = useMemo(() => [
    { label: "Điều khoản", href: "/dieu-khoan" },
    { label: "Bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Cookies", href: "/cookies" },
  ], []);

  return (
    <footer className="relative overflow-hidden bg-[#0a5c4b] border-t border-[#0a5c4b]/50">
      {/* Subtle background effect */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {config.name || "Your Brand"}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-5 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <PhoneOutlined className="text-[#0a5c4b] text-lg" />
                </div>
                <div>
                  <p className="text-gray-300 text-xs">Hotline hỗ trợ</p>
                  <p className="text-gray-400 text-xs">08:30 - 22:00 hàng ngày</p>
                </div>
              </div>
              <a
                href={`tel:${config.mobile || "0963646444"}`}
                className="block text-xl font-bold text-white hover:text-gray-200 transition-colors"
              >
                {config.mobile || "0963 646 444"}
              </a>
            </div>

            <div>
              <h6 className="text-white font-semibold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-white rounded-full"></span>
                Kết nối với chúng tôi
              </h6>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} {...link} />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h6 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-white rounded-full"></span>
              Về chúng tôi
            </h6>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h6 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-white rounded-full"></span>
              Chính sách & Hỗ trợ
            </h6>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </ul>
          </div>

          {/* Column 4: Company Info */}
          <div>
            <h6 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-white rounded-full"></span>
              Thông tin liên hệ
            </h6>

            <div className="bg-white/10 rounded-xl p-5 border border-white/20 space-y-4">
              <p className="text-white font-bold text-sm">
                {config.name || "Tên công ty"}
              </p>
              <div className="space-y-3 text-xs text-gray-200">
                <div className="flex items-start gap-3">
                  <MailOutlined className="text-white mt-0.5 flex-shrink-0" />
                  <span className="break-all leading-relaxed">
                    {config.email || "email@example.com"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-white mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    {config.address || "Địa chỉ công ty"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">
                {config.name || "Your Brand"}
              </span>
              . All rights reserved
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              {bottomLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                  {index < bottomLinks.length - 1 && (
                    <span className="text-white/30">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);