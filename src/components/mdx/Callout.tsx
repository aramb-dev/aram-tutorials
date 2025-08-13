import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  XCircle,
} from 'lucide-react';
import React from 'react';

export type CalloutType =
  | 'note'
  | 'tip'
  | 'warning'
  | 'error'
  | 'success'
  | 'info';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  note: {
    icon: Info,
    className: 'border-brand-primary/30 bg-brand-primary/5 text-brand-primary',
    iconClassName: 'text-brand-primary',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-brand-primary/30 bg-brand-primary/5 text-brand-primary',
    iconClassName: 'text-brand-primary',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-300 bg-amber-50 text-amber-800',
    iconClassName: 'text-amber-600',
  },
  error: {
    icon: XCircle,
    className: 'border-red-300 bg-red-50 text-red-800',
    iconClassName: 'text-red-600',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-300 bg-green-50 text-green-800',
    iconClassName: 'text-green-600',
  },
  info: {
    icon: Info,
    className: 'border-blue-300 bg-blue-50 text-blue-800',
    iconClassName: 'text-blue-600',
  },
};

const defaultTitles = {
  note: 'Note',
  tip: 'Pro Tip',
  warning: 'Important',
  error: 'Error',
  success: 'Success',
  info: 'Info',
};

export function Callout({
  type = 'note',
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 p-4 shadow-sm',
        config.className,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <IconComponent className={cn('h-5 w-5', config.iconClassName)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="mb-2 font-semibold text-base leading-tight">
            {displayTitle}
          </h4>
          <div className="prose prose-sm max-w-none text-current">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Convenience components for each type
export const ProTip = ({
  title,
  children,
  ...props
}: Omit<CalloutProps, 'type'>) => (
  <Callout type="tip" title={title || 'Pro Tip'} {...props}>
    {children}
  </Callout>
);

export const ErrorTip = ({
  title,
  children,
  ...props
}: Omit<CalloutProps, 'type'>) => (
  <Callout type="error" title={title || 'Error'} {...props}>
    {children}
  </Callout>
);

export const ImportantNote = ({
  title,
  children,
  ...props
}: Omit<CalloutProps, 'type'>) => (
  <Callout type="warning" title={title || 'Important'} {...props}>
    {children}
  </Callout>
);

export const SuccessNote = ({
  title,
  children,
  ...props
}: Omit<CalloutProps, 'type'>) => (
  <Callout type="success" title={title || 'Success'} {...props}>
    {children}
  </Callout>
);
