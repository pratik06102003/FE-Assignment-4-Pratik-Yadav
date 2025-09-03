// import { PostCard } from './PostCard.component';

// import { Post } from '@app/posts';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import * as commonUtils from '@utils/common.utils';

// jest.mock('@utils/common.utils', () => ({
//   formatDate: jest.fn(),
// }));

// describe('PostCard', () => {
//   const mockFormatDate = commonUtils.formatDate as jest.MockedFunction<
//     typeof commonUtils.formatDate
//   >;

//   let user: ReturnType<typeof userEvent.setup>;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     user = userEvent.setup();
//   });

//   const basePost: Post = {
//     id: 'post-1',
//     title: 'Hello world',
//     content: 'short content',
//     createdAt: null,
//     authorId: 'author- 1',
//     author: { firstName: 'Test', lastName: 'Test', email: 'Test@mail.com' },
//     tags: undefined,
//   };

//   it('renders title and avatar', () => {
//     render(<PostCard post={basePost} onOpen={undefined} />);

//     // Title
//     expect(screen.getByText(basePost.title)).toBeInTheDocument();

//     // Avatar rendered (AntD gives an element with class "ant-avatar")
//     const avatar = document.querySelector('.ant-avatar');
//     expect(avatar).toBeTruthy();
//   });

//   it('calls onOpen with post.id when the card is clicked', async () => {
//     const onOpen = jest.fn();

//     const { container } = render(<PostCard post={basePost} onOpen={onOpen} />);

//     // Card has class "post-card" — click it with userEvent
//     const card = container.querySelector('.post-card');
//     expect(card).toBeTruthy();

//     await user.click(card!);
//     expect(onOpen).toHaveBeenCalledTimes(1);
//     expect(onOpen).toHaveBeenCalledWith(basePost.id);
//   });

//   it('shows author firstName when provided and uses "Anonymous" fallback when missing', () => {
//     const { rerender } = render(<PostCard post={basePost} onOpen={undefined} />);
//     expect(screen.getByText('Jane')).toBeInTheDocument();

//     // Rerender with no author -> shows "Anonymous"
//     const noAuthorPost = { ...basePost, author: undefined };
//     rerender(<PostCard post={noAuthorPost} onOpen={undefined} />);
//     expect(screen.getByText('Anonymous')).toBeInTheDocument();
//   });

//   it('displays formatted createdAt string when createdAt exists (using formatDate)', () => {
//     mockFormatDate.mockReturnValue('Jan 1, 2020');

//     const withDate = { ...basePost, createdAt: '2020-01-01T00:00:00.000Z' };
//     render(<PostCard post={withDate} onOpen={undefined} />);

//     expect(mockFormatDate).toHaveBeenCalledWith(withDate.createdAt);
//     expect(screen.getByText('Jan 1, 2020')).toBeInTheDocument();
//   });

//   it('does not render date element when createdAt is not provided', () => {
//     const withoutDate = { ...basePost, createdAt: undefined };
//     const { container } = render(<PostCard post={withoutDate} onOpen={undefined} />);

//     // component uses class "post-card__date" for the date text
//     const dateEl = container.querySelector('.post-card__date');
//     expect(dateEl).toBeNull();
//   });

//   it('renders a truncated preview when content length > 220 (220 chars + ellipsis)', () => {
//     const longContent = 'X'.repeat(300); // 300 chars
//     const post = { ...basePost, content: longContent };

//     render(<PostCard post={post} onOpen={undefined} />);

//     const expectedPreview = longContent.slice(0, 220) + '…';
//     expect(screen.getByText(expectedPreview)).toBeInTheDocument();

//     // Full content must NOT be present
//     expect(screen.queryByText(longContent)).toBeNull();
//   });

//   it('renders full preview (no ellipsis) when content length <= 220', () => {
//     const shortContent = 'Y'.repeat(220); // exactly 220
//     const post = { ...basePost, content: shortContent };

//     render(<PostCard post={post} onOpen={undefined} />);

//     const expectedPreview = shortContent;
//     expect(screen.getByText(expectedPreview)).toBeInTheDocument();
//     expect(screen.queryByText(expectedPreview + '…')).toBeNull();
//   });

//   it('renders up to 5 tags and ignores extras', () => {
//     const tags = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
//     const postWithTags = { ...basePost, tags };
//     const { container } = render(<PostCard post={postWithTags} onOpen={undefined} />);

//     // AntD Tag elements have class "ant-tag"
//     const tagEls = container.querySelectorAll('.ant-tag');
//     expect(tagEls.length).toBe(5);

//     // Ensure first five tags are present
//     for (let i = 0; i < 5; i++) {
//       expect(screen.getByText(tags[i])).toBeInTheDocument();
//     }

//     // Ensure 6th tag is not rendered
//     expect(screen.queryByText('six')).toBeNull();
//   });

//   it('renders no tags when post.tags is undefined or empty', () => {
//     const noTagsPost = { ...basePost, tags: [] };
//     const { container } = render(<PostCard post={noTagsPost} onOpen={undefined} />);

//     const tagEls = container.querySelectorAll('.ant-tag');
//     expect(tagEls.length).toBe(0);
//   });
// });
