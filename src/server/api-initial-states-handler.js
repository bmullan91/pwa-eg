module.exports = function(req, res) {
  const { contentType, slug } = req.params;
  const initialState = {
    context: {
      contentType,
      slug
    },
    primary: {
      hed: slug
    }
  };

  return res.json(initialState);
};
