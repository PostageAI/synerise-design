import * as React from 'react';
import { ReactSortable } from 'react-sortablejs';
import Logic from '@synerise/ds-logic';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import Placeholder from '@synerise/ds-logic/dist/Placeholder/Placeholder';
import StepCard from '@synerise/ds-step-card';
import { LogicOperatorValue } from '@synerise/ds-logic/dist/Logic.types';
import { useIntl } from 'react-intl';
import * as S from './Filter.styles';
import { Expression, FilterProps } from './Filter.types';
import { MatchingWrapper } from './Filter.styles';

const SORTABLE_CONFIG = {
  ghostClass: 'ghost-element',
  className: 'sortable-list',
  handle: '.step-card-drag-handler',
  animation: 200,
  forceFallback: true,
  filter: '.ds-matching-toggle, .ds-cruds',
};

const component = {
  LOGIC: Logic,
  STEP: StepCard,
};

const Filter: React.FC<FilterProps> = ({
  expressions,
  matching,
  onChangeOrder,
  onChangeLogic,
  onChangeStepMatching,
  onChangeStepName,
  onDeleteStep,
  onDuplicateStep,
  renderStepFooter,
  renderStepContent,
  addFilterComponent,
  texts,
}) => {
  const [activeExpressionId, setActiveExpressionId] = React.useState<string | null>(null);

  const { formatMessage } = useIntl();
  const text = React.useMemo(
    () => ({
      addFilter: formatMessage({ id: 'DS.FILTER.ADD-FILTER' }),
      dropMeHere: formatMessage({ id: 'DS.FILTER.DROP-ME-HERE' }),
      ...texts,
      matching: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        ...texts?.matching,
      },
      step: {
        matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
        notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
        namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
        moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE' }),
        deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE' }),
        duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE' }),
        ...texts?.step,
      },
      placeholder: {
        chooseCondition: formatMessage({ id: 'DS.PLACEHOLDER.CHOOSE-CONDITION' }),
        getPreview: formatMessage({ id: 'DS.PLACEHOLDER.GET-PREVIEW' }),
      },
    }),
    [formatMessage, texts]
  );

  const getContextTypeTexts = React.useCallback(
    expression => {
      const contextType = expression.expressionType;
      return {
        matching:
          contextType === 'attribute'
            ? formatMessage({ id: 'DS.MATCHING.HAVE', defaultMessage: 'Have' })
            : formatMessage({ id: 'DS.MATCHING.PERFORMED', defaultMessage: 'Performed' }),
        notMatching:
          contextType === 'attribute'
            ? formatMessage({ id: 'DS.MATCHING.NOT-HAVE', defaultMessage: 'Not have' })
            : formatMessage({ id: 'DS.MATCHING.NOT-PERFORMED', defaultMessage: 'Not performed' }),
        conditionType:
          contextType === 'attribute'
            ? formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.ATTRIBUTE', defaultMessage: 'attribute' })
            : formatMessage({ id: 'DS.MATCHING.EXPRESSION-TYPE.EVENT', defaultMessage: 'event' }),
      };
    },
    [formatMessage]
  );

  const componentProps = React.useCallback(
    (expression: Expression) => {
      const contextTypeTexts = getContextTypeTexts(expression);

      const props = {
        LOGIC: {
          onChange: (value: LogicOperatorValue): void => onChangeLogic(expression.id, value),
        },
        STEP: {
          onChangeMatching: (value: boolean): void => onChangeStepMatching(expression.id, value),
          onChangeName: (value: string): void => onChangeStepName(expression.id, value),
          onDelete: (): void => onDeleteStep(expression.id),
          onDuplicate: (): void => onDuplicateStep(expression.id),
          footer: renderStepFooter && renderStepFooter(expression),
          children: renderStepContent && renderStepContent(expression),
          texts: {
            ...text.step,
            ...contextTypeTexts,
          },
        },
      };
      return props[expression.type];
    },
    [
      getContextTypeTexts,
      onChangeLogic,
      onChangeStepMatching,
      onChangeStepName,
      onDeleteStep,
      onDuplicateStep,
      renderStepContent,
      renderStepFooter,
      text.step,
    ]
  );

  const renderExpression = React.useCallback(
    (expression, index) => {
      const Component = component[expression.type];
      const LogicComponent = expression.logic && component[expression.logic.type];
      return (
        <S.ExpressionWrapper
          key={expression.id}
          data-dropLabel={text.dropMeHere}
          index={index}
          style={expression.id === activeExpressionId ? { zIndex: 10001 } : undefined}
          onClick={(): void => setActiveExpressionId(expression.id)}
        >
          <Component {...expression.data} {...componentProps(expression)} />
          {expression.logic && index + 1 < expressions.length && (
            <S.LogicWrapper>
              <LogicComponent {...expression.logic.data} {...componentProps(expression.logic)} />
            </S.LogicWrapper>
          )}
        </S.ExpressionWrapper>
      );
    },
    [componentProps, expressions.length, activeExpressionId, text]
  );

  return (
    <S.FilterWrapper>
      {matching && (
        <MatchingWrapper>
          <Matching {...matching} texts={text.matching} />
        </MatchingWrapper>
      )}
      <>
        {expressions.length > 0 ? (
          <ReactSortable {...SORTABLE_CONFIG} list={expressions} setList={onChangeOrder}>
            {expressions.map(renderExpression)}
          </ReactSortable>
        ) : (
          <Placeholder text={text.placeholder.chooseCondition} />
        )}
      </>
      {addFilterComponent && <S.AddButtonWrapper>{addFilterComponent}</S.AddButtonWrapper>}
    </S.FilterWrapper>
  );
};
export default Filter;
