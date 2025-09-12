import { useState } from 'react';

import { Button, Flex, Input, Select } from 'antd';

import type { PostQueryParams } from '@app/posts';

import { SORT_FIELDS, SORT_ORDER } from './PostFilter.constants';
import type { PostFiltersProps } from './PostFilter.types';

import './PostFilter.styles.scss';

const { Option } = Select;
const { Search } = Input;

export const PostFilter = (props: PostFiltersProps) => {
  const { onChange, initialFilters = {} } = props;
  const [filters, setFilters] = useState<Partial<PostQueryParams>>(initialFilters);

  const handleUpdate = (changed: Partial<PostQueryParams>) => {
    const updated = { ...filters, ...changed };
    onChange(updated);
    setFilters({ ...updated, titlePrefix: '' });
  };

  return (
    <Flex wrap gap="middle" align="center" className="post-filter">
      <Search
        placeholder="Search by title..."
        allowClear
        onSearch={(val) => handleUpdate({ titlePrefix: val })}
        className="post-filter__search"
        onChange={(e) => setFilters({ ...filters, titlePrefix: e.target.value })}
        value={filters.titlePrefix}
      />

      <Select
        placeholder="Sort by"
        value={filters.orderByField}
        onChange={(val) => handleUpdate({ orderByField: val })}
        className="post-filter__select"
      >
        {SORT_FIELDS.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Order by"
        value={filters.order}
        onChange={(val) => handleUpdate({ order: val })}
        className="post-filter__select"
      >
        {SORT_ORDER.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>

      <Button onClick={() => handleUpdate(initialFilters)}>Reset</Button>
    </Flex>
  );
};
