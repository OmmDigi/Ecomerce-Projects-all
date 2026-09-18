import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to exercise effectively",
    image: "https://gymtek-store-demo.myshopify.com/cdn/shop/articles/blog1_9a78452b-df76-4a66-95c0-c1db510c5403_1024x1024.jpg?v=1586317016",
    url: "/blogs/news/how-to-exercise-effectively",
    excerpt: "Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Etiam ut purus mattis mauris sodales...",
  },
  {
    id: 2,
    title: "How to know enough or not?",
    image: "https://gymtek-store-demo.myshopify.com/cdn/shop/articles/blog2_6e28bc69-c1a7-4772-b89b-05975148a681_1024x1024.jpg?v=1586317010",
    url: "/blogs/news/how-to-know-enough-or-not",
    excerpt: "Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Etiam ut purus mattis mauris sodales...",
  },
  {
    id: 3,
    title: "Diet when exercising weight loss, science for women",
    image: "https://gymtek-store-demo.myshopify.com/cdn/shop/articles/blog13_1024x1024.jpg?v=1586316854",
    url: "/blogs/news/diet-when-exercising-weight-loss-science-for-women",
    excerpt: "Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Etiam ut purus mattis mauris sodales...",
  }
];

export default function BlogSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#ededed]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[3px] after:bg-[#f04923]">
            From Our Blog.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-200">
                <Link href={post.url} className="block w-full h-full">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </Link>
                {/* Date overlay (optional, adding a nice touch) */}
                <div className="absolute top-4 left-4 bg-white px-3 py-2 text-center shadow-md">
                  <span className="block text-xl font-bold text-gray-900 leading-none">12</span>
                  <span className="block text-xs font-semibold text-gray-500 uppercase mt-1">Apr</span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 hover:text-[#f04923] transition-colors duration-300 line-clamp-2 uppercase">
                  <Link href={post.url}>{post.title}</Link>
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <Link 
                    href={post.url}
                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-[#f04923] transition-colors group/link"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
