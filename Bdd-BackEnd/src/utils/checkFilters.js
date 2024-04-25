const isFilterValid = (filter) => {
  if (filter === "low" || filter === "medium" || filter === "high") {
    return true;
  }
  return false;
};

module.exports = isFilterValid;
