const showLogging = (level, message) => {
  console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString({ hourCycle: "h24" })}&-&${level}&-&${message}`);
};

module.exports = {
  showLogging
};
