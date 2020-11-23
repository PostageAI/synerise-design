import * as React from 'react';
import { LoaderProps } from './Loader.types';
import * as S from './Loader.styles';

const Loader: React.FC<LoaderProps> = ({ size= 'M', label, elementsPosition = 'right',color='blue', }) => {
  return (
    <S.LoaderWrapper className="ds-loader" elementsPosition={elementsPosition}>
      <S.Wrapper size={size}>
        <S.Loader size={size} color={color} />
      </S.Wrapper>
      <S.TextWrapper>{label}</S.TextWrapper>
    </S.LoaderWrapper>
  );
};
export default Loader;
