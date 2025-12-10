'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAllBlogs } from '@/hooks/blog/useAllBlogs';
import { BlogCard } from '@/components/layout/blog/BlogCard';
import { Blog } from '@/types/blog.type';

const MemoizedBlogCard = React.memo(BlogCard);

export default function BlogHome() {
  const { data: blogs, isLoading, isError } = useAllBlogs();

  // Lọc và giới hạn 4 bài viết đã publish
  const latestBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs
      .filter((blog: Blog) => blog.isPublished)
      .slice(0, 4);
  }, [blogs]);

  // Không render nếu đang loading hoặc có lỗi
  if (isLoading || isError || latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Tin tức mới nhất
            </h2>
           
          </div>
        
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestBlogs.map((blog: Blog) => (
            <MemoizedBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}