import * as React from 'react';
import { MultivalueProps } from './Multivalue.types';
import * as S from './MultiValue.styles';

const normalizePercent = (value: number): number => {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

const Multivalue: React.FC<MultivalueProps> = (props: MultivalueProps) => {
  const { values } = props;
  const sortedByPercent = values.sort((a, b) => {
    return b.percent - a.percent;
  });
  return (
    <S.Container>
      {sortedByPercent.map((val, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.Multivalue key={`${val.color}-${val.percent}-${index}`} color={val.color} percent={normalizePercent(val.percent)} />
      ))}
    </S.Container>
  );
};

export default Multivalue;
