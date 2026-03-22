import { AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "default" | "info" | "warning" | "danger" | "idea";
}

const styles = {
  default: "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100",
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200",
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200",
  danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200",
  idea: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200",
};

const icons = {
  default: Info,
  info: Info,
  warning: TriangleAlert,
  danger: AlertCircle,
  idea: Lightbulb,
};

export function Callout({ children, type = "default" }: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div className={`my-6 flex items-start gap-4 rounded-xl border p-4 ${styles[type]}`}>
      <Icon className="mt-1 h-5 w-5 shrink-0" />
      <div className="prose-p:m-0 prose-strong:text-inherit text-base leading-relaxed w-full">
        {children}
      </div>
    </div>
  );
}
