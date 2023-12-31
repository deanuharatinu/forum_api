const CommentDetailWithoutReplies = require('../CommentDetailWithoutReplies');

describe('a CommentDetailWithoutReplies entities', () => {
  it('should throw error when paylod did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new CommentDetailWithoutReplies(payload)).toThrowError('COMMENT_DETAIL_WITHOUT_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specs', () => {
    // Arrange
    const payload = {
      id: 123,
      username: true,
      date: 123,
      content: '123',
    };

    // Action and Assert
    expect(() => new CommentDetailWithoutReplies(payload)).toThrowError('COMMENT_DETAIL_WITHOUT_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'john doe',
      date: '2021-08-08T07:22:33.555Z"',
      content: 'this is a comment',
    };

    // Action
    const commentDetail = new CommentDetailWithoutReplies(payload);

    // Assert
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.date).toEqual(payload.date);
    expect(commentDetail.content).toEqual(payload.content);
    expect(commentDetail.replies).toEqual([]);
  });

  it('should hide content if comment was deleted', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'john doe',
      date: '2021-08-08T07:22:33.555Z"',
      content: 'this is a comment',
      is_deleted: true,
    };

    // Action
    const commentDetail = new CommentDetailWithoutReplies(payload);

    // Assert
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.date).toEqual(payload.date);
    expect(commentDetail.content).toEqual('**komentar telah dihapus**');
    expect(commentDetail.replies).toEqual([]);
  });

  it('should show content if comment not deleted', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'john doe',
      date: '2021-08-08T07:22:33.555Z"',
      content: 'this is a comment',
      is_deleted: false,
    };

    // Action
    const commentDetail = new CommentDetailWithoutReplies(payload);

    // Assert
    expect(commentDetail.id).toEqual(payload.id);
    expect(commentDetail.username).toEqual(payload.username);
    expect(commentDetail.date).toEqual(payload.date);
    expect(commentDetail.content).toEqual(payload.content);
    expect(commentDetail.replies).toEqual([]);
    expect(commentDetail).toStrictEqual(new CommentDetailWithoutReplies({
      id: 'comment-123',
      username: 'john doe',
      date: '2021-08-08T07:22:33.555Z"',
      content: 'this is a comment',
      is_deleted: false,
      replies: [],
    }));
  });
});
