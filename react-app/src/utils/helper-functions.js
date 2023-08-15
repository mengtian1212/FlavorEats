export const hasCommonCuisineType = (list1, list2) => {
  const set1 = new Set(list1.split("#"));
  const set2 = new Set(list2);

  for (const ele of set1) {
    console.log(set2, set1, ele.slice(1));
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
