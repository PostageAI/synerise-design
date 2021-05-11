import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import InfoFillS from '@synerise/ds-icon/dist/icons/InfoFillS';

import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import CameraM from '@synerise/ds-icon/dist/icons/CameraM';
import FileViewAvatar from './FileViewAvatar/FileViewAvatar';
import { FileContent } from '../../dist/FileUploader.types';
import * as S from './AvatarUploader.styles';
import { FileViewAvatarTexts } from './FileViewAvatar/FileViewAvatar.types';
import { FileUploaderProps } from '../FileUploader.types';

function readAsText(file: File): Promise<FileContent> {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    file.type !== 'text/plain' && resolve(null);
    reader.onerror = (): void => resolve(null);
    reader.onload = (): void => resolve(reader.result);

    reader.readAsText(file);
  });
}

const AvatarUploader: React.FC<FileUploaderProps> = ({
  className,
  onUpload,
  disabled,
  accept,
  error,
  label,
  onRemove,
  description,
  tooltip,
  filesAmount,
  mode = 'single',
  removable = true,
  files = [],
  texts = {
    buttonLabel: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-LABEL" />,
    buttonDescription: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-DESC" />,
    size: <FormattedMessage id="DS.FILE-UPLOADER.SIZE" />,
    removeTooltip: <FormattedMessage id="DS.FILE-UPLOADER.REMOVE" />,
  },
}) => {
  const [uploadSuccess, setUploadSuccess] = React.useState(true);

  const readFilesContent = React.useCallback(
    (addedFiles: File[]) => {
      const readerPromises = addedFiles.map(
        (file): Promise<FileContent> => {
          return readAsText(file);
        }
      );
      Promise.all(readerPromises).then((filesContent: FileContent[]): void => {
        const filesWithContent = addedFiles.map((file, index) => {
          return Object.assign(file, { content: filesContent[index] });
        });
        onUpload && onUpload(filesWithContent);
      });
    },
    [onUpload]
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      let possibleUpload = 0;
      if (filesAmount) {
        possibleUpload = filesAmount - files.length;
      }
      if (possibleUpload !== 0 && acceptedFiles.length > possibleUpload) {
        setUploadSuccess(false);
      } else {
        setUploadSuccess(true);
        readFilesContent(acceptedFiles);
      }
    },
    [filesAmount, files, setUploadSuccess, readFilesContent]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ? accept.join(',') : undefined,
    multiple: mode !== 'single',
    onDrop,
    disabled,
  });

  if (filesAmount && filesAmount < 1) {
    // eslint-disable-next-line no-param-reassign
    filesAmount = 1;
    throw new Error('Invalid value of property "filesAmount" ');
  }

  const hasError = Boolean(error) || !uploadSuccess;
  const [pressed, setPressed] = React.useState<boolean>(false);
  return (
    <S.Container className={`ds-file-avatar-uploader ${className || ''}`}>
      {label && (
        <S.Label>
          <span>{label}</span>
          {tooltip && (
            <Tooltip trigger="hover" placement="top" title={tooltip}>
              <span data-testid="tooltip-info">
                <Icon component={<InfoFillS />} size={24} />
              </span>
            </Tooltip>
          )}
        </S.Label>
      )}
      {files.length > 0 &&
      files.map((file, index) => (
        <FileViewAvatar
          key={file.file.lastModified}
          texts={texts as FileViewAvatarTexts}
          removable={removable}
          onRemove={(): void => onRemove && onRemove(file.file, index)}
          data={file}
          description={description}
        />
      ))}
      {((mode !== 'single' && (filesAmount ? files.length < filesAmount : true)) || files.length === 0) && (
        <S.UploaderContainer>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <S.DropAreaContainer {...getRootProps()} canUploadMore={mode !== 'single' && files.length > 0}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...getInputProps()} data-testid="drop-area-input" />

            <S.DropAreaButton
              type="button"
              mode={mode}
              disabled={disabled}
              isDropping={isDragActive}
              hasError={hasError}
              onMouseDown={(): void => setPressed(true)}
              onMouseUp={(): void => setPressed(false)}
              pressed={pressed}
              data-testid="drop-area"
              filesLength={files.length}
            >
                <>
                  <Icon component={<CameraM />} size={36} />
                </>
            </S.DropAreaButton>
          </S.DropAreaContainer>
        </S.UploaderContainer>
      )}
      <div>
        {((mode !== 'single' && (filesAmount ? files.length < filesAmount : true)) || files.length === 0) && (
          <>
      <Button {...getRootProps()} disabled={disabled} type='secondary' mode='icon-label'>
        <Icon  component={<Add3M/>} size={24} />
        Add file
      </Button>
      {description && <S.Description hasError={hasError}>{description}</S.Description>}
      </>
        )}
      </div>
    </S.Container>
  );
};

export default AvatarUploader;
