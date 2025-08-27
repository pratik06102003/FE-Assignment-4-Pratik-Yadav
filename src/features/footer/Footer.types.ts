export type FooterItemType = {
  key: string;
  icon: string;
  label: string;
  to: string;
};

export type CollapseMenuType = {
  key: string;
  label: string;
  children: FooterItemType[];
};
