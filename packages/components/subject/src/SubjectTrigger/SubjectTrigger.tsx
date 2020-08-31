import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import { SubjectTriggerProps } from '../Subject.types';

const SubjectTrigger: React.FC<SubjectTriggerProps> = ({
  iconPlaceholder,
  placeholder,
  selectedItem,
  color,
  onClick,
}) => {
  const icon = React.useMemo(() => {
    return selectedItem !== undefined ? selectedItem.icon : iconPlaceholder;
  }, [selectedItem, iconPlaceholder]);

  const label = React.useMemo(() => {
    return selectedItem !== undefined ? selectedItem.name : placeholder;
  }, [selectedItem, placeholder]);

  return (
    <Button type="custom-color" mode="two-icons" color={color} onClick={onClick}>
      <Icon component={icon} />
      {label}
      <Icon component={<AngleDownS />} />
    </Button>
  );
};

export default SubjectTrigger;
