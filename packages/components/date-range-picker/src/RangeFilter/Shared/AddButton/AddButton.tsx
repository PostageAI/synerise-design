import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import { AddButtonProps } from './AddButton.types';

const AddButton: React.FC<AddButtonProps> = ({ label, ...rest }: AddButtonProps) => {
  const icon = React.useMemo(() => <Icon component={<Add3M />} />, []);
  return (
    <Button mode="icon-label" type="ghost" {...rest}>
      {icon}
      {label}
    </Button>
  );
};

export default React.memo(AddButton);
