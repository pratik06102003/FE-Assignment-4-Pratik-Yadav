import { ThemeConfig } from 'antd';

import { getCssVar } from './theme.utils';

export function loadTheme() {
  const theme: ThemeConfig = {
    token: {
      colorPrimary: getCssVar('--primary-black') as string,
      colorTextBase: getCssVar('--text-primary') as string,
      colorTextSecondary: getCssVar('--text-secondary') as string,

      colorBorder: getCssVar('--border-primary') as string,
      colorBorderSecondary: getCssVar('--border-secondary') as string,

      colorLink: getCssVar('--link-primary') as string,
      colorLinkHover: getCssVar('--link-primary-hover') as string,

      colorSuccess: getCssVar('--success') as string,
      colorWarning: getCssVar('--warning') as string,
      colorError: getCssVar('--error') as string,

      colorHighlight: getCssVar('--highlight') as string,

      // Typography
      fontSize: getCssVar('--base-font-size') as number,
      lineHeight: getCssVar('--base-line-height') as number,

      fontSizeHeading1: getCssVar('--heading-h1-size') as number,
      lineHeightHeading1: getCssVar('--heading-h1-line-height') as number,
      fontSizeHeading2: getCssVar('--heading-h2-size') as number,
      lineHeightHeading2: getCssVar('--heading-h2-line-height') as number,
      fontSizeHeading3: getCssVar('--heading-h3-size') as number,
      lineHeightHeading3: getCssVar('--heading-h3-line-height') as number,
      fontSizeHeading4: getCssVar('--heading-h4-size') as number,
      lineHeightHeading4: getCssVar('--heading-h4-line-height') as number,
      fontSizeHeading5: getCssVar('--heading-h5-size') as number,
      lineHeightHeading5: getCssVar('--heading-h5-line-height') as number,

      // Breakpoints
      screenXS: getCssVar('--breakpoint-xs') as number,
      screenSM: getCssVar('--breakpoint-sm') as number,
      screenMD: getCssVar('--breakpoint-md') as number,
      screenLG: getCssVar('--breakpoint-lg') as number,
      screenXL: getCssVar('--breakpoint-xl') as number,
      screenXXL: getCssVar('--breakpoint-xxl') as number,
    },
    components: {
      Typography: {
        margin: 0,
        titleMarginTop: 0,
        titleMarginBottom: 0,
      },
    },
  };

  return theme;
}
