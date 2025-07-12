/**
 * Figma Design System Typography
 * 건국대학교 텍스트 스타일 시스템
 */

export const typography = {
  // Mobile Typography
  mobile: {
    small: {
      fontSize: "14px",
      lineHeight: "1.2",
      fontWeight: "400",
    },
    smallBold: {
      fontSize: "16px",
      lineHeight: "1.2",
      fontWeight: "600",
    },
    medium: {
      fontSize: "18px",
      lineHeight: "1.4",
      fontWeight: "400",
    },
    mediumBold: {
      fontSize: "18px",
      lineHeight: "1.4",
      fontWeight: "700",
    },
    logo: {
      fontSize: "12px",
      lineHeight: "1.2",
      fontWeight: "400",
    },
    logoBold: {
      fontSize: "12px",
      lineHeight: "1.2",
      fontWeight: "600",
    },
    extraSmall: {
      fontSize: "10px",
      lineHeight: "1",
      fontWeight: "400",
    },
    extraSmallBold: {
      fontSize: "10px",
      lineHeight: "1",
      fontWeight: "700",
    },
  },

  // Desktop Typography
  desktop: {
    small: {
      fontSize: "20px",
      lineHeight: "1.2",
      fontWeight: "400",
    },
    smallBold: {
      fontSize: "20px",
      lineHeight: "1.2",
      fontWeight: "600",
    },
    medium: {
      fontSize: "24px",
      lineHeight: "1.4",
      fontWeight: "400",
    },
    mediumBold: {
      fontSize: "24px",
      lineHeight: "1.4",
      fontWeight: "700",
    },
    big: {
      fontSize: "28px",
      lineHeight: "1.4",
      fontWeight: "400",
    },
    bigBold: {
      fontSize: "28px",
      lineHeight: "1.4",
      fontWeight: "700",
    },
    extraBig: {
      fontSize: "36px",
      lineHeight: "1.2",
      fontWeight: "400",
    },
    extraBigBold: {
      fontSize: "36px",
      lineHeight: "1.2",
      fontWeight: "700",
    },
    extraSmall: {
      fontSize: "16px",
      lineHeight: "1.2",
      fontWeight: "400",
    },
  },
} as const;

/**
 * Font families
 */
export const fontFamilies = {
  noto: ["Noto Sans", "sans-serif"],
  mont: ["Montserrat", "sans-serif"],
  system: ["system-ui", "sans-serif"],
} as const;

/**
 * Tailwind CSS typography class generators
 */
export const getTypographyClasses = {
  // Mobile typography
  mobile: {
    small: () => "text-mobile-small",
    smallBold: () => "text-mobile-small-bold",
    medium: () => "text-mobile-medium",
    mediumBold: () => "text-mobile-medium-bold",
    logo: () => "text-mobile-logo",
    logoBold: () => "text-mobile-logo-bold",
    extraSmall: () => "text-mobile-extrasmall",
    extraSmallBold: () => "text-mobile-extrasmall-bold",
  },

  // Desktop typography
  desktop: {
    small: () => "text-desktop-small",
    smallBold: () => "text-desktop-small-bold",
    medium: () => "text-desktop-medium",
    mediumBold: () => "text-desktop-medium-bold",
    big: () => "text-desktop-big",
    bigBold: () => "text-desktop-big-bold",
    extraBig: () => "text-desktop-extrabig",
    extraBigBold: () => "text-desktop-extrabig-bold",
    extraSmall: () => "text-desktop-extrasmall",
  },

  // Font families
  font: {
    noto: () => "font-noto",
    mont: () => "font-mont",
    system: () => "font-system",
  },
};

/**
 * Responsive typography helper
 */
export const responsiveTypography = {
  // Auto-select mobile/desktop based on breakpoint
  responsive: (mobileClass: string, desktopClass: string) =>
    `${mobileClass} lg:${desktopClass}`,

  // Common responsive patterns
  heading: () =>
    responsiveTypography.responsive(
      getTypographyClasses.mobile.mediumBold(),
      getTypographyClasses.desktop.bigBold()
    ),

  body: () =>
    responsiveTypography.responsive(
      getTypographyClasses.mobile.small(),
      getTypographyClasses.desktop.small()
    ),

  caption: () =>
    responsiveTypography.responsive(
      getTypographyClasses.mobile.extraSmall(),
      getTypographyClasses.desktop.extraSmall()
    ),
};

/**
 * CSS custom properties for typography
 */
export const typographyVariables = {
  // Generate CSS custom properties
  toCSSVariables: () => {
    const vars: Record<string, string> = {};

    // Mobile typography
    Object.entries(typography.mobile).forEach(([key, value]) => {
      vars[`--mobile-${key}-font-size`] = value.fontSize;
      vars[`--mobile-${key}-line-height`] = value.lineHeight.toString();
      vars[`--mobile-${key}-font-weight`] = value.fontWeight.toString();
    });

    // Desktop typography
    Object.entries(typography.desktop).forEach(([key, value]) => {
      vars[`--desktop-${key}-font-size`] = value.fontSize;
      vars[`--desktop-${key}-line-height`] = value.lineHeight.toString();
      vars[`--desktop-${key}-font-weight`] = value.fontWeight.toString();
    });

    return vars;
  },
};

export type MobileTypographyKey = keyof typeof typography.mobile;
export type DesktopTypographyKey = keyof typeof typography.desktop;
export type FontFamilyKey = keyof typeof fontFamilies;
