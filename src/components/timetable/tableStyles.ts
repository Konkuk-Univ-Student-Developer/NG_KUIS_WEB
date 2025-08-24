// Table style constants for mobile and desktop variants

export const tableStyles = {
  mobile: {
    table: {
      wrapper:
        "overflow-hidden rounded-lg overflow-x-auto border border-zinc-400",
      base: "w-full border-collapse",
      headerRow: "bg-beige",
      bodyRow: "bg-white",
    },
    cell: {
      headerBase:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
      bodyBase:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none",
      firstHeader:
        "border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
      bodyBold:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    },
    evaluation: {
      expandRow: "bg-white cursor-pointer hover:bg-gray-50",
      chevron:
        "w-4 h-4 text-[#036B3F] mx-auto transition-transform duration-300",
      chevronDisabled: "w-4 h-4 text-gray-400 mx-auto",
      expandedContent:
        "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none transition-all duration-300 ease-in-out cursor-pointer",
    },
  },
  desktop: {
    table: {
      wrapper: "overflow-hidden rounded-lg border border-zinc-400",
      base: "w-full border-collapse",
      headerRow: "bg-beige",
      bodyRow: "bg-white",
    },
    cell: {
      headerBase:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5",
      bodyBase:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-5",
      firstHeader:
        "border-zinc-400 px-2 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5",
      bodyBold:
        "border-zinc-400 px-3 py-2 text-center text-black text-sm font-bold font-['Noto_Sans'] leading-5",
    },
    evaluation: {
      expandRow: "bg-white cursor-pointer hover:bg-gray-50",
      chevron:
        "w-6 h-6 text-[#036B3F] mx-auto transition-transform duration-300",
      chevronDisabled: "w-6 h-6 text-gray-400 mx-auto",
      expandedContent:
        "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-5 transition-all duration-300 ease-in-out cursor-pointer",
    },
  },
  // Legacy styles for backward compatibility
  table: {
    wrapper:
      "overflow-hidden rounded-lg overflow-x-auto border border-zinc-400",
    base: "w-full border-collapse",
    headerRow: "bg-beige",
    bodyRow: "bg-white",
  },
  cell: {
    headerBase:
      "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBase:
      "border-zinc-400 px-3 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none",
    firstHeader:
      "border-zinc-400 px-2 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
    bodyBold:
      "border-zinc-400 px-3 py-2 text-center text-black text-sm font-semibold font-['Noto_Sans'] leading-none",
  },
  evaluation: {
    expandRow: "bg-white cursor-pointer hover:bg-gray-50",
    chevron: "w-4 h-4 text-[#036B3F] mx-auto transition-transform duration-300",
    chevronDisabled: "w-4 h-4 text-gray-400 mx-auto",
    expandedContent:
      "bg-white border border-gray-500 rounded px-2 py-2 text-center text-black text-sm font-normal font-['Noto_Sans'] leading-none transition-all duration-300 ease-in-out cursor-pointer",
  },
};
