export default (fullTagsConfig, id) => {
  return (fullTagsConfig.find(tag => tag.id === id) || fullTagsConfig[0])
}
