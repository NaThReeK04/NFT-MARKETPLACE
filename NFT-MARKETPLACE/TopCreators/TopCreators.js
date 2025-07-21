export const getTopCreators = (creators) => {
  const finalCreators = [];

  // ✅ Prevent error if input is undefined or not an array
  if (!Array.isArray(creators)) {
    console.warn("⚠️ getTopCreators: Invalid input", creators);
    return finalCreators;
  }

  const finalResults = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );
    return index;
  }, {});

  Object.entries(finalResults).forEach(([seller, items]) => {
    const total = items
      .map((newItem) => Number(newItem.price))
      .reduce((prev, curr) => prev + curr, 0);

    finalCreators.push({ seller, total });
  });

  return finalCreators;
};
