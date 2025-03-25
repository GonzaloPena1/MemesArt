const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likedBy: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify([]),
  },
  comments: {
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify([]),
  },
});

module.exports = Post;
