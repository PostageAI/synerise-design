import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './Card.styles';

export interface CardProps {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  withHeader?: boolean;
  compactHeader?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: string;
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  headerSideChildren?: React.ReactNode;
  onHeaderClick?: (e: React.SyntheticEvent) => void;
}

const mapSizeToWidth = {
  small: 472,
  medium: 588,
  large: 996,
  extraLarge: 1232,
};

const Card: React.FC<CardProps> = ({
  children,
  raised,
  disabled,
  style,
  className,
  lively,
  withHeader,
  title,
  description,
  compactHeader,
  icon,
  size,
  iconColor,
  headerSideChildren,
  onHeaderClick,
}) => {
  const fatTitle = !description || (description && compactHeader);
  return (
    <S.Container
      size={size && mapSizeToWidth[size]}
      raised={raised}
      disabled={disabled}
      style={style}
      className={`ds-card ${className || ''}`}
      lively={lively}
    >
      {withHeader && (
        <S.Header isContentful={!!children} onClick={onHeaderClick}>
          {icon && (
            <S.IconContainer compact={compactHeader}>
              <Icon component={icon} color={iconColor} size={30} />
            </S.IconContainer>
          )}

          <S.HeaderContent compact={compactHeader} hasIcon={!!icon}>
            {title && (
              <S.Title level={4} fat={!!fatTitle}>
                {title}
              </S.Title>
            )}
            {description && <S.Description>{description}</S.Description>}
          </S.HeaderContent>

          {headerSideChildren && <S.HeaderSideChildren>{headerSideChildren}</S.HeaderSideChildren>}
        </S.Header>
      )}
      <S.ChildrenContainer>{children}</S.ChildrenContainer>
    </S.Container>
  );
};

export default Card;
