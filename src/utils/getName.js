export default path => {
  const parts = path.split('/');
  return parts[parts.length - 1].split('.')[0];
};
