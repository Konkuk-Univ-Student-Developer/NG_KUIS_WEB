import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface CustomTabsProps {
  defaultValue?: string;
  className?: string;
  children?: React.ReactNode;
  tabs: Array<{
    value: string;
    label: string;
    content?: React.ReactNode;
  }>;
  onValueChange?: (value: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  defaultValue,
  className,
  children,
  tabs,
  onValueChange,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      className={cn('w-full', className)}
      onValueChange={onValueChange}
    >
      <TabsList className="bg-[var(--beige)] rounded-md p-[5px] h-auto inline-flex gap-[20px] justify-start">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'mobile-medium-regular',
              'px-3 py-1.5 rounded-[3px] text-[var(--darkgray)]',
              'data-[state=active]:bg-white data-[state=active]:text-[var(--darkgreen)] data-[state=active]:font-bold',
              'data-[state=active]:shadow-none border-0',
              'hover:bg-white/50 hover:text-[var(--darkgreen)]',
              'transition-all duration-200 ease-in-out',
              'text-[18px] leading-[1.4] tracking-[-0.36px]'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
      {children}
    </Tabs>
  );
};

export default CustomTabs;
