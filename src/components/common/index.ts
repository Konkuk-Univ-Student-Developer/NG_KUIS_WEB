// Common UI Components
export { default as Button } from "./Button";
export { default as CourseCard } from "./CourseCard";
export { default as DataTable } from "./DataTable";
export { default as SearchInput } from "./SearchInput";
export { default as QuickMenu } from "./QuickMenu";
export { default as StatusBadge } from "./StatusBadge";
export { default as Navigation } from "./Navigation";

// Re-export shadcn/ui components for convenience
export { Badge } from "@/components/ui/badge";
export {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export { Input } from "@/components/ui/input";
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export { Button as ShadcnButton } from "@/components/ui/button";
