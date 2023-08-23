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

// format address string "empire state building, 123 main street, new york, ny 10000"
// to "Empire State Building, 123 Main Street, New York, NY 10000"
export const formatAddress = (address, formatting = "list") => {
  let data = address.trim();
  const parts = data.split(",").map((part) => part.trim());

  // building_name, street_name, city: capitalize each first character
  const building_name = parts[0].trim();
  const street_name = parts[1].trim();
  const city = parts[2].trim();

  const building_name_formatted = capitalizeFirstChar(building_name);
  const street_name_formatted = capitalizeFirstChar(street_name);
  const city_formatted = capitalizeFirstChar(city);

  const state_zip = parts[3].split(" ");
  // state: all upper case
  const state = state_zip[0].trim();
  const state_formatted = state.toUpperCase();

  // zip: just trim
  const zip = state_zip[1].trim();
  if (formatting === "list") {
    return [
      building_name_formatted,
      street_name_formatted,
      city_formatted,
      state_formatted,
      zip,
    ];
  } else {
    return (
      building_name_formatted +
      ", " +
      street_name_formatted +
      ", " +
      city_formatted +
      ", " +
      state_formatted +
      " " +
      zip
    );
  }
};

export const calculateRatingDistribution = (reviews) => {
  if (!reviews || reviews.length === 0) return {};

  const ratings = reviews.map((review) => review.rating);

  // frequency of different ratings
  const ratingCount = {};
  ratings.forEach((rating) => {
    if (rating in ratingCount) {
      ratingCount[rating]++;
    } else {
      ratingCount[rating] = 1;
    }
  });
  // rating with most occurrences
  const mostCommonRating = Object.keys(ratingCount).reduce(
    (a, b) => (ratingCount[a] > ratingCount[b] ? a : b),
    0
  );

  // relative percentage of other ratings relative to the rating with most reviews
  const ratingPercents = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const key in ratingCount) {
    ratingPercents[key] = (
      ratingCount[key] / ratingCount[mostCommonRating]
    ).toFixed(2);
  }
  console.log(ratingPercents);
  return ratingPercents;
};

export const USSTATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const cuisine_types = [
  "Fast Food",
  "Healthy",
  "Bakery",
  "Mexican",
  "Chinese",
  "Burgers",
  "Pizza",
  "Vegan",
  "Vegetarian",
  "Indian",
  "Comfort Food",
  "Tacos",
  "Asian",
  "Bubble Tea",
  "Ramen",
  "French",
  "Japanese",
  "Dessert",
  "BBQ",
  "Salads",
  "American",
  "Coffee & Tea",
  "Seafood",
  "European",
  "Alcohol",
  "Breakfast",
  "Sushi",
  "Italian",
  "Ice cream",
  "Burritos",
  "Gluten-free",
  "Halal",
  "Korean",
];
