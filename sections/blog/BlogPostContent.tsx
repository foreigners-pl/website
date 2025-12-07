'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Link from 'next/link';
import { BlogPost, formatDate } from '@/lib/blog';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Convert literal \n sequences to actual newlines
  let cleanContent = post.content;
  
  // Handle escaped newlines in various forms
  cleanContent = cleanContent.replace(/\\n\\n/g, '\n\n');
  cleanContent = cleanContent.replace(/\\n/g, '\n');

  return (
    <article className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
      {post.categories && post.categories.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {[...post.categories].sort((a: any, b: any) => (a.category.sort_order || 999) - (b.category.sort_order || 999)).map((cat: any) => (
            <Link 
              key={cat.category.id}
              href={`/blog/category/${cat.category.slug}`}
              className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              {cat.category.name}
            </Link>
          ))}
        </div>
      ) : post.category && (
        <Link 
          href={`/blog/category/${post.category.slug}`}
          className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-4 hover:bg-red-100 transition-colors"
        >
          {post.category.name}
        </Link>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
        <span className="font-medium">FOREIGNERS.pl</span>
        {post.published_at && (
          <time dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>
        )}
        {post.reading_time_minutes && (
          <span>{post.reading_time_minutes} min read</span>
        )}
      </div>

      {post.featured_image && (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none blog-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            p: ({ children }) => <p className="mb-5 mt-0">{children}</p>,
            h2: ({ children }) => <h2 className="text-xl font-bold mt-8 mb-0 leading-tight">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mt-6 mb-0 leading-tight">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>,
            li: ({ children }) => <li className="text-gray-700">{children}</li>,
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary relative group no-underline"
                >
                  {children}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ),
              img: ({ src, alt }) => {
                // Fix broken Unsplash URLs
                let fixedSrc = (typeof src === 'string' ? src : '') || '';
                if (fixedSrc.includes('images.unsplash.com/photo-') && !fixedSrc.includes('?')) {
                  // If it's a broken Unsplash URL without query params, add them
                  fixedSrc = `${fixedSrc}?w=1200&auto=format&fit=crop`;
                }
                return (
                  <img 
                    src={fixedSrc} 
                    alt={alt || ''} 
                    className="rounded-lg my-6 w-full aspect-[5/3] object-cover shadow-md"
                    loading="lazy"
                  />
                );
              },
            }}
          >
            {cleanContent}
          </ReactMarkdown>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}