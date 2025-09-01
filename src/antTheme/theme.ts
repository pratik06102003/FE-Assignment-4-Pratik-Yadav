import { ThemeConfig } from 'antd';

import { getCssVar } from './theme.utils';

export function loadTheme() {
  const theme: ThemeConfig = {
    token: {
      colorPrimary: getCssVar('--primary-black'),
      colorTextBase: getCssVar('--text-primary'),
      colorTextSecondary: getCssVar('--text-secondary'),

      colorBorder: getCssVar('--border-primary'),
      colorBorderSecondary: getCssVar('--border-secondary'),

      colorLink: getCssVar('--link-primary'),
      colorLinkHover: getCssVar('--link-primary-hover'),

      colorSuccess: getCssVar('--success'),
      colorWarning: getCssVar('--warning'),
      colorError: getCssVar('--error'),

      colorHighlight: getCssVar('--highlight'),

      // Typography
      fontSize: Number(getCssVar('--base-font-size')),
      lineHeight: Number(getCssVar('--base-line-height')),

      fontSizeHeading1: Number(getCssVar('--heading-h1-size')),
      lineHeightHeading1: Number(getCssVar('--heading-h1-line-height')),
      fontSizeHeading2: Number(getCssVar('--heading-h2-size')),
      lineHeightHeading2: Number(getCssVar('--heading-h2-line-height')),
      fontSizeHeading3: Number(getCssVar('--heading-h3-size')),
      lineHeightHeading3: Number(getCssVar('--heading-h3-line-height')),
      fontSizeHeading4: Number(getCssVar('--heading-h4-size')),
      lineHeightHeading4: Number(getCssVar('--heading-h4-line-height')),
      fontSizeHeading5: Number(getCssVar('--heading-h5-size')),
      lineHeightHeading5: Number(getCssVar('--heading-h5-line-height')),

      // Breakpoints
      screenXS: Number(getCssVar('--breakpoint-xs')),
      screenSM: Number(getCssVar('--breakpoint-sm')),
      screenMD: Number(getCssVar('--breakpoint-md')),
      screenLG: Number(getCssVar('--breakpoint-lg')),
      screenXL: Number(getCssVar('--breakpoint-xl')),
      screenXXL: Number(getCssVar('--breakpoint-xxl')),
    },
  };

  return theme;
}
