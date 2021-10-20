import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/dom';
import Menu from '@synerise/ds-menu';
import { VarTypeStringM } from '@synerise/ds-icon';

import Search from './../Search';

const parametersList = [
  { text: 'City', icon: <VarTypeStringM /> },
  { text: 'Country', icon: <VarTypeStringM /> },
];

const recent = [{ text: 'Chicago', filter: 'City', icon: <VarTypeStringM /> }];

const suggestions = [{ text: 'Cirilla' }];
const PLACEHOLDER = 'placeholder';
const SUGGESTIONS_TITLE = 'suggestions';
const PARAMETERS_TITLE = 'parameters';
const RECENT_TITLE = 'recent';
const INPUT_VALUE = 'input value';
const FILTER_VALUE = 'input value';
const textLookupConfig = {
  parameters: 'text',
  recent: 'text',
  suggestions: 'text',
};

const NOOP = () => {};

const parametersDisplayProps = {
  tooltip: 'Parameters',
  title: PARAMETERS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => <Menu.Item onItemHover={NOOP}>{item && (item as { text: string }).text}</Menu.Item>,
};
const suggestionsDisplayProps = {
  tooltip: 'Suggest',
  title: SUGGESTIONS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => <Menu.Item onItemHover={NOOP}>{item && (item as { text: string }).text}</Menu.Item>,
};
const recentDisplayProps = {
  tooltip: 'Recent',
  title: RECENT_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => <Menu.Item onItemHover={NOOP}>{item && (item as { text: string }).text}</Menu.Item>,
};

// const INPUT_EXPAND_ANIMATION_DURATION = 200;
// const waitForDropdownToExpand = () => new Promise(r => setTimeout(r, INPUT_EXPAND_ANIMATION_DURATION));
const dropdownMaxHeight = 400;
describe('Search with dropdown', () => {
  it('should render', () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip="clear"
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={INPUT_VALUE}
        width={200}
      />
    );

    // ASSERT
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={''}
        width={200}
      />
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={''}
        width={200}
      />
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;

    // ACT
    await btn.click();
    await waitFor(
      () => {
        const parameter = screen.getByText('City') as HTMLInputElement;
        parameter.click();
        // ASSERT
        expect(onParameterValueChange).toBeCalledWith('City', { text: 'City', icon: <VarTypeStringM /> });
      },
      {
        timeout: 1000,
      }
    );
  });

  it('should render input with value', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={'TestValue'}
        width={200}
      />
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const inputWithValue = screen.getByDisplayValue('TestValue') as HTMLInputElement;
    // ASSERT
    expect(inputWithValue).toBeTruthy();
  });

  it('should render suggestions with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip="clear"
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue="City"
          placeholder={PLACEHOLDER}
          recent={recent}
          recentDisplayProps={recentDisplayProps}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLButtonElement;
    // ACT
    userEvent.click(btn);
    userEvent.click(screen.getByText(/City/i));

    const title = screen.getByText(SUGGESTIONS_TITLE);
    expect(title).toBeTruthy();
  });

  it('should render parameters with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue=""
          placeholder={PLACEHOLDER}
          recentDisplayProps={recentDisplayProps}
          recent={recent}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    userEvent.click(btn);

    const title = screen.getByText(PARAMETERS_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });

  it('should render recent with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue=""
          placeholder={PLACEHOLDER}
          recent={recent}
          recentDisplayProps={recentDisplayProps}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const title = screen.getByText(RECENT_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });

  it('should call onClear when click on clear btn', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue="city"
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value="Chicago"
        width={200}
      />
    );
    userEvent.click(screen.getByTestId('clear'));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
