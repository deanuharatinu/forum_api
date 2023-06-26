/* eslint-disable class-methods-use-this */
class Comment {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, content, owner, is_deleted: isDeleted,
    } = payload;

    this.id = id;
    this.content = this._setDeletedComment(content, isDeleted);
    this.owner = owner;
  }

  _verifyPayload({ id, content, owner }) {
    if (!id || !content || !owner) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _setDeletedComment(content, isDeleted) {
    if (isDeleted) {
      return '**komentar telah dihapus**';
    }

    return content;
  }
}

module.exports = Comment;
