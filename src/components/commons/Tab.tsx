interface TabProps {
  tabs: string[];
  activeTab: string;
  variant?: "fit" | "full" | "distributed";
  onTabClick: (tab: string) => void;
}

const Tab = ({ tabs, activeTab, variant = "full", onTabClick }: TabProps) => {
  const navContainerClasses = `
    items-center gap-x-2 rounded-[6px] bg-beige p-[5px] md:p-2
    ${variant === "fit" ? "inline-flex" : "flex overflow-x-auto"}
  `;

  const buttonBaseClasses = `
  flex-shrink-0 whitespace-nowrap rounded-[6px] py-1.5 md:py-2 px-3 text-center text-[18px] leading-[1.4] md:text-xl md:leading-[2.0]
  transition-all duration-200 focus:outline-none 
  focus-visible:ring-2 focus-visible:ring-darkgreen 
  focus-visible:ring-offset-2 focus-visible:ring-offset-beige
`;

  return (
    <nav className={navContainerClasses.trim()}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`
          ${buttonBaseClasses}
          ${variant === "distributed" ? "flex-1" : ""}
          ${activeTab === tab
              ? "bg-white text-darkgreen shadow font-bold"
              : "text-darkgray hover:bg-white/70 font-normal"
            }
        `}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tab;
