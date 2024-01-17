const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) 0;
  let sum = 0;
  blogs.map((blog) => (sum += blog.likes));
  return sum;
};

module.exports = {
  dummy,
  totalLikes,
};
