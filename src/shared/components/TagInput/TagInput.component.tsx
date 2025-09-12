import { useCallback, useState } from 'react';

import { Flex, Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import type { KeyboardEvent } from 'react';

import type { TagInputProps } from './TagInput.types';

export const TagInput = (props: TagInputProps) => {
  const {
    tags,
    onChange,
    disabled = false,
    placeholder = 'Add tags',
    maxTags = 10,
    maxTagLength = 50,
  } = props;
  const [input, setInput] = useState('');
  const [isInValidTag, setIsInvalidTag] = useState(false);

  const placeholderToDisplay = isInValidTag
    ? 'Tag is Too Long'
    : tags.length >= maxTags
      ? 'Tag limit reached'
      : placeholder;
  const addTags = useCallback(
    (tag: string) => {
      if (!tag) return;
      const trimmedTag = tag.trim().toLowerCase();
      if (trimmedTag.length > maxTagLength) {
        setIsInvalidTag(true);
        return;
      }
      setIsInvalidTag(false);

      const next = [...tags];
      if (next.length >= maxTags) return;
      if (!next.includes(trimmedTag)) next.push(trimmedTag);
      onChange(next);
    },
    [maxTags, maxTagLength, onChange, tags],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTags(input);
      setInput('');
    }
  };

  const removeTag = (tagToDelete: string) => {
    if (disabled) return;
    onChange(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Flex vertical gap={8} flex={1}>
      <Flex wrap>
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Flex>

      <Input
        placeholder={placeholderToDisplay}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || tags.length >= maxTags}
        style={{ minWidth: 160, width: 220 }}
        suffix={<PlusOutlined />}
      />
    </Flex>
  );
};
