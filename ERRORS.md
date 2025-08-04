src/components/blog/BlogCard.tsx(289,39): error TS2345: Argument of type 'Date' is not assignable to parameter of type 'string'.
src/components/blog/BlogPostHeader.tsx(23,42): error TS18048: 'post.category' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(49,50): error TS18048: 'post.category' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(54,20): error TS18048: 'post.category' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(61,31): error TS2551: Property 'readingTime' does not exist on type 'BlogPost'. Did you mean 'reading_time'?
src/components/blog/BlogPostHeader.tsx(71,31): error TS2339: Property 'likes' does not exist on type 'BlogPost'.
src/components/blog/BlogPostHeader.tsx(91,20): error TS18048: 'post.author' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(91,32): error TS2339: Property 'avatar' does not exist on type 'User'.
src/components/blog/BlogPostHeader.tsx(93,28): error TS18048: 'post.author' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(93,40): error TS2339: Property 'avatar' does not exist on type 'User'.
src/components/blog/BlogPostHeader.tsx(94,28): error TS18048: 'post.author' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(106,62): error TS18048: 'post.author' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(107,60): error TS18048: 'post.author' is possibly 'undefined'.
src/components/blog/BlogPostHeader.tsx(117,54): error TS2551: Property 'publishedAt' does not exist on type 'BlogPost'. Did you mean 'published_at'?
src/components/blog/BlogPostHeader.tsx(120,25): error TS2551: Property 'updatedAt' does not exist on type 'BlogPost'. Did you mean 'updated_at'?
src/components/blog/BlogPostHeader.tsx(120,44): error TS2551: Property 'publishedAt' does not exist on type 'BlogPost'. Did you mean 'published_at'?
src/components/blog/BlogPostHeader.tsx(122,56): error TS2551: Property 'updatedAt' does not exist on type 'BlogPost'. Did you mean 'updated_at'?
src/components/blog/BlogPostHeader.tsx(145,27): error TS2322: Type 'Tag' is not assignable to type 'Key | null | undefined'.
src/components/blog/BlogPostHeader.tsx(145,65): error TS2339: Property 'toLowerCase' does not exist on type 'Tag'.
src/components/blog/BlogPostHeader.tsx(150,26): error TS2322: Type 'Tag' is not assignable to type 'ReactNode'.
src/components/blog/BlogPostSidebar.tsx(288,51): error TS2339: Property 'readTime' does not exist on type 'BlogPost'.
src/components/blog/BlogPostSidebar.tsx(297,32): error TS2551: Property 'publishedAt' does not exist on type 'BlogPost'. Did you mean 'published_at'?
src/components/blog/CategoryBadge.tsx(13,3): error TS2339: Property 'className' does not exist on type 'CategoryBadgeProps'.
src/components/blog/CategoryBadge.tsx(16,43): error TS2345: Argument of type 'Category' is not assignable to parameter of type 'string'.
src/components/blog/CategoryBadge.tsx(20,7): error TS2322: Type '{ children: string; size: "sm" | "md" | "lg"; variant: "default" | "outline"; className: any; style: { backgroundColor: string | undefined; borderColor: string | undefined; color: string | undefined; }; }' is not assignable to type 'IntrinsicAttributes & ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & VariantProps<...> & { ...; }'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & VariantProps<...> & { ...; }'.
src/components/blog/RelatedPosts.tsx(37,9): error TS2353: Object literal may only specify known properties, and 'avatar' does not exist in type 'User'.
src/components/blog/RelatedPosts.tsx(39,7): error TS2739: Type '{ id: string; name: string; slug: string; color: string; }' is missing the following properties from type 'Category': created_at, updated_at
src/components/blog/RelatedPosts.tsx(46,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(47,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(48,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(68,9): error TS2353: Object literal may only specify known properties, and 'avatar' does not exist in type 'User'.
src/components/blog/RelatedPosts.tsx(70,7): error TS2739: Type '{ id: string; name: string; slug: string; color: string; }' is missing the following properties from type 'Category': created_at, updated_at
src/components/blog/RelatedPosts.tsx(77,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(78,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(79,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(99,9): error TS2353: Object literal may only specify known properties, and 'avatar' does not exist in type 'User'.
src/components/blog/RelatedPosts.tsx(101,7): error TS2739: Type '{ id: string; name: string; slug: string; color: string; }' is missing the following properties from type 'Category': created_at, updated_at
src/components/blog/RelatedPosts.tsx(108,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(109,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/RelatedPosts.tsx(110,9): error TS2739: Type '{ id: string; name: string; slug: string; }' is missing the following properties from type 'Tag': created_at, updated_at
src/components/blog/TagComponent.tsx(6,10): error TS2305: Module '"@/lib/utils"' has no exported member 'generateTagUrl'.
src/components/blog/TagComponent.tsx(15,3): error TS2339: Property 'className' does not exist on type 'TagProps'.
src/components/blog/TagComponent.tsx(27,7): error TS2322: Type '{ children: string[]; size: "sm" | "md" | "lg"; variant: "default" | "outline"; removable: boolean; onRemove: (() => void) | undefined; className: any; }' is not assignable to type 'IntrinsicAttributes & ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & VariantProps<...> & { ...; }'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLSpanElement> & HTMLAttributes<HTMLSpanElement> & VariantProps<...> & { ...; }'.
src/components/home/CategoriesSection.tsx(34,29): error TS2339: Property 'id' does not exist on type 'Omit<Category, "id" | "created_at" | "updated_at">'.
src/components/home/CategoriesSection.tsx(45,22): error TS2604: JSX element type 'IconComponent' does not have any construct or call signatures.
src/components/home/CategoriesSection.tsx(45,22): error TS2786: 'IconComponent' cannot be used as a JSX component.
  Its type 'string | undefined' is not a valid JSX element type.
    Type 'undefined' is not assignable to type 'ElementType'.
src/components/home/CategoriesSection.tsx(63,37): error TS2339: Property 'postCount' does not exist on type 'Omit<Category, "id" | "created_at" | "updated_at">'.
src/components/home/FeaturedPosts.tsx(36,17): error TS2322: Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; } | { ...; } | { ...; }' is not assignable to type 'BlogPost'.
  Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; }' is missing the following properties from type 'BlogPost': author_id, category_id, status, is_featured, and 3 more.
src/components/home/HeroSection.tsx(38,15): error TS2322: Type '{ placeholder: string; className: string; size: string; }' is not assignable to type 'IntrinsicAttributes & SearchInputProps & RefAttributes<HTMLInputElement>'.
  Property 'size' does not exist on type 'IntrinsicAttributes & SearchInputProps & RefAttributes<HTMLInputElement>'.
src/components/home/RecentPosts.tsx(38,17): error TS2322: Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; } | { ...; } | { ...; }' is not assignable to type 'BlogPost'.
  Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; }' is missing the following properties from type 'BlogPost': author_id, category_id, status, is_featured, and 3 more.
src/components/tutorials/TutorialsFilters.tsx(196,31): error TS2339: Property 'count' does not exist on type 'Omit<Category, "id" | "created_at" | "updated_at">'.
src/components/tutorials/TutorialsList.tsx(59,43): error TS2339: Property 'toLowerCase' does not exist on type '{ readonly id: "1"; readonly name: "React"; readonly slug: "react"; } | { readonly id: "2"; readonly name: "Hooks"; readonly slug: "hooks"; } | { readonly id: "3"; readonly name: "JavaScript"; readonly slug: "javascript"; } | ... 5 more ... | { ...; }'.
  Property 'toLowerCase' does not exist on type '{ readonly id: "1"; readonly name: "React"; readonly slug: "react"; }'.
src/components/tutorials/TutorialsList.tsx(70,35): error TS2339: Property 'toLowerCase' does not exist on type '{ readonly id: "1"; readonly name: "React"; readonly slug: "react"; } | { readonly id: "2"; readonly name: "Hooks"; readonly slug: "hooks"; } | { readonly id: "3"; readonly name: "JavaScript"; readonly slug: "javascript"; } | ... 5 more ... | { ...; }'.
  Property 'toLowerCase' does not exist on type '{ readonly id: "1"; readonly name: "React"; readonly slug: "react"; }'.
src/components/tutorials/TutorialsList.tsx(224,17): error TS2322: Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; } | { ...; } | { ...; }' is not assignable to type 'BlogPost'.
  Type '{ readonly id: "1"; readonly title: "Getting Started with React Hooks"; readonly slug: "getting-started-with-react-hooks"; readonly excerpt: "Learn the fundamentals of React Hooks and how they can simplify your component logic."; ... 15 more ...; readonly seoKeywords: readonly [...]; }' is missing the following properties from type 'BlogPost': author_id, category_id, status, is_featured, and 3 more.
src/components/ui/index.ts(3,15): error TS2305: Module '"./button"' has no exported member 'ButtonProps'.
src/components/ui/index.ts(14,3): error TS2305: Module '"./card"' has no exported member 'CardProps'.
src/components/ui/index.ts(15,3): error TS2724: '"./card"' has no exported member named 'CardHeaderProps'. Did you mean 'CardHeader'?
src/components/ui/index.ts(16,3): error TS2724: '"./card"' has no exported member named 'CardFooterProps'. Did you mean 'CardFooter'?
src/components/ui/index.ts(17,3): error TS2305: Module '"./card"' has no exported member 'CardTitleProps'.
src/components/ui/index.ts(18,3): error TS2724: '"./card"' has no exported member named 'CardDescriptionProps'. Did you mean 'CardDescription'?
src/components/ui/index.ts(19,3): error TS2724: '"./card"' has no exported member named 'CardContentProps'. Did you mean 'CardContent'?
src/components/ui/index.ts(23,15): error TS2305: Module '"./input"' has no exported member 'InputProps'.
src/components/ui/index.ts(26,15): error TS2305: Module '"./textarea"' has no exported member 'TextareaProps'.
src/components/ui/index.ts(29,15): error TS2305: Module '"./badge"' has no exported member 'BadgeProps'.
src/lib/db.ts(102,11): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(103,11): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(169,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(176,15): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(217,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(256,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(285,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(291,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(307,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(319,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(330,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(351,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(363,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
src/lib/db.ts(394,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'TemplateStringsArray'.
