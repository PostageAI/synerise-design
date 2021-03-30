import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip from 'antd/lib/tooltip';
import * as React from 'react';
import { getPopupContainer } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import NotificationsM from '@synerise/ds-icon/dist/icons/NotificationsM';
import { Carousel } from 'antd';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Tooltip.styles';
import { tooltipTypes, descriptionType, TooltipProps } from './Tooltip.types';

const shouldRenderDescription = (description: descriptionType, type: tooltipTypes): descriptionType | null => {
  if (type === 'default' || !description) return null;
  return description;
};
const shouldRenderStatus = (status: React.ReactNode | null, type: tooltipTypes): descriptionType | null => {
  if (type === 'status' || status) return status;
  return null;
};

const Tooltip: React.FC<TooltipProps> = ({
  type = 'default',
  icon,
  title,
  status,
  description,
  tutorials,
  tutorialAutoplay = false,
  tutorialAutoplaySpeed = 5000,
  offset = 'default',
  children,
  button,
  ...props
}) => {
  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  const renderTooltip = (
    <S.TooltipComponent tooltipType={type}>
      <S.TooltipStatus tooltipType={type}>{type && shouldRenderStatus(status, type)}</S.TooltipStatus>
      <S.TooltipTitle tooltipType={type}>
        {type && shouldRenderIcon(type, icon)}
        {type !== 'largeSimple' ? title : null}
      </S.TooltipTitle>
      <S.TooltipDescription>{shouldRenderDescription(description, type)}</S.TooltipDescription>
    </S.TooltipComponent>
  );

  const renderButton = React.useMemo(() => {
    const buttonMode = (): string => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { buttonIcon, label } = button;
      if (buttonIcon && label) return 'icon-label';
      if (buttonIcon) return 'single-icon';
      return 'label';
    };

    return (
      <S.TooltipComponent tooltipType={type}>
        <S.TooltipContent>
          <S.TooltipStatus tooltipType={type}>{status}</S.TooltipStatus>
          <S.TooltipTitle tooltipType={type}>{title}</S.TooltipTitle>
          <S.TooltipDescription>{description}</S.TooltipDescription>
        </S.TooltipContent>
        {button && (
          <S.TooltipButton>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <Button type="ghost-white" mode={buttonMode()} onClick={button?.onClick}>
              {button?.buttonIcon}
              {button?.label}
            </Button>
          </S.TooltipButton>
        )}
      </S.TooltipComponent>
    );
  }, [button, type, title, description, status]);

  const renderTutorial = (
    <S.TooltipComponent tooltipType={type}>
      <Carousel autoplay={tutorialAutoplay} autoplaySpeed={tutorialAutoplaySpeed} effect="fade">
        {tutorials &&
          tutorials.map(tutorial => (
            <S.TutorialItem key={`${JSON.stringify(tutorial.title)}`}>
              <S.TooltipTitle tooltipType="tutorial">{tutorial.title}</S.TooltipTitle>
              <S.TooltipDescription>{tutorial.description}</S.TooltipDescription>
            </S.TutorialItem>
          ))}
      </Carousel>
    </S.TooltipComponent>
  );

  const tooltipComponent = React.useMemo(() => {
    if (type === 'tutorial') return renderTutorial;
    if (type === 'button') return renderButton;
    return renderTooltip;
  }, [type, renderTooltip, renderTutorial, renderButton]);

  const offsetClassName = React.useMemo(() => {
    return `ds-tooltip-offset-${offset}`;
  }, [offset]);

  const titleExists = Boolean(description || title || icon || tutorials?.length);

  return titleExists ? (
    <AntdTooltip
      overlayClassName={offsetClassName}
      autoAdjustOverflow={false}
      title={tooltipComponent}
      align={{ offset: [0, 0] }}
      getPopupContainer={getPopupContainer}
      {...props}
    >
      {children}
    </AntdTooltip>
  ) : (
    <>{children}</>
  );
};

export default Tooltip;
