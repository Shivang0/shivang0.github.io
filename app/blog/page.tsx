'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import BlogCard from '@/components/ui/BlogCard'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimeBackground from '@/components/graphics/AnimeBackground'
import { staggerContainer } from '@/components/motion/variants'

const blogPosts = [
  {
    slug: 'ai-security-2025',
    title: 'The State of AI Security in 2025',
    excerpt: 'Comprehensive analysis of emerging threats and defensive strategies in the AI security landscape.',
    image: '/images/blog/ai-security.jpg',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Research',
  },
  {
    slug: 'zero-day-discovery',
    title: 'Zero-Day Discovery Methodology',
    excerpt: 'Deep dive into our proprietary methodology for discovering and responsibly disclosing zero-day vulnerabilities.',
    image: '/images/blog/zero-day.jpg',
    date: '2025-01-10',
    readTime: '12 min read',
    category: 'Technical',
  },
  {
    slug: 'supply-chain-security',
    title: 'Securing the Software Supply Chain',
    excerpt: 'Best practices and tools for protecting against supply chain attacks in modern development workflows.',
    image: '/images/blog/supply-chain.jpg',
    date: '2025-01-05',
    readTime: '10 min read',
    category: 'Best Practices',
  },
  {
    slug: 'ransomware-evolution',
    title: 'The Evolution of Ransomware Tactics',
    excerpt: 'Analysis of how ransomware groups are adapting their techniques and what organizations can do to protect themselves.',
    image: '/images/blog/ransomware.jpg',
    date: '2024-12-28',
    readTime: '15 min read',
    category: 'Threat Analysis',
  },
  {
    slug: 'cloud-security-best-practices',
    title: 'Cloud Security Best Practices for 2025',
    excerpt: 'Essential security configurations and monitoring strategies for AWS, Azure, and GCP environments.',
    image: '/images/blog/cloud-security.jpg',
    date: '2024-12-20',
    readTime: '9 min read',
    category: 'Cloud Security',
  },
  {
    slug: 'api-security-testing',
    title: 'Advanced API Security Testing Techniques',
    excerpt: 'Modern approaches to discovering and exploiting API vulnerabilities in production environments.',
    image: '/images/blog/api-security.jpg',
    date: '2024-12-15',
    readTime: '11 min read',
    category: 'Technical',
  },
]

const categories = ['All', 'Research', 'Technical', 'Best Practices', 'Threat Analysis', 'Cloud Security']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <AnimeBackground variant="dots" />
      <Navbar />
      
      <main className="pt-16">
        <section className="section-padding">
          <Container>
            <SectionHeader
              badge="Blog"
              title="Security Research & Insights"
              subtitle="Latest findings, analysis, and best practices from our security team"
            />
            
            <div className="mt-12 space-y-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      <Badge
                        variant={selectedCategory === category ? 'primary' : 'outline'}
                        size="md"
                        className="cursor-pointer hover:bg-accent/10 transition-colors"
                      >
                        {category}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted">No articles found matching your criteria.</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                >
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </motion.div>
              )}
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </>
  )
}