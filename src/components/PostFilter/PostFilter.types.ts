import type { PostQueryParams } from '@app/posts';

export type PostFiltersProps = {
  onChange: (filters: PostQueryParams) => void;
  initialFilters?: Partial<PostQueryParams>;
};
