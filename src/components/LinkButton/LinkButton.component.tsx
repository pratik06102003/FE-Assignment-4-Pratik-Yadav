import { Link } from 'react-router-dom';

import { Button } from 'antd';

import type { LinkButtonProps } from './LinkButton.types';

export const LinkButton = (props: LinkButtonProps) => {
  const { to, Icon, className, size, label } = props;
  return (
    <Link to={to} className={className}>
      <Button size={size} icon={<Icon />} tabIndex={-1}>
        {label}
      </Button>
    </Link>
  );
};
