export const capitalizeFirstChar = (words) => {
  let processedWord = words.trim().replace(/\s+/g, " ");
  const wordArr = processedWord.split(" ");
  const resArr = [];
  for (let word of wordArr) {
    const newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
    resArr.push(newWord);
  }
  return resArr.join(" ");
};
export const hasCommonCuisineType = (list1, list2) => {
  const set1 = new Set(list1.split("#"));
  const set2 = new Set(list2);

  for (const ele of set1) {
    if (set2.has(ele)) {
      return true;
    }
  }
  return false;
};

export const getMenuItemsByType = (popular, items) => {
  const res = { "Most Popular": popular };
  for (const itemId in items) {
    const item = items[itemId];
    const itemType = item.item_type;
    if (!res[itemType]) {
      res[itemType] = [];
    }
    res[itemType].push(item);
  }
  return res;
};

export const formatDate = (inputDateTime) => {
  const date = new Date(inputDateTime);
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `${formattedDate.split(",")[0]} at ${formattedDate.split(",")[1]}`;
};
