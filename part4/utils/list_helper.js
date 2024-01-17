const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  const blogsLikes = blogs.map((blog) => blog.likes);
  return blogsLikes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const blogsLikes = blogs.map((blog) => blog.likes);
  const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes));
  const largestInfo = blogs[largestIndex];
  return {
    title: largestInfo.title,
    author: largestInfo.author,
    likes: largestInfo.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
