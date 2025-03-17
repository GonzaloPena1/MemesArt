// import all models
// const Course = require("./course");
const Post = require("./post");
const Category = require("./category");
const User = require("./user");
// const EnrolledUser = require("./enrolled_user");

// Course.belongsTo(Category, {
//   foreignKey: "categoryId",
//   as: "category",
// });

// Category.hasMany(Course, {
//   foreignKey: "categoryId",
//   as: "courses",
// });

// User.belongsToMany(Course, {
//   through: EnrolledUser,
//   foreignKey: "userId",
// });

// Course.belongsToMany(User, {
//   through: EnrolledUser,
//   foreignKey: "courseId",
// });

// module.exports = {
//   Course,
//   Category,
//   User,
//   EnrolledUser,
// };
Post.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Post, {
  foreignKey: "categoryId",
  as: "posts",
});

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  Post,
  Category,
  User,
};
