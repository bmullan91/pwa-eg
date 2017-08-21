module.exports = function(req, res) {
  const { contentType, slug } = req.params;
  const initialState = {
    context: {
      contentType,
      slug
    },
    primary: {
      hed: slug || 'welcome'
    }
  };

  return res.json(initialState);
};
