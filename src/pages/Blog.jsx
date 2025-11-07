import { useState } from 'react';
import { Search, Calendar, User, ArrowRight, X } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Things to Do in Cape Town",
    excerpt: "Discover the must-see attractions and experiences that make Cape Town one of the world's most beautiful cities.",
    author: "Travel Expert",
    date: "2025-01-15",
    category: "Travel Guide",
    image: "https://picsum.photos/seed/capetown1/800/600",
    readTime: "8 min read",
    content: `Cape Town is a city that truly has it all - from stunning natural landscapes to rich history, vibrant culture, and world-class experiences. Here are the top 10 must-do activities:

**1. Table Mountain Cable Car**
No visit to Cape Town is complete without ascending Table Mountain. The rotating cable car offers 360-degree views during the 5-minute journey to the summit. Once at the top, you'll be treated to breathtaking panoramic views of the city, ocean, and surrounding peaks.

**2. V&A Waterfront**
This bustling harbor is perfect for shopping, dining, and entertainment. Visit the Two Oceans Aquarium, take a sunset cruise, or simply enjoy the street performers and scenic views.

**3. Robben Island**
Take a ferry to this UNESCO World Heritage Site where Nelson Mandela was imprisoned for 18 years. Former political prisoners serve as guides, sharing powerful firsthand accounts of South Africa's struggle for freedom.

**4. Cape Point & Cape of Good Hope**
Drive along the spectacular Chapman's Peak route to reach the southwestern tip of Africa. Hike to the lighthouse for stunning ocean views and spot wildlife including baboons, ostriches, and if you're lucky, whales.

**5. Boulders Beach Penguins**
Get up close with African penguins at this protected beach. These adorable creatures waddle around the boulders and swim in the crystal-clear waters alongside visitors.

**6. Kirstenbosch Botanical Gardens**
Explore one of the world's greatest botanical gardens, home to over 7,000 plant species. Don't miss the summer sunset concerts held on the lawns.

**7. Cape Winelands**
Take a day trip to Stellenbosch, Franschhoek, or Constantia for world-class wine tasting amid stunning vineyard landscapes. Many estates offer cellar tours and gourmet food pairings.

**8. Bo-Kaap**
Wander through this colorful neighborhood known for its brightly painted houses and rich Cape Malay culture. Join a cooking class to learn about traditional cuisine.

**9. Lion's Head Hike**
For adventure seekers, this moderate hike offers incredible sunrise or sunset views. The full moon hikes are particularly popular.

**10. Camps Bay Beach**
Relax on pristine white sand with the Twelve Apostles mountains as your backdrop. The beach is lined with trendy restaurants and bars perfect for sundowners.`
  },
  {
    id: 2,
    title: "Cape Town on a Budget: Ultimate Guide",
    excerpt: "Learn how to experience the best of Cape Town without breaking the bank with our comprehensive budget travel guide.",
    author: "Budget Traveler",
    date: "2025-01-12",
    category: "Budget Travel",
    image: "https://picsum.photos/seed/budget2/800/600",
    readTime: "10 min read"
  },
  {
    id: 3,
    title: "Best Time to Visit Cape Town",
    excerpt: "Find out when to visit Cape Town for the best weather, fewer crowds, and amazing experiences throughout the year.",
    author: "Weather Guide",
    date: "2025-01-10",
    category: "Planning",
    image: "https://picsum.photos/seed/weather3/800/600",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "7-Day Cape Town Itinerary",
    excerpt: "A complete week-long itinerary covering the best of Cape Town, from Table Mountain to the Cape Winelands.",
    author: "Itinerary Planner",
    date: "2025-01-08",
    category: "Itineraries",
    image: "https://picsum.photos/seed/itinerary4/800/600",
    readTime: "12 min read"
  },
  {
    id: 5,
    title: "Hidden Gems Only Locals Know About",
    excerpt: "Discover Cape Town's best-kept secrets and explore like a local with our insider guide to hidden gems.",
    author: "Local Insider",
    date: "2025-01-05",
    category: "Hidden Gems",
    image: "https://picsum.photos/seed/hidden5/800/600",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Ultimate Cape Winelands Tour Guide",
    excerpt: "Explore the world-famous Cape Winelands with our complete guide to wineries, tastings, and vineyard tours.",
    author: "Wine Expert",
    date: "2025-01-03",
    category: "Food & Wine",
    image: "https://picsum.photos/seed/wine6/800/600",
    readTime: "11 min read"
  }
];

const categories = ["All", "Travel Guide", "Budget Travel", "Planning", "Itineraries", "Hidden Gems", "Food & Wine"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog</h1>
          <p className="text-xl text-gray-600">
            Tips, guides, and stories from Cape Town
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">
          Showing {filteredPosts.length} of {blogPosts.length} articles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover bg-gray-200"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + encodeURIComponent(post.title) + '%3C/text%3E%3C/svg%3E';
                }}
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                    <Calendar className="h-4 w-4 ml-3 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-gray-900 font-semibold text-sm hover:underline flex items-center"
                  >
                    Read
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found</p>
          </div>
        )}
      </div>

      {/* Blog Post Detail Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div
              className="bg-white rounded-lg max-w-3xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Sticky */}
              <button
                onClick={() => setSelectedPost(null)}
                className="sticky top-4 float-right mr-4 mt-4 p-2 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors z-20 shadow-lg"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 clear-both">
              {/* Image */}
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4 sm:mb-6"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + encodeURIComponent(selectedPost.title) + '%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Category & Read Time */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm font-semibold text-gray-700">
                  {selectedPost.category}
                </span>
                <span className="text-xs sm:text-sm text-gray-600">{selectedPost.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author & Date */}
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200 gap-2 sm:gap-4">
                <div className="flex items-center">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-sm sm:prose-base max-w-none">
                {selectedPost.content ? (
                  <div
                    className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: selectedPost.content
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="mb-3 sm:mb-4">')
                    }}
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedPost.excerpt}</p>
                )}
              </div>

              {/* Close Button at Bottom for Mobile */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-gray-600">
                  Enjoyed this article? Share it with fellow travelers!
                </p>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
