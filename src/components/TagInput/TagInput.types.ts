export type TagInputProps = {
  tags: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  maxTags?: number;
  maxTagLength?: number;
};
