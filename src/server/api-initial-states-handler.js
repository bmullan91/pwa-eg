module.exports = function(req, res) {
  const { contentType, slug } = req.params;
  const initialState = {
    context: {
      url: req.url,
      contentType,
      slug
    },
    primary: {
      hed: slug
    }
  };

  return res.json(initialState);
};
