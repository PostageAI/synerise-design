import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ListItem = styled.div`
  width: 16.666%;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  button {
    transition-duration: 0s;
  }
`;
export const OverlayWrapper = styled.div`
  padding: 6px;
`;

export const Overlay = styled.span`
  width: 250px;
  background-color: ${(props): string => props.theme.palette.white};
  position: relative;
  display: block;
  border-radius: 3px;

  ${OverlayWrapper}:not(:last-child) {
    &::after {
      content: '';
      display: flex;
      width: calc(100% - 6px);
      height: 1px;
      background-image: linear-gradient(
        to right,
        ${({ theme }): string => theme.palette.white} 40%,
        ${({ theme }): string => theme.palette['grey-300']} 100%,
        transparent 0%
      );
      background-position: 0 bottom;
      background-size: 4px 1px;
      background-repeat: repeat-x;
      margin: 4px auto 0;
    }
  }

  ${OverlayWrapper}:first-child {
    padding-top: 16px;
  }
`;

export const Title = styled.div`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props): string => props.theme.palette['grey-500']};
  padding: 0 4px 8px 4px;
`;

export const FontIcon = styled.div`
  font-family: 'apple color emoji,segoe ui emoji,noto color emoji,android emoji,emojisymbols,emojione mozilla,twemoji mozilla,segoe ui symbol';
  font-size: 18px;
  line-height: 35px;
`;

export const IconTrigger = styled.div`
  display: inline-block;
  cursor: pointer;

  &&& {
    .icon-wrapper {
      display: flex;
      pointer-events: none;
      svg {
        fill: currentColor;
      }
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 144dpi) {
    letter-spacing: -0.2em;
  }
`;

export const NoResults = styled.div`
  min-height: 206px;
  display: flex;
  justify-content: center;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(148, 158, 166, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin-top: 42px;

  p {
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.43;
    text-align: center;
  }
`;
