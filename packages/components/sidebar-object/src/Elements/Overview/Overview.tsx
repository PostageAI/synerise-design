import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import * as S from '../Header/Header.style';
import DropdownOverlay from '../DropdownOverlay/DropdownOverlay';
import Content from '../Content/Content';
import ObjectSummary from '../ObjectSummary/ObjectSummary';
import { OverviewObjectProps } from './Overview.types';

const Overview: React.FC<OverviewObjectProps> = ({
  inputObject,
  contentTags,
  folders,
  foldersDisplayKey = 'name',
  foldersFilterKey = 'name',
  foldersIdKey = 'id',
  parentFolder,
  texts,
  textDescription,
  onFolderSelect,
  onDescriptionChange,
  descriptionProps = {},
  onAddFolderClick,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const onClearInput = (): void => {
    setValue('');
  };
  return (
    <S.OverviewWrapper>
      <S.HeaderWrapper dashed={!!onFolderSelect}>
        {onFolderSelect && (
          <>
            {texts?.folder}:{' '}
            <Dropdown
              visible={dropdownVisible}
              overlay={
                <DropdownOverlay
                  texts={texts}
                  parentFolder={parentFolder}
                  data={folders}
                  onDropdownOutsideClick={(): void => setDropdownVisible(false)}
                  onClearInput={onClearInput}
                  searchValue={value}
                  onSearchChange={setValue}
                  onFolderSelect={(folder): void => {
                    onFolderSelect && onFolderSelect(folder);
                    setDropdownVisible(false);
                  }}
                  foldersDisplayKey={foldersDisplayKey}
                  foldersFilterKey={foldersFilterKey}
                  foldersIdKey={foldersIdKey}
                  onAddFolderClick={onAddFolderClick}
                />
              }
            >
              <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} mode="label-icon" type="ghost">
                {parentFolder?.name}
                <Icon component={<AngleDownS />} />
              </Button>
            </Dropdown>
          </>
        )}
      </S.HeaderWrapper>
      <Content
        descriptionProps={descriptionProps}
        onFolderSelect={onFolderSelect}
        texts={texts}
        onDescriptionChange={onDescriptionChange}
        textDescription={textDescription}
        mainContent={<ObjectSummary inputObject={inputObject} />}
        tags={contentTags}
      />
    </S.OverviewWrapper>
  );
};
export default Overview;
