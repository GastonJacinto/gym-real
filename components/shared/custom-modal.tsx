import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Loader2,
  XCircle,
} from 'lucide-react';

type Variant = 'default' | 'delete' | 'success' | 'warning';

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmFn: any;
  variant?: Variant;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  footer?: boolean;
  size?: keyof typeof sizes;
}
const sizes = {
  sm: 'max-w-[300px]',
  md: 'max-w-[500px]',
  lg: 'max-w-[800px]',
  full: 'max-w-full',
};

const variant_config: Record<
  Variant,
  { icon: React.ReactNode; color: string }
> = {
  default: {
    icon: <HelpCircle className="h-6 w-6" />,
    color: 'text-primary',
  },
  delete: {
    icon: <XCircle className="h-6 w-6" />,
    color: 'text-destructive',
  },
  success: {
    icon: <CheckCircle className="h-6 w-6" />,
    color: 'text-green-500',
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6" />,
    color: 'text-yellow-500',
  },
};

export function CustomModal({
  open,
  onOpenChange,
  title,
  description,
  confirmFn,
  variant = 'default',
  icon,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  children,
  footer = true,
  size = 'md',
}: CustomModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await confirmFn();
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  const { icon: variant_icon, color } = variant_config[variant];
  const display_icon = icon || variant_icon;
  const modal_size = sizes[size];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${modal_size} `}>
        {' '}
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className={color}>{display_icon}</span>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        {footer && (
          <DialogFooter className="border-t pt-6 mt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              variant={variant === 'delete' ? 'destructive' : 'default'}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {confirmText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
