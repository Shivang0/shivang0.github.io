# Security Platform - Migration & Setup Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Migration Summary

### From: Static HTML Site
- **Previous Stack**: Plain HTML/CSS with inline styles
- **Content**: AI security checklist, prompts, standards pages

### To: Next.js 14 Modern Web App
- **New Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Features**: Component-based architecture, motion design, dark/light themes
- **Performance**: Optimized for Core Web Vitals, A11y, and SEO

## 🔄 URL Redirects

Old routes are automatically redirected to new locations:
- `/ai_security_checklist.html` → `/products`
- `/prompts.html` → `/research`
- `/standards.html` → `/disclosures`

## 🎨 Design System

### Color Tokens
```css
Dark Theme:
- Background: #0f1115
- Surface: #151821
- Panel: #191d27
- Text: #E6E8EC
- Muted: #9AA3AF
- Border: #2A2F3A
- Accent: #8EA6C8

Light Theme:
- Background: #FAFBFC
- Surface: #FFFFFF
- Panel: #F5F7FA
- Text: #1A202C
- Muted: #4A5568
- Border: #E2E8F0
- Accent: #5A7597
```

### Typography
- Display: Sora
- Body: Inter
- Mono: IBM Plex Mono

## 🎭 Motion System

### Animation Intensity Controls
Modify animation speed in `/lib/tokens.ts`:
```typescript
animation: {
  durations: {
    fast: 200,    // Quick interactions
    normal: 400,  // Standard transitions
    slow: 600,    // Deliberate animations
    ambient: 8000 // Background effects
  }
}
```

### Reduced Motion
Automatically respects `prefers-reduced-motion` system setting. All decorative animations are disabled when enabled.

### Background Effects
Toggle between dots/rings in page components:
```tsx
<AnimeBackground variant="dots" />  // or "rings"
```

Adjust opacity in `/components/graphics/AnimeBackground.tsx`:
```typescript
opacity: 0.08 // Reduce for subtler effect
```

## 📁 Project Structure

```
/app              # Next.js App Router pages
  /layout.tsx     # Root layout with fonts
  /page.tsx       # Homepage
  /products       # Product pages
  /research       # Research & case studies
  /blog           # Blog articles
  /disclosures    # Vulnerability disclosures
  /demo           # Demo request form

/components       # Reusable components
  /ui             # Core UI components
  /layout         # Layout components (Navbar, Footer)
  /graphics       # Animated backgrounds
  /motion         # Animation variants

/lib              # Utilities & configuration
  /tokens.ts      # Design tokens
  /seo.ts         # SEO configuration
  /csp.ts         # Security headers
  /utils.ts       # Helper functions

/public           # Static assets
  /images         # Images and icons
```

## 🔒 Security Features

### Content Security Policy
Configured in `/lib/csp.ts`:
- Strict CSP headers
- XSS protection
- Frame options
- HSTS enabled

### Input Sanitization
All user inputs are validated and sanitized before processing.

## ⚡ Performance Optimization

### Target Metrics
- LCP: ≤ 2.5s
- CLS: ≤ 0.1
- TBT: ≤ 200ms
- Page weight: ≤ 250KB (gzipped, excluding images)

### Optimization Techniques
- Route-level code splitting
- Image optimization with next/image
- Font preloading
- CSS purging with Tailwind

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Lighthouse CI (install first: npm i -g @lhci/cli)
lhci autorun
```

## 📝 Content Management

### Adding Blog Posts
Edit `/app/blog/page.tsx` and add to the `blogPosts` array:
```typescript
{
  slug: 'new-post',
  title: 'Post Title',
  excerpt: 'Brief description',
  image: '/images/blog/image.jpg',
  date: '2025-01-20',
  readTime: '5 min read',
  category: 'Research'
}
```

### Adding Research Papers
Edit `/app/research/page.tsx` and add to `researchPapers` array.

### Adding Vulnerability Disclosures
Edit `/app/disclosures/page.tsx` and add to `disclosures` array.

## 🎯 Customization

### Theme Toggle
Theme preference is saved to localStorage and syncs with system preference.

### Motion Intensity
Users with `prefers-reduced-motion` automatically get simplified animations.

### Component Variants
Most components support variants:
```tsx
<Button variant="primary|secondary|ghost|outline" />
<Card variant="default|outlined|elevated" />
<Badge variant="primary|secondary|success|warning|danger" />
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Self-Hosted
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Analytics

Add analytics in `/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with module errors**
   ```bash
   rm -rf node_modules .next
   npm install
   ```

2. **Fonts not loading**
   Ensure Google Fonts are accessible or use local fonts

3. **Animation performance issues**
   - Reduce animation complexity
   - Lower opacity values
   - Disable background animations

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Anime.js](https://animejs.com/)

## 🤝 Support

For issues or questions about the migration:
1. Check this guide first
2. Review the code comments
3. Contact the development team

---

**Last Updated**: January 2025
**Version**: 2.0.0