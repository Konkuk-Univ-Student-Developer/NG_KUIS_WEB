// Common UI Components
export { default as Button } from "./Button";
export { default as DataTable } from "./DataTable";
export { default as CustomTabs } from "./CustomTabs";
export { default as TopBar } from "./TopBar";
export { default as Select } from "./Select";
export { default as SearchInput } from "./SearchInput";
export { default as ViewToggle } from "./ViewToggle";
export { default as Pagination } from "./Pagination";
export { default as CourseCard } from "./CourseCard";

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
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
