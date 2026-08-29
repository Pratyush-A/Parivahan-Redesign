import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function PageContainer<TElement extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: PageContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-[var(--content-max-width)] px-[var(--content-padding)]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
