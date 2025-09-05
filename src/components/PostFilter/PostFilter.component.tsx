import { useState } from 'react';

import { Button, Flex, Input, Select } from 'antd';

import './PostFilter.Styles.scss';
import type { PostQueryParams } from '@app/posts';

const { Option } = Select;
const { Search } = Input;

export type PostFiltersProps = {
  onChange: (filters: PostQueryParams) => void;
  initialFilters?: Partial<PostQueryParams>;
};

export const PostFilter = ({ onChange, initialFilters = {} }: PostFiltersProps) => {
  const [filters, setFilters] = useState<Partial<PostQueryParams>>(initialFilters);

  const handleUpdate = (changed: Partial<PostQueryParams>) => {
    const updated = { ...filters, ...changed };
    onChange(updated);
    setFilters({ ...updated, titlePrefix: '' });
  };

  return (
    <Flex wrap gap="middle" align="center" className="post-filter">
      {/* Title Search */}
      <Search
        placeholder="Search by title..."
        allowClear
        onSearch={(val) => handleUpdate({ titlePrefix: val })}
        className="post-filter__search"
        onChange={(e) => setFilters({ ...filters, titlePrefix: e.target.value })}
        value={filters.titlePrefix}
      />

      {/* Sorting */}
      <Select
        placeholder="Sort by"
        value={filters.orderByField}
        onChange={(val) => handleUpdate({ orderByField: val })}
        className="post-filter__select"
      >
        <Option value="createdAt">Created Date</Option>
        <Option value="title">Title</Option>
      </Select>

      <Select
        placeholder="Order by"
        value={filters.order}
        onChange={(val) => handleUpdate({ order: val })}
        className="post-filter__select"
      >
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>

      <Button onClick={() => handleUpdate(initialFilters)}>Reset</Button>
    </Flex>
  );
};
