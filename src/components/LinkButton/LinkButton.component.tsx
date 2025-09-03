import { Link } from 'react-router-dom';

import { Button } from 'antd';

import { ICONS } from '@constants/icon.constants';

import type { LinkButtonProps } from './LinkButton.types';

export const LinkButton = (props: LinkButtonProps) => {
  const { to, icon, className, size, label } = props;
  const Icon = ICONS[icon];
  return (
    <Link to={to} className={className}>
      <Button size={size} icon={<Icon />} tabIndex={-1}>
        {/* tabIndex -1: prevent button from receiving keyboard focus since it wrapped as a link */}
        {label}
      </Button>
    </Link>
  );
};
