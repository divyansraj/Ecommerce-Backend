exports.testProduct = (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "hi there from Products",
  });
};
