# MDX Components Documentation

This document outlines the comprehensive MDX component system for Aram Tutorials, designed following core principles of consistency, brand alignment, hierarchy, and generous spacing.

## Design Principles

### 1. Consistency

All components share a common visual DNA with consistent padding, border-radius, font styles, and icon weight.

### 2. Brand Alignment

Components use the primary brand green (`#2E5E15`) strategically while maintaining the "simple, techy, minimal" aesthetic.

### 3. Hierarchy

Each component provides clear visual hierarchy so users instantly know what to read first and what action to take.

### 4. Spacing

Generous whitespace improves readability, reduces cognitive load, and gives pages a clean, professional feel.

## Component Library

### Callouts & Admonitions

Semantic color and icon system for different types of information:

- **ProTip/Note**: Brand green (`#2E5E15`) for positive, helpful moments
- **Important/Warning**: Yellow/orange for caution and critical information
- **Error/Danger**: Muted red for breaking changes or dangerous operations
- **Success**: Green for confirmations and completed actions
- **Info**: Blue for general information

```tsx
import { ProTip, ImportantNote, ErrorTip, SuccessNote, Callout } from '@/components/mdx';

<ProTip>
  This is a helpful tip that enhances the user's understanding.
</ProTip>

<ImportantNote>
  Critical information that users must not miss.
</ImportantNote>

<ErrorTip>
  Warning about potential breaking changes.
</ErrorTip>

<Callout type="info" title="Custom Title">
  Custom callout with specific type and title.
</Callout>
```

### Code Blocks

Dark theme code blocks with syntax highlighting, copy functionality, and optional download:

```tsx
import { CodeBlock } from '@/components/mdx';

<CodeBlock
  language="typescript"
  title="Button Component"
  filename="Button.tsx"
  showLineNumbers
  highlight="3,5-7"
>
  {`your code here`}
</CodeBlock>;
```

Features:

- **Header Bar**: Shows title/filename and language
- **Copy Button**: One-click copy with visual feedback
- **Download**: Optional file download functionality
- **Line Numbers**: Optional line numbering
- **Syntax Highlighting**: Language-specific highlighting
- **Line Highlighting**: Highlight specific lines

### Table of Contents

Sticky navigation with scrollspy functionality:

```tsx
import { TableOfContents } from '@/components/mdx';

<TableOfContents
  items={[
    { id: 'section-1', title: 'Getting Started', level: 2 },
    { id: 'subsection', title: 'Installation', level: 3 },
  ]}
  sticky={true}
/>;
```

Features:

- **Auto-generation**: Scans page headings if items not provided
- **Scrollspy**: Highlights current section automatically
- **Sticky positioning**: Stays visible while scrolling

### Prerequisites

Clean, simple design for listing requirements:

```tsx
import { Prerequisites, PrerequisiteItem } from '@/components/mdx';

<Prerequisites title="Before You Begin">
  <PrerequisiteItem completed>Node.js 18+ installed</PrerequisiteItem>
  <PrerequisiteItem>Basic React knowledge</PrerequisiteItem>
</Prerequisites>;
```

### Step-by-Step Guide

Numbered steps with progress indicators:

```tsx
import { StepList, Step } from '@/components/mdx';

<StepList>
  <Step number={1} title="Install Dependencies" completed>
    Content for step 1
  </Step>
  <Step number={2} title="Configure Next.js">
    Content for step 2
  </Step>
</StepList>;
```

### Cards & Grids

Responsive card layouts for organizing information:

```tsx
import { Card, CardGrid } from '@/components/mdx';
import { Shield, Zap } from 'lucide-react';

<CardGrid columns={2}>
  <Card title="Security" icon={Shield}>
    Best practices for security
  </Card>
  <Card title="Performance" icon={Zap}>
    Optimization techniques
  </Card>
</CardGrid>;
```

Features:

- **Responsive**: 2-column desktop, single column mobile
- **Icons**: Lucide React icons for visual enhancement
- **Flexible**: 1, 2, or 3 column layouts

### Media Components

Video embeds and images with proper styling:

```tsx
import { VideoEmbed, Image } from '@/components/mdx';

<VideoEmbed
  src="https://youtube.com/watch?v=example"
  title="Tutorial Video"
/>

<Image
  src="/screenshot.png"
  alt="Example screenshot"
  title="Project Structure"
  caption="The recommended folder structure"
/>
```

Features:

- **YouTube Support**: Automatic iframe embedding
- **Next.js Images**: Optimized image loading
- **Captions**: Optional image captions
- **Titles**: Header bars for context

### Additional Resources

Organized links with type indicators:

```tsx
import { AdditionalResources, ResourceLink } from '@/components/mdx';

<AdditionalResources
  resources={[
    {
      title: 'Official Documentation',
      url: 'https://example.com/docs',
      description: 'Complete API reference',
      type: 'documentation',
    },
  ]}
/>;
```

Types: `documentation`, `video`, `code`, `website`, `article`

## Usage Guidelines

### Import Pattern

```tsx
import {
  ProTip,
  CodeBlock,
  TableOfContents,
  // ... other components
} from '@/components/mdx';
```

### Color System

- **Brand Primary**: `#2E5E15` (dark green)
- **Warning**: Amber/orange tones
- **Error**: Muted red tones
- **Success**: Green tones
- **Info**: Blue tones

### Typography

All components respect the established typography scale and use semantic HTML elements for proper accessibility.

### Responsive Design

All components are mobile-first and responsive:

- Cards stack on mobile
- Code blocks scroll horizontally
- Media components maintain aspect ratios
- TOC collapses on small screens

## Best Practices

1. **Use semantic callouts**: Choose the right type for the content
2. **Provide context**: Always include titles for code blocks
3. **Keep it scannable**: Use cards and steps for complex information
4. **Include alt text**: Always provide meaningful alt text for images
5. **Test responsiveness**: Verify components work on all screen sizes

## Accessibility

All components follow WCAG guidelines:

- Proper color contrast ratios
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Brand Consistency

The component system reinforces the Aram Tutorials brand through:

- Consistent use of brand colors
- Professional, minimal aesthetic
- Technical focus with clean typography
- Generous whitespace for readability
