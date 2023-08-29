from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


cusine_types = ["Fast Food", "Healthy", "Bakery", "Mexican", "Chinese", "Burgers",
                "Pizza", "Vegan", "Indian", "Comfort Food", "Tacos",
                "Asian", "Bubble Tea", "Ramen", "French", "Japanese", "Desserts",
                "BBQ", "Salads", "American", "Coffee", "Seafood", "European",
                "Alcohol", "Breakfast", "Sushi", "Italian", "Ice cream", "Burritos"]


def seed_menuitems():
    menuitems = [
        {  # 1
            "restaurant_id": 1,
            "item_name": "Big Mac",
            "item_type": "Burgers",
            "price": 7.79,
            "calory": 590,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Ever wondered what's on a Big Mac? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun."
        },
        {  # 2
            "restaurant_id": 1,
            "item_name": "Cheeseburger",
            "item_type": "Burgers",
            "price": 4.09,
            "calory": 300,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0003_Cheeseburger_StraightBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Enjoy the cheesy deliciousness of a McDonald's Cheeseburger! Our simple, classic cheeseburger begins with a 100% pure beef burger patty seasoned with just a pinch of salt and pepper. "
        },
        {  # 3
            "restaurant_id": 1,
            "item_name": "Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 7.29,
            "calory": 520,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0007-005_QuarterPounderwithCheese_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Each Quarter Pounder with Cheese burger features a ¼ lb.* of 100% fresh beef that's hot, deliciously juicy and cooked when you order. "
        },
        {  # 4
            "restaurant_id": 1,
            "item_name": "Double Hamburger",
            "item_type": "Burgers",
            "price": 4.19,
            "calory": 340,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0001_Hamburger_Alt_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The Classic McDonald's Hamburger starts with a 100% pure beef patty seasoned with just a pinch of salt and pepper. Then, the McDonald's burger is topped with a tangy pickle, chopped onions, ketchup, and mustard. "
        },
        {  # 5
            "restaurant_id": 1,
            "item_name": "Cheesy Jalapeño Bacon Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 11.79,
            "calory": 870,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_CheesyJalapenoBaconQPC_Single_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Introducing McDonald's new Cheesy Jalapeño Bacon QPC, featuring our 100% fresh beef Quarter Pounder patty that's cooked right when you order so it's hot and juicy every time. "
        },
        {  # 6
            "restaurant_id": 1,
            "item_name": "Bacon Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 9.19,
            "calory": 650,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_4295-005_BaconQPC_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Each Quarter Pounder with Cheese Bacon burger features thick-cut applewood smoked bacon atop a ¼ lb.* of 100% McDonald's fresh beef that's cooked when you order."
        },
        {  # 7
            "restaurant_id": 1,
            "item_name": "McChicken",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 4.39,
            "calory": 400,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201909_4314_McChicken_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "It's a classic for a reason. Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun."
        },
        {  # 8
            "restaurant_id": 1,
            "item_name": "McCrispy",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 6.89,
            "calory": 470,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0383_CrispyChickenSandwich_PotatoBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The McDonald's McCrispy is a southern-style fried chicken sandwich that's crispy, juicy and tender perfection. It's topped with crinkle-cut pickles and served on a toasted, buttered potato roll. The McCrispy has 470 calories."
        },
        {  # 9
            "restaurant_id": 1,
            "item_name": "Filet-O-Fish",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 7.29,
            "calory": 390,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202001_5926_Filet-O-Fish_HalfSlice_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Dive into our wild-caught Filet-O-Fish, a classic McDonald's fish sandwich! Our fish sandwich recipe features a crispy fish filet patty on melty American cheese and is topped with creamy McDonald's tartar sauce, all served on a soft, steamed bun."
        },
        {  # 10
            "restaurant_id": 1,
            "item_name": "Spicy Deluxe McCrispy",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 9.09,
            "calory": 530,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The Spicy Deluxe McCrispy is big on everything, including heat. Our southern-style fried chicken fillet on a potato roll, topped with shredded lettuce, Roma tomatoes and Spicy Pepper Sauce kicks crispy, juicy and tender up to the highest level."
        },
        {  # 11
            "restaurant_id": 1,
            "item_name": "French Fries",
            "item_type": "Fries",
            "price": 4.69,
            "calory": 320,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_8932_MediumFries_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "McDonald's World Famous Fries are made with premium potatoes such as the Russet Burbank and the Shepody. With 0g of trans fat per labeled serving, these epic fries are crispy and golden on the outside and fluffy on the inside. "
        },
        {  # 12
            "restaurant_id": 1,
            "item_name": "Big Mac Meal",
            "item_type": "Combo Meals",
            "price": 12.59,
            "calory": 1150,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b9eb19b19727cbea4de310a92374e222/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
        },
        {  # 13
            "restaurant_id": 1,
            "item_name": "Double Quarter Pounder with Cheese Meal",
            "item_type": "Combo Meals",
            "price": 16.09,
            "calory": 1250,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/5c18cdc1ae72115291f42399a0148147/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
        },
        {  # 14
            "restaurant_id": 1,
            "item_name": "Hamburger Happy Meal",
            "item_type": "Combo Meals",
            "price": 10.69,
            "calory": 630,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202103_6975_HamburgerHappyMeal_AppleSlices_WhiteMilkJug_Left_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
        },
        {  # 15
            "restaurant_id": 1,
            "item_name": "10 Piece McNuggets Meal",
            "item_type": "Combo Meals",
            "price": 12.59,
            "calory": 870,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/71ead9db896ec112fd16e0dfa247efe9/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our Chicken McNugget Happy Meal features ten tender Chicken McNuggets made with white meat, World Famous Fries and a side of beverage."
        },
        {  # 16
            "restaurant_id": 1,
            "item_name": "OREO McFlurry",
            "item_type": "Sweets & Treats",
            "price": 5.99,
            "calory": 480,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_3832_OREOMcFlurry_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The McDonald's McFlurry with OREO Cookies is a popular combination of creamy vanilla soft serve with crunchy pieces of OREO cookies!"
        },
        {  # 17
            "restaurant_id": 1,
            "item_name": "Vanilla Cone",
            "item_type": "Sweets & Treats",
            "price": 1.99,
            "calory": 390,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202106_0336_LargeVanillaCone_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Treat yourself to a delicious Vanilla Cone Treat from McDonald's! Our Vanilla Cone features creamy vanilla soft serve in a crispy cone. It's the perfect sweet treat in addition to any McDonald's meal or on its own."
        },
        {  # 18
            "restaurant_id": 1,
            "item_name": "Strawberry Shake",
            "item_type": "Sweets & Treats",
            "price": 6.19,
            "calory": 600,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_1513_MediumStrawberryShake_Glass_A1_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Get a delicious McDonald's Strawberry Shake—the perfect sweet treat for any day. Our Strawberry Shake recipe features creamy vanilla soft serve blended with strawberry syrup and finished with whipped light cream. "
        },
        {  # 19
            "restaurant_id": 1,
            "item_name": "Apple Pie",
            "item_type": "Sweets & Treats",
            "price": 2.29,
            "calory": 230,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0706_BakedApplePie_Broken_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "McDonald's Baked Apple Pie recipe features 100% American-grown apples, and a lattice crust baked to perfection and topped with sprinkled sugar."
        },
        {  # 20
            "restaurant_id": 1,
            "item_name": "Coke",
            "item_type": "Beverages",
            "price": 3.69,
            "calory": 210,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202112_0521_MediumCoke_Glass_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Enjoy a cold, refreshing Coca-Cola soda from McDonald's that complements all your menu favorites. "
        },
        {  # 21
            "restaurant_id": 1,
            "item_name": "Sprite",
            "item_type": "Beverages",
            "price": 3.69,
            "calory": 200,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_MediumSprite_Glass_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Cool off with the refreshing McDonald's Sprite®—the classic and delicious lemon-lime fountain drink. "
        },
        {  # 22
            "restaurant_id": 1,
            "item_name": "Minute Maid Premium Orange Juice",
            "item_type": "Beverages",
            "price": 4.09,
            "calory": 250,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_MediumMinuteMaidPremiumOrangeJuice_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "100% orange juice, packed with Vitamin C."
        },
        {  # 23
            "restaurant_id": 1,
            "item_name": "Hot Chocolate",
            "item_type": "Beverages",
            "price": 4.09,
            "calory": 390,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201906_1697_MediumPremiumHotChocolate_Glass_A1_HL_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Taste the delicious chocolatey flavor of McCafé Hot Chocolate. McDonald's Hot Chocolate recipe features steamed whole milk with rich hot chocolate syrup and is finished with whipped light cream and chocolate drizzle. "
        },
        {  # 24
            "restaurant_id": 2,
            "item_name": "Beef Sukiyaki Fried Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 15.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/7cbb40cb4bb473934e0084a1f56d4dee/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Our signature thin-sliced Sukiyaki-marinated beef stir-fried with white rice, egg yolk, mushrooms, and sliced onions. Topped with diced red bell peppers, chopped green onions, and sesame seeds."
        },
        {  # 25
            "restaurant_id": 2,
            "item_name": "Umakara Beef Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 15.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9e0fdf9d701137b2f87dc2b3ff3d7a73/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Thin-sliced Yakishabu beef marinated in our sweet & spicy Umakara sauce with sliced onions on a bed of white rice and shredded cabbage. Topped with chopped green onions and sesame seeds."
        },
        {  # 26
            "restaurant_id": 2,
            "item_name": "Roast Beef Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 16.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4957db06828e1f2a4b881b55abb55627/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Premium roast beef on a bed of mixed greens and steamed rice. Topped with white and green onions, Signature soy-based barbecue sauce, and kuki wasabi."
        },
        {  # 27
            "restaurant_id": 2,
            "item_name": "Fried Chicken Karaage Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 16.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a0ad1abeefcb13d8d594685ec2e951b4/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Japanese Fried Chicken Karaage on a bed of white rice and shredded cabbage. Topped with Japanese Chili Mayo and chopped green onions."
        },
        {  # 28
            "restaurant_id": 2,
            "item_name": "Spicy Beef Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/03ef5869edb7c76b00e9a0a46b3d38a0/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Gyu-Kaku original recipe: Japanese BBQ meets Ramen! Rich kalbi beef soup and medium thickness ramen noodles topped with thin-sliced beef, boiled egg, green onions, spinach, daikon radish, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 29
            "restaurant_id": 2,
            "item_name": "Tonkotsu Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://d1ralsognjng37.cloudfront.net/0576f9f8-fda5-4753-bbd8-1ed431df6e96.jpeg",
            "description": "Our Tonkotsu pork bone ramen comes with chunky, fatty braised pork belly Kakuni chashu and is topped with hard-boiled egg, chopped green onions, diced red bell peppers, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 30
            "restaurant_id": 2,
            "item_name": "Goma Negi Shio Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b695d7f5581a3aabaf6dae06af2c99fd/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Beef and shio-based soup with medium-thick ramen noodles and thick braised pork belly Kakuni chashu. Toppings also include boiled egg, green onion, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 31
            "restaurant_id": 2,
            "item_name": "Miso Chili Wings",
            "item_type": "Appetizers",
            "price": 11.00,
            "image_url": "https://d1ralsognjng37.cloudfront.net/291435e7-7ec2-43d1-9974-64d76eb07223.jpeg",
            "description": "Five (5) fried chicken wings coated in our sweet & spicy Miso Chili sauce."
        },
        {  # 32
            "restaurant_id": 2,
            "item_name": "Takoyaki",
            "item_type": "Appetizers",
            "price": 8.95,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a3a52ffeae1752320fab4f2c53b6947f/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Fried Octopus Balls! A street food classic straight from Osaka. Six fried octopus fritters drizzled with Takoyaki sauce and Japanese mayo. Topped with crushed bonito flakes and green onions."
        },
        {  # 33
            "restaurant_id": 2,
            "item_name": "Fried Pork Gyoza Dumplings",
            "item_type": "Appetizers",
            "price": 8.45,
            "image_url": "https://d1ralsognjng37.cloudfront.net/b0b34333-c768-4f21-a455-ba957858a97e.jpeg",
            "description": "Five (5) Fried Pork Gyoza Dumplings with Ponzu citrus soy dipping sauce."
        },
        {  # 34
            "restaurant_id": 3,
            "item_name": "Avocado Bacon Burger",
            "item_type": "Burgers",
            "price": 11.89,
            "calory": 870,
            "image_url": "https://d1ralsognjng37.cloudfront.net/b8f12db6-3953-49e1-8fc5-063839db3472.jpeg",
            "description": "Angus beef cheeseburger topped with freshly sliced avocado, applewood-smoked bacon, and ShackSauce on a toasted potato bun (contains sesame, eggs, milk, soy, wheat, and gluten)"
        },
        {  # 35
            "restaurant_id": 3,
            "item_name": "Bourbon Bacon Jam Burger",
            "item_type": "Burgers",
            "price": 11.49,
            "calory": 960,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ab02678e31368f6ddad8c9d4cfbecf3f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "100% Angus beef cheeseburger topped with crispy onions, ShackSauce, and bourbon bacon jam made with Maker's Mark Bourbon"
        },
        {  # 36
            "restaurant_id": 3,
            "item_name": "Veggie Shack",
            "item_type": "Burgers",
            "price": 10.59,
            "calory": 630,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/61019691349c9853d0593face1bb4702/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our veggie burger packed with mushrooms, sweet potatoes, carrots, farro, and quinoa, and topped with American cheese, crispy onions, pickles and ShackSauce (contains sesame, eggs, milk, soy, wheat, and gluten)"
        },
        {  # 37
            "restaurant_id": 3,
            "item_name": "ShackBurger",
            "item_type": "Burgers",
            "price": 8.69,
            "calory": 750,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d07d986a0cfdf95fb2ff1508b4273fe4/859baff1d76042a45e319d1de80aec7a.jpeg",
            "description": "Angus beef cheeseburger with lettuce, tomato, and ShackSauce on a toasted potato bun (contains sesame, eggs, milk, soy, wheat, and gluten)"
        },
        {  # 38
            "restaurant_id": 3,
            "item_name": "Shack Stack",
            "item_type": "Burgers",
            "price": 14.89,
            "calory": 800,
            "image_url": "https://d1ralsognjng37.cloudfront.net/92fac1cd-850f-4c51-9c2b-e3ea0f1a9561.jpeg",
            "description": "Angus beef cheeseburger topped with a 'Shroom Burger with lettuce, tomato, and ShackSauce on a toasted potato bun (contains sesame, milk, wheat, egg, soy, and gluten)"
        },
        {  # 39
            "restaurant_id": 3,
            "item_name": "Hamburger",
            "item_type": "Burgers",
            "price": 8.19,
            "calory": 590,
            "image_url": "https://d1ralsognjng37.cloudfront.net/bea6ce86-adef-4893-a9ee-f4a516f1984e.jpeg",
            "description": "Angus beef patty and your choice of toppings on a toasted potato bun (contains sesame, milk, wheat, and gluten)"
        },
        {  # 40
            "restaurant_id": 3,
            "item_name": "Avocado Bacon Chicken",
            "item_type": "Chicken",
            "price": 12.89,
            "calory": 550,
            "image_url": "https://d1ralsognjng37.cloudfront.net/e2e7dc2f-afc4-40e6-823a-8c5b5c84d8aa.jpeg",
            "description": "Crispy chicken breast topped with lettuce, pickles, buttermilk herb mayo (contains sesame, milk, wheat, egg, soy, and gluten)"
        },
        {  # 41
            "restaurant_id": 3,
            "item_name": "Chicken Shack",
            "item_type": "Chicken",
            "price": 10.29,
            "calory": 590,
            "image_url": "https://d1ralsognjng37.cloudfront.net/56527e87-66c9-4f2f-8490-3432d58fd045.jpeg",
            "description": "Crispy, white-meat chicken breast over lettuce, pickles, and buttermilk herb mayo on a toasted potato bun (contains sesame, milk, wheat, egg, soy, and gluten)"
        },
        {  # 42
            "restaurant_id": 3,
            "item_name": "Chicken Bites",
            "item_type": "Chicken",
            "price": 6.39,
            "calory": 500,
            "image_url": "https://d1ralsognjng37.cloudfront.net/132d62ec-2f8a-4aff-b1d0-bb1a2844c8da.jpeg",
            "description": "Crispy, whole white-meat bites served with honey mustard or BBQ (contains milk, wheat, soy, and gluten)"
        },
        {  # 43
            "restaurant_id": 3,
            "item_name": "Spicy Fries with Ranch",
            "item_type": "Crinkle Cut Fries",
            "price": 5.49,
            "calory": 630,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/72b7eabdc82726fb70edd558807925be/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Crispy crinkle cut fries spiced with our own spicy pepper blend, served with our ranch sauce"
        },
        {  # 44
            "restaurant_id": 3,
            "item_name": "Fries",
            "item_type": "Crinkle Cut Fries",
            "price": 4.69,
            "calory": 470,
            "image_url": "https://d1ralsognjng37.cloudfront.net/b2b5bd9a-c652-4df7-9ad5-6d30c2bc30c0.jpeg",
            "description": "Crispy crinkle cut fries (contains soy)"
        },
        {  # 45
            "restaurant_id": 3,
            "item_name": "Cheese Fries",
            "item_type": "Crinkle Cut Fries",
            "price": 5.89,
            "calory": 710,
            "image_url": "https://d1ralsognjng37.cloudfront.net/d01388aa-9bd2-46df-b76b-98453a9e9ee8.jpeg",
            "description": "Crispy crinkle cuts topped with our cheese sauce (contains soy and milk)"
        },
        {  # 46
            "restaurant_id": 3,
            "item_name": "Triple Chocolate Brownie Shake",
            "item_type": "Shakes & Frozen Custard",
            "price": 7.69,
            "calory": 950,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/686cb2d9eba4b29e46acc87d1298dcdc/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Chocolate frozen custard hand-spun with brownie bits, chocolate sprinkles, and chocolate chips, topped with whipped cream and brownie crunch - (contains milk and egg)"
        },
        {  # 47
            "restaurant_id": 3,
            "item_name": "Vanilla Shake",
            "item_type": "Shakes & Frozen Custard",
            "price": 6.89,
            "calory": 680,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4302e50c5b22a28248e96da8a13bb3f1/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "House-made vanilla frozen custard with real vanilla (contains milk and egg)"
        },
        {  # 48
            "restaurant_id": 3,
            "item_name": "Strawberry Shake",
            "item_type": "Shakes & Frozen Custard",
            "price": 6.89,
            "calory": 690,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/45633a3bc06531cc13dc4be0220c4694/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Real strawberry hand spun with our house-made vanilla frozen custard (contains milk and egg)"
        },
        {  # 49
            "restaurant_id": 3,
            "item_name": "Frozen Custard",
            "item_type": "Shakes & Frozen Custard",
            "price": 5.59,
            "calory": 500,
            "image_url": "https://d1ralsognjng37.cloudfront.net/6947ea26-5403-4da0-8f29-4fdd8f9a74e2.jpeg",
            "description": "Vanilla or Chocolate frozen custard made in house every day (contains milk and egg)"
        },
        {  # 50
            "restaurant_id": 3,
            "item_name": "Strawberry Lemonade",
            "item_type": "Drinks",
            "price": 5.19,
            "calory": 280,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b1329b94f3156d127c203710d0f55afb/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Real strawberry and house-made lemonade. (Try it naturally caffeinated!)"
        },
        {  # 51
            "restaurant_id": 3,
            "item_name": "Shack-made Lemonade",
            "item_type": "Drinks",
            "price": 4.79,
            "calory": 200,
            "image_url": "https://d1ralsognjng37.cloudfront.net/d4c4a45f-bd46-48e3-b4af-f73294cfd03e.jpeg",
            "description": "Shack-made and sweetened just right"
        },
        {  # 52
            "restaurant_id": 3,
            "item_name": "Fifty/Fifty",
            "item_type": "Drinks",
            "price": 4.79,
            "calory": 120,
            "image_url": "https://d1ralsognjng37.cloudfront.net/44621e63-48dc-4feb-adb5-c63ddc1b2f9e.jpeg",
            "description": "Half lemonade, half organic iced tea"
        },
        {  # 53
            "restaurant_id": 3,
            "item_name": "Draft Root Beer",
            "item_type": "Drinks",
            "price": 4.49,
            "calory": 220,
            "image_url": "https://d1ralsognjng37.cloudfront.net/3f9034f0-50eb-43f6-b5ea-4a3910000cb5.jpeg",
            "description": "Made with real Louisiana cane sugar"
        },
        {  # 54
            "restaurant_id": 4,
            "item_name": "Chang's Chicken Lettuce Wraps",
            "item_type": "Appetizers",
            "price": 18.00,
            "calory": 330,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9e724f0eebee13b378fb9c7a00154bc7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A secret family recipe and our signature dish. Enough said."
        },
        {  # 55
            "restaurant_id": 4,
            "item_name": "Dynamite Shrimp",
            "item_type": "Appetizers",
            "price": 18.50,
            "calory": 290,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b61f1cedff0879c4528e0b8376c1b1b7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tempura-battered, tossed with a sriracha aioli"
        },
        {  # 56
            "restaurant_id": 4,
            "item_name": "Chili-Garlic Green Beans",
            "item_type": "Appetizers",
            "price": 12.00,
            "calory": 260,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/f3d88e5fb5e716f5540c4871f6644927/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Fiery red chili sauce, fresh garlic, Sichuan preserves"
        },
        {  # 57
            "restaurant_id": 4,
            "item_name": "BBQ Pork Spare Ribs",
            "item_type": "Appetizers",
            "price": 19.00,
            "calory": 430,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/3d714f777aa077b40b903af03ee225a0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Slow-braised pork ribs wok-seared with a tangy Asian barbecue sauce"
        },
        {  # 58
            "restaurant_id": 4,
            "item_name": "Tempura Calamari",
            "item_type": "Appetizers",
            "price": 17.50,
            "calory": 380,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/32e750cc6ae4fb4c34b27d3c0fa50b04/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tempura Calamari"
        },
        {  # 59
            "restaurant_id": 4,
            "item_name": "Chang's Vegetarian Lettuce Wraps",
            "item_type": "Appetizers",
            "price": 18.00,
            "calory": 260,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d550fdee4847b1b5a49a85c5f4f4a52b/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A secret family recipe and our signature dish. Enough said. "
        },
        {  # 60
            "restaurant_id": 4,
            "item_name": "Vegetable Spring Rolls | 3 Count",
            "item_type": "Dim Sum",
            "price": 12.00,
            "calory": 240,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/12408043a8f1c4765d0a7c99f8396bec/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Crispy rolls stuffed with julienned veggies, sweet chili dipping sauce Calories listed are per piece"
        },
        {  # 61
            "restaurant_id": 4,
            "item_name": "Handmade Shrimp Dumplings | 6 Count",
            "item_type": "Dim Sum",
            "price": 16.00,
            "calory": 50,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/548235d32c95ac442e9313c1bc6a2be4/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Pan-fried or steamed, light chili sauce drizzle Calories listed are per piece"
        },
        {  # 62
            "restaurant_id": 4,
            "item_name": "Pork Egg Rolls | 2 Count",
            "item_type": "Dim Sum",
            "price": 12.50,
            "calory": 490,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ab47fd38c2ef3454b7a00f02e8fd638f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Hand-rolled with julienned veggies, sweet and sour mustard sauce Calories listed are per piece"
        },
        {  # 63
            "restaurant_id": 4,
            "item_name": "Dynamite Roll",
            "item_type": "Sushi",
            "price": 19.50,
            "calory": 100,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a70fd0eda78f3cbe4fc3860f990456ae/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tempura-battered shrimp, signature California roll, sriracha aioli, umami sauce Calories listed are per piece"
        },
        {  # 64
            "restaurant_id": 4,
            "item_name": "Shrimp Tempura Roll",
            "item_type": "Sushi",
            "price": 18.50,
            "calory": 70,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/26954c79967851364b2ccfe85b7f8f33/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tempura shrimp, kani kama, cucumber, avocado, umami sauce Calories listed are per piece"
        },
        {  # 65
            "restaurant_id": 4,
            "item_name": "California Roll",
            "item_type": "Sushi",
            "price": 16.50,
            "calory": 50,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0acdc1850880b5471848d527ea3b0cc8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Kani kama, cucumber, avocado, umami sauce Calories listed are per piece"
        },
        {  # 66
            "restaurant_id": 4,
            "item_name": "Spicy Tuna Roll",
            "item_type": "Sushi",
            "price": 18.00,
            "calory": 45,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/251ed6eddd5ab117723be8caad8e61b0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Ahi, cucumber, spicy sriracha Calories listed are per piece"
        },
        {  # 67
            "restaurant_id": 4,
            "item_name": "Kung Pao Dragon Roll",
            "item_type": "Sushi",
            "price": 19.00,
            "calory": 60,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/7a6304ad2107ecc1d48092f86c97df00/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Signature California roll, seared Ahi, sriracha, tempura crunch, peanuts Calories listed are per piece"
        },
        {  # 68
            "restaurant_id": 4,
            "item_name": "Kung Pao Chicken Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 590,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b27d25af458d265f7eb90adb495b1977/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers"
        },
        {  # 69
            "restaurant_id": 4,
            "item_name": "Orange Chicken Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 670,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/67fe2266586e60e04b8ac904e606d12b/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "NEW RECIPE Lightly battered, sweet citrus chili sauce, fresh orange slices"
        },
        {  # 70
            "restaurant_id": 4,
            "item_name": "Mongolian Beef Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 19.50,
            "calory": 460,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a3304437ae8e314345e9d8b86976f395/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sweet soy glaze, flank steak, garlic, snipped green onion"
        },
        {  # 71
            "restaurant_id": 4,
            "item_name": "Chang's Spicy Chicken Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 810,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/765425560ad3ec24b1f89dcebf772230/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Signature sweet-spicy chili sauce, green onion"
        },
        {  # 72
            "restaurant_id": 4,
            "item_name": "Sesame Chicken Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 590,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/505fc14569d5d4b608982b5279eede31/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sesame sauce, broccoli, bell peppers, onion"
        },
        {  # 73
            "restaurant_id": 4,
            "item_name": "Sweet & Sour Chicken Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 630,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ef7a9411b1759bd3bc5a5e323ac0bf91/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sweet & sour sauce, pineapple, onion, bell peppers, ginger"
        },
        {  # 74
            "restaurant_id": 4,
            "item_name": "Ginger Chicken with Broccoli Bowl",
            "item_type": "Wok-Fired Bowls",
            "price": 17.50,
            "calory": 350,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d2f51f4b1f61f21ec12140ccc2132ad2/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Ginger-garlic aromatics, green onion, steamed broccoli"
        },
        {  # 75
            "restaurant_id": 4,
            "item_name": "Kung Pao Chicken",
            "item_type": "Main Entrees",
            "price": 26.00,
            "calory": 520,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/185388986cd6eb25a6cd63b92fa2229e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Spicy Sichuan chili sauce, peanuts, green onion, red chili peppers "
        },
        {  # 76
            "restaurant_id": 4,
            "item_name": "Ma Po Tofu",
            "item_type": "Main Entrees",
            "price": 21.00,
            "calory": 490,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e7453c24b706b2404ecd6c9500b72ee7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Crispy silken tofu, sweet-spicy red chili sauce, steamed broccoli"
        },
        {  # 77
            "restaurant_id": 4,
            "item_name": "Mongolian Beef",
            "item_type": "Main Entrees",
            "price": 29.00,
            "calory": 380,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e343075df0bd016906832b34166837f8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sweet soy glaze, flank steak, garlic, snipped green onion"
        },
        {  # 78
            "restaurant_id": 4,
            "item_name": "Wagyu Steak",
            "item_type": "Main Entrees",
            "price": 48.00,
            "calory": 230,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d5739c079b7ca458176b4f6db27c5a68/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Savory bulgogi glaze, wok-seared mushrooms, Asian chimichurri sauce "
        },
        {  # 79
            "restaurant_id": 4,
            "item_name": "Miso Glazed Salmon",
            "item_type": "Main Entrees",
            "price": 32.00,
            "calory": 320,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/eb75b2c5202bdbf3d5aa6af6e54f76ca/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Grilled salmon, Asian mushrooms, spinach, cabbage, garlic-ginger aromatics, miso glaze"
        },
        {  # 80
            "restaurant_id": 4,
            "item_name": "Gluten Free | Singapore Street Noodles",
            "item_type": "Gluten Free",
            "price": 23.50,
            "calory": 610,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/f3d90b393266ae9a603fcfc4a8a6b640/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Thin rice noodles, light curry sauce, chicken, shrimp, onion, julienned vegetables "
        },
        {  # 81
            "restaurant_id": 4,
            "item_name": "Gluten Free | Fried Rice",
            "item_type": "Gluten Free",
            "price": 20.00,
            "calory": 450,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/f1dc0e12e5727c2af230545f303e9c1b/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Wok-tossed with egg, carrots, bean sprouts, green onion"
        },
        {  # 82
            "restaurant_id": 4,
            "item_name": "Gluten Free | Chocolate Souffle",
            "item_type": "Gluten Free",
            "price": 13.00,
            "calory": 400,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/064efd0276d83e2b64180db8a60a6f4c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Chocolate soufflé, vanilla ice cream, raspberry sauce"
        },
        {  # 83
            "restaurant_id": 4,
            "item_name": "Gluten Free | Egg Drop Soup Cup",
            "item_type": "Gluten Free",
            "price": 9.50,
            "calory": 40,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2ce3c966ab12f8bf2534e4145a92ca7f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Velvety broth, julienned carrots, green onion"
        },
        {  # 84
            "restaurant_id": 5,
            "item_name": "Iced Chai Tea Latte",
            "item_type": "Cold Coffees",
            "price": 5.45,
            "calory": 180,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d932f9eeeca81e9b68a67a75d2a6b575/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Black tea infused with cinnamon, clove, and other warming spices are combined with milk and ice for the perfect balance of sweet and spicy."
        },
        {  # 85
            "restaurant_id": 5,
            "item_name": "Iced Caramel Macchiato",
            "item_type": "Cold Coffees",
            "price": 5.75,
            "calory": 180,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0f807b4e32b914f08da3ac400015ba36/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "We combine our rich, full-bodied espresso with vanilla-flavored syrup, milk and ice, then top it off with a caramel drizzle for an oh-so-sweet finish."
        },
        {  # 86
            "restaurant_id": 5,
            "item_name": "Iced Brown Sugar Oatmilk Shaken Espresso",
            "item_type": "Cold Coffees",
            "price": 6.15,
            "calory": 100,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/f56f0855a7acabddd4d116368bf2e593/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "First we shake Starbucks® Blonde espresso, brown sugar and cinnamon together, and then top it off with oatmilk and ice for a cool lift to power you through your day."
        },
        {  # 87
            "restaurant_id": 5,
            "item_name": "Iced Caffè Americano",
            "item_type": "Cold Coffees",
            "price": 3.95,
            "calory": 10,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/357988caa65cb3bbd94e162d2ba05405/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Espresso shots topped with cold water produce a light layer of crema, then served over ice. The result: a wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot."
        },
        {  # 88
            "restaurant_id": 5,
            "item_name": "Salted Caramel Cream Cold Brew",
            "item_type": "Cold Coffees",
            "price": 5.75,
            "calory": 190,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4fe6d45fa28ceaa366643f8afcee36bb/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Here's a savory-meets-sweet refreshing beverage certain to delight: our signature, super-smooth cold brew, sweetened with a touch of caramel and topped with a salted, rich cold foam."
        },
        {  # 89
            "restaurant_id": 5,
            "item_name": "Starbucks® Cold Brew Coffee with Milk",
            "item_type": "Cold Coffees",
            "price": 4.95,
            "calory": 25,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/6f2aba446901aa426be6126bec9e052e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our custom blend of beans are grown to steep long and cold for a super-smooth flavor. Starbucks® Cold brew is handcrafted in small batches daily, slow-steeped in cool water for 20 hours, without touching heat and finished with a splash of milk."
        },
        {  # 90
            "restaurant_id": 5,
            "item_name": "Caffè Latte",
            "item_type": "Hot Coffees",
            "price": 4.95,
            "calory": 100,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/c8e3f707caface9f3b529b7d8671c7d1/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
        },
        {  # 91
            "restaurant_id": 5,
            "item_name": "White Chocolate Mocha",
            "item_type": "Hot Coffees",
            "price": 5.75,
            "calory": 230,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/fdefc21d2afadff084d8a071a31fd6b0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our signature espresso meets white chocolate sauce and steamed milk, and then is finished off with sweetened whipped cream to create this supreme white chocolate delight."
        },
        {  # 92
            "restaurant_id": 5,
            "item_name": "Caramel Macchiato",
            "item_type": "Hot Coffees",
            "price": 5.75,
            "calory": 120,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/1bd36f1ea68af7c6457337ba74b445d3/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish."
        },
        {  # 93
            "restaurant_id": 5,
            "item_name": "Cappuccino",
            "item_type": "Hot Coffees",
            "price": 4.95,
            "calory": 70,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/bc8f2d402a705c9dd5320c5387223e21/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft."
        },
        {  # 94
            "restaurant_id": 5,
            "item_name": "Mocha Cookie Crumble Frappuccino",
            "item_type": "Frappuccino Blended Beverages",
            "price": 6.15,
            "calory": 350,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/6d167b97ad74bc7f8b1e12564a8e0b32/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Frappuccino® Roast coffee, mocha sauce and Frappuccino® chips blended with milk and ice, layered on top of whipped cream and chocolate cookie crumble and topped with vanilla whipped cream, mocha drizzle and even more chocolate cookie crumble. Each sip is as good as the last . . . all the way to the end."
        },
        {  # 95
            "restaurant_id": 5,
            "item_name": "Caramel Frappuccino Blended Beverage",
            "item_type": "Frappuccino Blended Beverages",
            "price": 5.75,
            "calory": 260,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e0d6a1fd09ac2d49a366b88ae0ab807c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Caramel syrup meets coffee, milk and ice for a rendezvous in the blender, while whipped cream and buttery caramel sauce layer the love on top. To change things up, try it affogato-style with a hot espresso shot poured right over the top."
        },
        {  # 96
            "restaurant_id": 5,
            "item_name": "Caffè Vanilla Frappuccino Blended Beverage",
            "item_type": "Frappuccino Blended Beverages",
            "price": 5.75,
            "calory": 280,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0edae087222f0d82043caaf360332fba/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "We take Frappuccino® roast coffee and vanilla bean powder, combine them with milk and ice, topped with whipped cream. Tastes like happiness."
        },
        {  # 97
            "restaurant_id": 5,
            "item_name": "Dragon Drink Starbucks Refreshers® Beverage",
            "item_type": "Cold Drinks",
            "price": 5.65,
            "calory": 110,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0d05e260dcdacd0f687eb756ac2bee18/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "This tropical-inspired pick-me-up—crafted with sweet mango and dragonfruit flavors and hand-shaken with creamy coconutmilk, ice and a scoop of real diced dragonfruit—creates a refreshing and surprising delight in the fall."
        },
        {  # 98
            "restaurant_id": 5,
            "item_name": "Strawberry Açaí Starbucks Refreshers Beverage",
            "item_type": "Cold Drinks",
            "price": 4.95,
            "calory": 80,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/233695d11725dfdd2317107aba83dda4/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sweet strawberry flavors accented by passion fruit and açaí notes, shaken with ice and real strawberry pieces—a welcoming sweet spot of refreshment."
        },
        {  # 99
            "restaurant_id": 5,
            "item_name": "Paradise Drink Starbucks Refreshers Beverage",
            "item_type": "Cold Drinks",
            "price": 5.65,
            "calory": 110,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a5ecbe2ba6df8ff2154fbd0ce98ad2dc/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tropical flavors of pineapple and passionfruit combine with diced pineapple and creamy coconutmilk to create a delicious island escape."
        },
        {  # 100
            "restaurant_id": 5,
            "item_name": "Lemonade",
            "item_type": "Cold Drinks",
            "price": 2.95,
            "calory": 80,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b0e4697135dbd08b84c9e3c2619d6044/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Awaken your taste buds with the zing of refreshing lemonade—this tangy, fresh sip puts a little zip in your step."
        },
        {  # 101
            "restaurant_id": 5,
            "item_name": "Iced Black Tea",
            "item_type": "Cold Drinks",
            "price": 3.75,
            "calory": 0,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/04cd7d504500f9db768f2bd4aedc86c8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Premium black tea sweetened just right and shaken with ice to create an ideal iced tea—a rich and flavorful black tea journey awaits you."
        },
        {  # 102
            "restaurant_id": 5,
            "item_name": "Iced Passion Tango Tea",
            "item_type": "Cold Drinks",
            "price": 3.75,
            "calory": 0,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/35086bb8b4fe568d3b67906572690acd/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A blend of hibiscus, lemongrass and apple hand-shaken with ice: a refreshingly vibrant tea infused with the color of passion."
        },
        {  # 103
            "restaurant_id": 5,
            "item_name": "Double-Smoked Bacon, Cheddar & Egg Sandwich",
            "item_type": "Bakery",
            "price": 6.75,
            "calory": 500,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/fb519df2d047d5542dacebc8548cd25b/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Bacon smoked for six hours over hickory wood chips, stacked with a cage-free fried egg, topped with a melted slice of sharp Cheddar cheese—all on our signature croissant bun. -HIGH-PROTEIN"
        },
        {  # 104
            "restaurant_id": 5,
            "item_name": "Sausage, Cheddar & Egg Sandwich",
            "item_type": "Bakery",
            "price": 5.25,
            "calory": 480,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9fccc88a8da59bdd92161226a7386cb7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A savory sausage patty, fluffy cage-free eggs and aged Cheddar cheese on a perfectly toasted English muffin. -HIGH-PROTEIN"
        },
        {  # 105
            "restaurant_id": 5,
            "item_name": "Butter Croissant",
            "item_type": "Bakery",
            "price": 4.45,
            "calory": 250,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d887b0305178efd47272079624b548ef/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Classic butter croissant with soft, flaky layers and a golden-brown crust. -VEGETARIAN"
        },
        {  # 106
            "restaurant_id": 5,
            "item_name": "Caffè Americano",
            "item_type": "Hot Coffees",
            "price": 3.95,
            "calory": 5,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/3e6b2dab8acdd087797b91fc30c209b7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot."
        },
        {  # 107
            "restaurant_id": 15,
            "item_name": "Lobster Roll",
            "item_type": "Kitchen - Lobster",
            "price": 24.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2b681dd14ccb305361c0d940e90adacb/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Claw and tail meat, celery, scallions, lemon & mayo, on a toasted top-split bun"
        },
        {  # 108
            "restaurant_id": 15,
            "item_name": "Lobster Bake for 2 (2 lb lobster)",
            "item_type": "Kitchen - Lobster",
            "price": 110.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d508e97cf5034aaff30673b639d31511/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Fresh steamed north-Atlantic lobster, clams, mussels, chorizo, potatoes & corn-on-the-cob served in a rich seafood broth (serves 2)"
        },
        {  # 109
            "restaurant_id": 15,
            "item_name": "Lobster Roll Combo",
            "item_type": "Kitchen - Lobster",
            "price": 30.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/c41d3aa453ffae5047dc65a9fc2fc764/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Maine style lobster roll, chips & choice of soup. Perfect for a picnic!"
        },
        {  # 110
            "restaurant_id": 15,
            "item_name": "Steamed Lobster 1.25 LB",
            "item_type": "Kitchen - Lobster",
            "price": 51.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/07492de654b7f72da5f51ec13f177cb8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Freshly steamed north Atlantic hard-shell lobster served with butter & lemon"
        },
        {  # 111
            "restaurant_id": 15,
            "item_name": "Fish & Shrimp Fry",
            "item_type": "Kitchen - Kitchen",
            "price": 21.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/30466d13a2774b7d1d068ad44f9235f6/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Crispy sole, fried shrimp, fries, old bay, lemon & tartar sauce"
        },
        {  # 112
            "restaurant_id": 15,
            "item_name": "Broiled Miso Oysters",
            "item_type": "Kitchen - Kitchen",
            "price": 16.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9a10fa7415ff95d5ce7645b7457fb498/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Garlic butter, bacon, pickled shallot, breadcrumbs, sautéed kale"
        },
        {  # 113
            "restaurant_id": 15,
            "item_name": "Peel-N-Eat Shrimp",
            "item_type": "Kitchen - Kitchen",
            "price": 18.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/56ecdc454549e577c9af2cc002c08440/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Steamed & Chilled Shrimp Tossed in Old Bay and served with Lemon"
        },
        {  # 114
            "restaurant_id": 15,
            "item_name": "Chopped Salad",
            "item_type": "Kitchen - Kitchen",
            "price": 15.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4d4951e429397ce30e82624775abc2be/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Romaine, kale, green beans, cherry tomatoes, scallion, cucumber, red onion, feta cheese, dill & balsamic dressing."
        },
        {  # 115
            "restaurant_id": 15,
            "item_name": "Crab Cake",
            "item_type": "Kitchen - Kitchen",
            "price": 20.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2c9cb9cf999f4114dd12a05e6660f279/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Lump crab meat, boston lettuce, tomato & house remoulade, on a grilled potato bun."
        },
        {  # 116
            "restaurant_id": 15,
            "item_name": "Grain Bowl",
            "item_type": "Kitchen - Kitchen",
            "price": 18.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/97a13d5a4edc422a155cecd64d9e1c7e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Bulgar wheat mixed with salsa verde, sautéed kale and chickpeas (Choice of: Grilled Salmon or Grilled Shrimp)."
        },
        {  # 117
            "restaurant_id": 15,
            "item_name": "Salmon Burger",
            "item_type": "Kitchen - Kitchen",
            "price": 18.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e4cc40f4dedbb9bd0c16eb3242ef6143/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Atlantic salmon, pickled peppers, tomato, Boston lettuce & smoked aioli, on a grilled potato bun."
        },
        {  # 118
            "restaurant_id": 15,
            "item_name": "Salmon Avocado Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 9.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/1a09c76a48a9f9644f197c13f3631ccb/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Salmon, avocado, nori, white rice & sesame seeds."
        },
        {  # 119
            "restaurant_id": 15,
            "item_name": "Shrimp Tempura Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 12.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/3367b0bcd333ffe2512b9f9e7357c4e4/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tempura fried shrimp w/avocado, cucumber, masago & topped with eel sauce."
        },
        {  # 120
            "restaurant_id": 15,
            "item_name": "Spicy Lobster Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 19.50,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/ae9fa16ae6a10140842f267dc58a4093/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Lobster meat w/ avocado, spicy sauce & masago."
        },
        {  # 121
            "restaurant_id": 15,
            "item_name": "Spicy Tuna Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 9.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/3e2f5f4ca74ceb47eef3b014763df5c2/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Spicy yellowfin tuna, nori, white rice & sesame seeds."
        },
        {  # 122
            "restaurant_id": 15,
            "item_name": "California Red Crab Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 14.50,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2166fa1598b6a9add4db74b62477f628/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Red crab meat w/ avocado, cucumber & spicy sauce."
        },
        {  # 123
            "restaurant_id": 15,
            "item_name": "Yellowtail Scallion Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 8.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/19dc96e50902520bea54e0a1e2b55e9e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Yellowtail (hamachi), scallion, white rice & nori."
        },
        {  # 124
            "restaurant_id": 15,
            "item_name": "Vegetable Roll",
            "item_type": "Sushi Bar - Sushi Rolls",
            "price": 7.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/658ba720f06c7aa8b0f2607f0e04207c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Avocado, cucumber, nori, white rice & sesame seeds."
        },
        {  # 125
            "restaurant_id": 15,
            "item_name": "Sake",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 4.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a4d9c074dbd4aec16593bbba3591c3e5/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Atlantic Salmon."
        },
        {  # 126
            "restaurant_id": 15,
            "item_name": "Small Sashimi Box",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 20.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/638c366c5c23e3d16bbd5d79a877d0dc/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Mix of salmon, tuna & yellowtail sashimi (6 pieces total)."
        },
        {  # 127
            "restaurant_id": 15,
            "item_name": "Large Sashimi Box",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 40.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a291047f401ccb11e6fc2bd46f2150a0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Mix of salmon, tuna & yellowtail (12 pieces total)."
        },
        {  # 128
            "restaurant_id": 15,
            "item_name": "Maguro",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 4.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/7bfdf1694cd02a6d1ea023e7fb843c0e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Yellowfin tuna."
        },
        {  # 129
            "restaurant_id": 15,
            "item_name": "Hamachi",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 5.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d6443ab6c0552c6df0052a7ff03ef678/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Yellowtail."
        },
        {  # 130
            "restaurant_id": 15,
            "item_name": "Aburi Sake",
            "item_type": "Sushi Bar - Nigiri & Sashimi",
            "price": 5.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/7c41c1f80feb7c074162e74f1c15c224/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Salmon Belly."
        },
        {  # 131
            "restaurant_id": 15,
            "item_name": "Bara Chirashi",
            "item_type": "Sushi Bar - Rice Bowls",
            "price": 23.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2df30c7445777b551f6272d2d6b7db70/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tuna, salmon, yellowtail, wakame, jalapeño, cucumber, furikake, avocado w/ chili-soy sauce served over seasoned rice."
        },
        {  # 132
            "restaurant_id": 15,
            "item_name": "Ponzu Sake Don",
            "item_type": "Sushi Bar - Rice Bowls",
            "price": 21.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/64d5c59b94207cf40cdcbb8be99f2019/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Salmon, hijiki, avocado, red radish furikake & masago mixed w/ ponzu sauce."
        },
        {  # 133
            "restaurant_id": 15,
            "item_name": "Negi Toro Don",
            "item_type": "Sushi Bar - Rice Bowls",
            "price": 27.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a964a2ebfff9fc64862ae588f642e102/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Chopped tuna belly, nori, scallion, furikake, served over seasoned sushi rice."
        },
        {  # 134
            "restaurant_id": 15,
            "item_name": "Miso Soup",
            "item_type": "Sides & Extras",
            "price": 6.50,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/812c714bd73dcee9b89e32f97003c242/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Miso, dashi, tofu, scallion, wakame (16oz)."
        },
        {  # 135
            "restaurant_id": 15,
            "item_name": "Edamame",
            "item_type": "Sides & Extras",
            "price": 7.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9b851e0eeabd23e2c2de342ae71481ce/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Japanese soybean, sea salt."
        },
        {  # 136
            "restaurant_id": 15,
            "item_name": "Seaweed Salad",
            "item_type": "Sides & Extras",
            "price": 7.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/2bf2e555253d8593496b82cb231a1561/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
        },
    ]

    seed_menuitems = [db.session.add(
        MenuItem(**menuitem)) for menuitem in menuitems]
    db.session.commit()


def undo_menuitems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()
