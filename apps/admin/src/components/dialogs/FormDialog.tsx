import { ReactNode, RefObject } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@ultimate-adventure/shared-components";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  formRef: RefObject<HTMLFormElement | null>;
  isSubmitting: boolean;
  submitButtonText?: string;
  submittingText?: string;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  formRef,
  isSubmitting,
  submitButtonText = "Save Changes",
  submittingText = "Saving...",
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? submittingText : submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
