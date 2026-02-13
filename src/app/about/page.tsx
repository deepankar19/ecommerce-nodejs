import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Michael Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Emily Davis",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
  {
    name: "James Wilson",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  },
];

const values = [
  {
    title: "Quality First",
    description: "We source only the finest products from trusted manufacturers, ensuring every item meets our rigorous quality standards.",
    icon: "✦",
  },
  {
    title: "Customer Obsessed",
    description: "Our customers are at the heart of everything we do. We listen, adapt, and always strive to exceed expectations.",
    icon: "♡",
  },
  {
    title: "Sustainability",
    description: "We are committed to reducing our environmental impact through eco-friendly packaging and sustainable sourcing.",
    icon: "🌱",
  },
  {
    title: "Innovation",
    description: "We continuously explore new technologies and trends to bring you the most cutting-edge shopping experience.",
    icon: "⚡",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
            alt="About"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Building the Future of Online Shopping
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Founded in 2020, ShopVerse has grown from a small startup to a
              thriving marketplace serving thousands of happy customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Premium Products" },
              { number: "50+", label: "Brand Partners" },
              { number: "99%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Making Premium Products Accessible to Everyone
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that everyone deserves access to high-quality products
                without breaking the bank. Our mission is to bridge the gap between
                premium quality and affordable pricing.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Through direct partnerships with manufacturers and a lean business
                model, we eliminate unnecessary markups and pass the savings on to
                our customers. Every product in our store is carefully vetted and
                tested by our expert team.
              </p>
              <Link
                href="/shop"
                className="inline-flex px-8 py-3.5 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Explore Our Products
              </Link>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600&q=80"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Core Values
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              The principles that guide everything we do at ShopVerse.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl block mb-4">{value.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Meet Our Team
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              The passionate people behind ShopVerse who make it all happen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have discovered their favorite
            products on ShopVerse.
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3.5 bg-white text-primary rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
