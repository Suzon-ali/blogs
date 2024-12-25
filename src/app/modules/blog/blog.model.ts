import { Aggregate, model, Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//middlewares

blogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre('aggregate', function (next) {
  const aggregate = this as Aggregate<{ isDeleted: true }>;
  aggregate.pipeline().unshift({ $match: { $ne: true } });
  next();
});

//statics
blogSchema.statics.isBlogExistById = async function (id) {
  const existingBlog = Blog.findById({ _id: id });
  return existingBlog;
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
