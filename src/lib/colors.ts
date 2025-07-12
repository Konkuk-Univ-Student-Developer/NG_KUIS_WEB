/**
 * Figma Design System Colors
 * 건국대학교 브랜드 컬러 시스템
 */

export const colors = {
  // Primary Colors
  darkgreen: "#036B3F",
  lightgreen: "#8BC34A",
  green: "#4CAF50",

  // Neutral Colors
  black: "#000000",
  white: "#FFFFFF",
  beige: "#EEF0E4",
  darkgray: "#656F76",
  lightgray: "#ECEBE3",
  coolgray: "#B1B3B4",
  warmgray: "#795548",

  // Accent Colors
  orange: "#F0A704",
  magenta: "#E91E63",
  yellow: "#FFEB3B",
  violet: "#9C27B0",
  blue: "#2196F3",
  danger: "#F44336",

  // State Colors
  success: "#4CAF50",
  warning: "#F0A704",
  error: "#F44336",
  info: "#2196F3",
} as const;

/**
 * Color variants for different use cases
 */
export const colorVariants = {
  // Button variants
  button: {
    primary: {
      bg: colors.darkgreen,
      text: colors.white,
      hover: "#024933", // darkgreen/90
      border: "transparent",
    },
    secondary: {
      bg: colors.lightgray,
      text: colors.darkgray,
      hover: "#D5D4CD", // lightgray/90
      border: colors.coolgray,
    },
    danger: {
      bg: colors.danger,
      text: colors.white,
      hover: "#D32F2F", // danger/90
      border: "transparent",
    },
  },

  // Status variants
  status: {
    success: {
      bg: "#E8F5E8",
      text: colors.darkgreen,
      border: colors.green,
    },
    warning: {
      bg: colors.beige,
      text: "#E65100",
      border: colors.orange,
    },
    error: {
      bg: "#FFEBEE",
      text: colors.danger,
      border: colors.danger,
    },
    info: {
      bg: "#E3F2FD",
      text: colors.blue,
      border: colors.blue,
    },
  },
} as const;

/**
 * Tailwind CSS class generators
 */
export const getColorClasses = {
  // Background colors
  bg: (colorName: keyof typeof colors) => `bg-${colorName}`,

  // Text colors
  text: (colorName: keyof typeof colors) => `text-${colorName}`,

  // Border colors
  border: (colorName: keyof typeof colors) => `border-${colorName}`,

  // Button variants
  button: (variant: keyof typeof colorVariants.button) => {
    const config = colorVariants.button[variant];
    return `bg-${config.bg} text-${config.text} hover:bg-[${config.hover}] border-${config.border}`;
  },

  // Status variants
  status: (variant: keyof typeof colorVariants.status) => {
    const config = colorVariants.status[variant];
    return `bg-[${config.bg}] text-[${config.text}] border-[${config.border}]`;
  },
};

/**
 * CSS custom properties for dynamic theming
 */
export const cssVariables = {
  // Generate CSS custom properties
  toCSSVariables: () => {
    const vars: Record<string, string> = {};
    Object.entries(colors).forEach(([key, value]) => {
      vars[`--color-${key}`] = value;
    });
    return vars;
  },

  // Generate CSS custom property references
  toCSSReferences: () => {
    const refs: Record<string, string> = {};
    Object.keys(colors).forEach((key) => {
      refs[key] = `var(--color-${key})`;
    });
    return refs;
  },
};

export type ColorName = keyof typeof colors;
export type ButtonVariant = keyof typeof colorVariants.button;
export type StatusVariant = keyof typeof colorVariants.status;

/**
 * Type-safe color class helpers
 */
export const getColorClass = (
  color: ColorName,
  type: "bg" | "text" | "border" = "bg"
): string => {
  return `${type}-${color}`;
};

export const getHoverColorClass = (
  color: ColorName,
  type: "bg" | "text" | "border" = "bg"
): string => {
  return `hover:${type}-${color}`;
};

export const getFocusColorClass = (
  color: ColorName,
  type: "bg" | "text" | "border" = "bg"
): string => {
  return `focus:${type}-${color}`;
};

/**
 * Get color variants for common use cases
 */
export const getButtonVariant = (variant: ButtonVariant) => {
  return colorVariants.button[variant];
};

export const getStatusVariant = (variant: StatusVariant) => {
  return colorVariants.status[variant];
};

/**
 * Validate if a color exists in the palette
 */
export const isValidColor = (color: string): color is ColorName => {
  return color in colors;
};

/**
 * Get color hex value by name
 */
export const getColorHex = (color: ColorName): string => {
  return colors[color];
};
