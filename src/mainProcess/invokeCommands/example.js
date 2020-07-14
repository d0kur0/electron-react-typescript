const asyncCommand = async (event, { testMessage }) => {
  return Promise.resolve(testMessage.toUpperCase());
};

const syncCommand = (event, { testMessage }) => {
  return testMessage.toUpperCase();
};

module.exports = [
  {
    name: "asyncCommand",
    callback: asyncCommand,
  },
  {
    name: "syncCommand",
    callback: syncCommand,
  },
];
