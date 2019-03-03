const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "8.0"
      }
    }
  ]
];

module.exports = {
  presets,
  comments: false
};