import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

const sizeConfig = {
  sm: {
    button: "size-8 sm:size-9",
    icon: "size-4 sm:size-5",
  },
  md: {
    button: "size-9 sm:size-10",
    icon: "size-5 sm:size-6",
  },
  lg: {
    button: "size-10 sm:size-11",
    icon: "size-5 sm:size-6",
  },
};

type Variant = "ghost" | "outline" | "secondary" | "default";

interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  icon: LucideIcon;
  "aria-label": string;
  size?: keyof typeof sizeConfig;
  variant?: Variant;
}

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  const config = sizeConfig[size];

  return (
    <Button
      variant={variant}
      className={cn(config.button, className)}
      {...props}
    >
      <Icon className={config.icon} />
    </Button>
  );
}
