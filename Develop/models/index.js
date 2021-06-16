const user = require('./users');
const post = require('./posts');
const comment = require('./comments');

user.hasMany(post, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

post.belongsTo(user, {
    foreignKey: 'author_id',
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
});

module.exports = { user, post, comment };