import { KeyboardEvent, useCallback, useState } from 'react';

import { Flex, Input, Tag } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

type TagInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  maxTags?: number;
  maxTagLength?: number;
};

export const TagInput = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Add tag and press Enter or comma',
  maxTags = 10,
  maxTagLength = 50,
}: TagInputProps) => {
  const [input, setInput] = useState('');

  const addTags = useCallback(
    (raw: string) => {
      if (!raw) return;
      const trimmed = raw.trim().toLowerCase();
      if (trimmed.length > maxTagLength) return;
      const next = [...value];
      if (next.length >= maxTags) return;
      if (!next.includes(trimmed)) next.push(trimmed);
      onChange(next);
    },
    [maxTags, maxTagLength, onChange, value],
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
    onChange(value.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Flex vertical gap={8}>
      <Flex wrap>
        {value.map((t) => (
          <Tag key={t} closable onClose={() => removeTag(t)}>
            {t}
          </Tag>
        ))}
      </Flex>

      <Input
        placeholder={value.length >= maxTags ? 'Tag limit reached' : placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || value.length >= maxTags}
        style={{ minWidth: 160, width: 220 }}
        suffix={<PlusOutlined />}
      />
    </Flex>
  );
};
