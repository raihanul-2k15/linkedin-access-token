const standard_input = process.stdin;
standard_input.setEncoding("utf-8");

module.exports = function() {
  return new Promise((res, rej) => {
    standard_input.on("data", data => {
      res(data.substring(0, data.length - 2));
    });
  });
};
