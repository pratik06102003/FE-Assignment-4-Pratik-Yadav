import { BREAKPOINTS, COLORS, TYPOGRAPHY } from './theme.constants';
import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: COLORS.PRIMARY_BLACK,
    colorTextBase: COLORS.TEXT_PRIMARY,
    colorTextSecondary: COLORS.TEXT_SECONDARY,
    colorBorder: COLORS.BACKGROUND_PRIMARY,
    colorLink: COLORS.LINK_PRIMARY,
    colorLinkHover: COLORS.LINK_PRIMARY_HOVER,
    borderRadius: 4,

    fontFamily: "'Inter', sans-serif",
    fontSize: TYPOGRAPHY.BASE_SIZE,
    lineHeight: TYPOGRAPHY.BASE_LINE_HEIGHT,

    fontSizeHeading1: TYPOGRAPHY.HEADINGS.H1.size,
    fontSizeHeading2: TYPOGRAPHY.HEADINGS.H2.size,
    fontSizeHeading3: TYPOGRAPHY.HEADINGS.H3.size,
    fontSizeHeading4: TYPOGRAPHY.HEADINGS.H4.size,
    fontSizeHeading5: TYPOGRAPHY.HEADINGS.H5.size,

    lineHeightHeading1: TYPOGRAPHY.HEADINGS.H1.lineHeight,
    lineHeightHeading2: TYPOGRAPHY.HEADINGS.H2.lineHeight,
    lineHeightHeading3: TYPOGRAPHY.HEADINGS.H3.lineHeight,
    lineHeightHeading4: TYPOGRAPHY.HEADINGS.H4.lineHeight,
    lineHeightHeading5: TYPOGRAPHY.HEADINGS.H5.lineHeight,

    // Breakpoints
    screenXS: BREAKPOINTS.XS,
    screenSM: BREAKPOINTS.SM,
    screenMD: BREAKPOINTS.MD,
    screenLG: BREAKPOINTS.LG,
    screenXL: BREAKPOINTS.XL,
    screenXXL: BREAKPOINTS.XXL,
  },
};
