import { cn } from '@/lib/utils';
import { Code, ExternalLink, FileText, Globe, Video } from 'lucide-react';
import Link from 'next/link';

interface ResourceLink {
  title: string;
  url: string;
  description?: string;
  type?: 'documentation' | 'video' | 'code' | 'website' | 'article';
}

interface AdditionalResourcesProps {
  resources: ResourceLink[];
  title?: string;
  className?: string;
}

const resourceIcons = {
  documentation: FileText,
  video: Video,
  code: Code,
  website: Globe,
  article: FileText,
};

export function AdditionalResources({
  resources,
  title = 'Additional Resources',
  className,
}: AdditionalResourcesProps) {
  return (
    <div
      className={cn(
        'my-8 p-6 bg-muted/50 rounded-lg border border-border',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resourceIcons[resource.type || 'article'];
          const isExternal = resource.url.startsWith('http');

          return (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-background rounded border border-border/50 hover:border-border transition-colors"
            >
              <Icon className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link
                  href={resource.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-brand-primary hover:text-brand-light font-medium text-sm flex items-center gap-1"
                >
                  {resource.title}
                  {isExternal && <ExternalLink className="h-3 w-3" />}
                </Link>
                {resource.description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {resource.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Convenience component for a single resource
interface ResourceLinkProps {
  title: string;
  url: string;
  description?: string;
  type?: ResourceLink['type'];
}

export function ResourceLink({
  title,
  url,
  description,
  type = 'article',
}: ResourceLinkProps) {
  return (
    <AdditionalResources
      resources={[{ title, url, description, type }]}
      title="Related Resource"
    />
  );
}
