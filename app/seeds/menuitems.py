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
            "restaurant_id": 3,
            "item_name": "Beef Sukiyaki Fried Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 15.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/7cbb40cb4bb473934e0084a1f56d4dee/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Our signature thin-sliced Sukiyaki-marinated beef stir-fried with white rice, egg yolk, mushrooms, and sliced onions. Topped with diced red bell peppers, chopped green onions, and sesame seeds."
        },
        {  # 25
            "restaurant_id": 3,
            "item_name": "Umakara Beef Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 15.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9e0fdf9d701137b2f87dc2b3ff3d7a73/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Thin-sliced Yakishabu beef marinated in our sweet & spicy Umakara sauce with sliced onions on a bed of white rice and shredded cabbage. Topped with chopped green onions and sesame seeds."
        },
        {  # 26
            "restaurant_id": 3,
            "item_name": "Roast Beef Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 16.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4957db06828e1f2a4b881b55abb55627/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Premium roast beef on a bed of mixed greens and steamed rice. Topped with white and green onions, Signature soy-based barbecue sauce, and kuki wasabi."
        },
        {  # 27
            "restaurant_id": 3,
            "item_name": "Fried Chicken Karaage Rice Bowl",
            "item_type": "Gyu-Kaku Rice & Noodle Bowls",
            "price": 16.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a0ad1abeefcb13d8d594685ec2e951b4/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Japanese Fried Chicken Karaage on a bed of white rice and shredded cabbage. Topped with Japanese Chili Mayo and chopped green onions."
        },
        {  # 28
            "restaurant_id": 3,
            "item_name": "Spicy Beef Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/03ef5869edb7c76b00e9a0a46b3d38a0/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Gyu-Kaku original recipe: Japanese BBQ meets Ramen! Rich kalbi beef soup and medium thickness ramen noodles topped with thin-sliced beef, boiled egg, green onions, spinach, daikon radish, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 29
            "restaurant_id": 3,
            "item_name": "Tonkotsu Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://d1ralsognjng37.cloudfront.net/0576f9f8-fda5-4753-bbd8-1ed431df6e96.jpeg",
            "description": "Our Tonkotsu pork bone ramen comes with chunky, fatty braised pork belly Kakuni chashu and is topped with hard-boiled egg, chopped green onions, diced red bell peppers, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 30
            "restaurant_id": 3,
            "item_name": "Goma Negi Shio Ramen",
            "item_type": "Gyu-Kaku Signature Ramen",
            "price": 14.00,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b695d7f5581a3aabaf6dae06af2c99fd/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Beef and shio-based soup with medium-thick ramen noodles and thick braised pork belly Kakuni chashu. Toppings also include boiled egg, green onion, and sesame seeds. Ramen noodles and hot soup are packaged separately to maintain their maximum deliciousness. Please reheat soup in the microwave (if necessary) and pour over noodles."
        },
        {  # 31
            "restaurant_id": 3,
            "item_name": "Miso Chili Wings",
            "item_type": "Appetizers",
            "price": 11.00,
            "image_url": "https://d1ralsognjng37.cloudfront.net/291435e7-7ec2-43d1-9974-64d76eb07223.jpeg",
            "description": "Five (5) fried chicken wings coated in our sweet & spicy Miso Chili sauce."
        },
        {  # 32
            "restaurant_id": 3,
            "item_name": "Takoyaki",
            "item_type": "Appetizers",
            "price": 8.95,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a3a52ffeae1752320fab4f2c53b6947f/4218ca1d09174218364162cd0b1a8cc1.jpeg",
            "description": "Fried Octopus Balls! A street food classic straight from Osaka. Six fried octopus fritters drizzled with Takoyaki sauce and Japanese mayo. Topped with crushed bonito flakes and green onions."
        },
        {  # 33
            "restaurant_id": 3,
            "item_name": "Fried Pork Gyoza Dumplings",
            "item_type": "Appetizers",
            "price": 8.45,
            "image_url": "https://d1ralsognjng37.cloudfront.net/b0b34333-c768-4f21-a455-ba957858a97e.jpeg",
            "description": "Five (5) Fried Pork Gyoza Dumplings with Ponzu citrus soy dipping sauce."
        },
        {  # 34
            "restaurant_id": 5,
            "item_name": "Iced Chai Tea Latte",
            "item_type": "Cold Coffees",
            "price": 5.45,
            "calory": 180,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d932f9eeeca81e9b68a67a75d2a6b575/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Black tea infused with cinnamon, clove, and other warming spices are combined with milk and ice for the perfect balance of sweet and spicy."
        },
        {  # 35
            "restaurant_id": 5,
            "item_name": "Iced Caramel Macchiato",
            "item_type": "Cold Coffees",
            "price": 5.75,
            "calory": 180,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0f807b4e32b914f08da3ac400015ba36/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "We combine our rich, full-bodied espresso with vanilla-flavored syrup, milk and ice, then top it off with a caramel drizzle for an oh-so-sweet finish."
        },
        {  # 36
            "restaurant_id": 5,
            "item_name": "Iced Brown Sugar Oatmilk Shaken Espresso",
            "item_type": "Cold Coffees",
            "price": 6.15,
            "calory": 100,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/f56f0855a7acabddd4d116368bf2e593/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "First we shake Starbucks® Blonde espresso, brown sugar and cinnamon together, and then top it off with oatmilk and ice for a cool lift to power you through your day."
        },
        {  # 37
            "restaurant_id": 5,
            "item_name": "Iced Caffè Americano",
            "item_type": "Cold Coffees",
            "price": 3.95,
            "calory": 10,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/357988caa65cb3bbd94e162d2ba05405/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Espresso shots topped with cold water produce a light layer of crema, then served over ice. The result: a wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot."
        },
        {  # 38
            "restaurant_id": 5,
            "item_name": "Salted Caramel Cream Cold Brew",
            "item_type": "Cold Coffees",
            "price": 5.75,
            "calory": 190,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/4fe6d45fa28ceaa366643f8afcee36bb/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Here's a savory-meets-sweet refreshing beverage certain to delight: our signature, super-smooth cold brew, sweetened with a touch of caramel and topped with a salted, rich cold foam."
        },
        {  # 39
            "restaurant_id": 5,
            "item_name": "Starbucks® Cold Brew Coffee with Milk",
            "item_type": "Cold Coffees",
            "price": 4.95,
            "calory": 25,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/6f2aba446901aa426be6126bec9e052e/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our custom blend of beans are grown to steep long and cold for a super-smooth flavor. Starbucks® Cold brew is handcrafted in small batches daily, slow-steeped in cool water for 20 hours, without touching heat and finished with a splash of milk."
        },
        {  # 40
            "restaurant_id": 5,
            "item_name": "Caffè Latte",
            "item_type": "Hot Coffees",
            "price": 4.95,
            "calory": 100,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/c8e3f707caface9f3b529b7d8671c7d1/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up."
        },
        {  # 41
            "restaurant_id": 5,
            "item_name": "White Chocolate Mocha",
            "item_type": "Hot Coffees",
            "price": 5.75,
            "calory": 230,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/fdefc21d2afadff084d8a071a31fd6b0/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our signature espresso meets white chocolate sauce and steamed milk, and then is finished off with sweetened whipped cream to create this supreme white chocolate delight."
        },
        {  # 42
            "restaurant_id": 5,
            "item_name": "Caramel Macchiato",
            "item_type": "Hot Coffees",
            "price": 5.75,
            "calory": 120,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/1bd36f1ea68af7c6457337ba74b445d3/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish."
        },
        {  # 43
            "restaurant_id": 5,
            "item_name": "Cappuccino",
            "item_type": "Hot Coffees",
            "price": 4.95,
            "calory": 70,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/bc8f2d402a705c9dd5320c5387223e21/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft."
        },
        {  # 44
            "restaurant_id": 5,
            "item_name": "Mocha Cookie Crumble Frappuccino",
            "item_type": "Frappuccino Blended Beverages",
            "price": 6.15,
            "calory": 350,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/6d167b97ad74bc7f8b1e12564a8e0b32/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Frappuccino® Roast coffee, mocha sauce and Frappuccino® chips blended with milk and ice, layered on top of whipped cream and chocolate cookie crumble and topped with vanilla whipped cream, mocha drizzle and even more chocolate cookie crumble. Each sip is as good as the last . . . all the way to the end."
        },
        {  # 45
            "restaurant_id": 5,
            "item_name": "Caramel Frappuccino Blended Beverage",
            "item_type": "Frappuccino Blended Beverages",
            "price": 5.75,
            "calory": 260,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/e0d6a1fd09ac2d49a366b88ae0ab807c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Caramel syrup meets coffee, milk and ice for a rendezvous in the blender, while whipped cream and buttery caramel sauce layer the love on top. To change things up, try it affogato-style with a hot espresso shot poured right over the top."
        },
        {  # 46
            "restaurant_id": 5,
            "item_name": "Caffè Vanilla Frappuccino Blended Beverage",
            "item_type": "Frappuccino Blended Beverages",
            "price": 5.75,
            "calory": 280,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0edae087222f0d82043caaf360332fba/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "We take Frappuccino® roast coffee and vanilla bean powder, combine them with milk and ice, topped with whipped cream. Tastes like happiness."
        },
        {  # 47
            "restaurant_id": 5,
            "item_name": "Dragon Drink Starbucks Refreshers® Beverage",
            "item_type": "Cold Drinks",
            "price": 5.65,
            "calory": 110,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/0d05e260dcdacd0f687eb756ac2bee18/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "This tropical-inspired pick-me-up—crafted with sweet mango and dragonfruit flavors and hand-shaken with creamy coconutmilk, ice and a scoop of real diced dragonfruit—creates a refreshing and surprising delight in the fall."
        },
        {  # 48
            "restaurant_id": 5,
            "item_name": "Strawberry Açaí Starbucks Refreshers Beverage",
            "item_type": "Cold Drinks",
            "price": 4.95,
            "calory": 80,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/233695d11725dfdd2317107aba83dda4/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Sweet strawberry flavors accented by passion fruit and açaí notes, shaken with ice and real strawberry pieces—a welcoming sweet spot of refreshment."
        },
        {  # 49
            "restaurant_id": 5,
            "item_name": "Paradise Drink Starbucks Refreshers Beverage",
            "item_type": "Cold Drinks",
            "price": 5.65,
            "calory": 110,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/a5ecbe2ba6df8ff2154fbd0ce98ad2dc/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Tropical flavors of pineapple and passionfruit combine with diced pineapple and creamy coconutmilk to create a delicious island escape."
        },
        {  # 50
            "restaurant_id": 5,
            "item_name": "Lemonade",
            "item_type": "Cold Drinks",
            "price": 2.95,
            "calory": 80,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b0e4697135dbd08b84c9e3c2619d6044/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Awaken your taste buds with the zing of refreshing lemonade—this tangy, fresh sip puts a little zip in your step."
        },
        {  # 51
            "restaurant_id": 5,
            "item_name": "Iced Black Tea",
            "item_type": "Cold Drinks",
            "price": 3.75,
            "calory": 0,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/04cd7d504500f9db768f2bd4aedc86c8/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Premium black tea sweetened just right and shaken with ice to create an ideal iced tea—a rich and flavorful black tea journey awaits you."
        },
        {  # 52
            "restaurant_id": 5,
            "item_name": "Iced Passion Tango Tea",
            "item_type": "Cold Drinks",
            "price": 3.75,
            "calory": 0,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/35086bb8b4fe568d3b67906572690acd/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A blend of hibiscus, lemongrass and apple hand-shaken with ice: a refreshingly vibrant tea infused with the color of passion."
        },
        {  # 53
            "restaurant_id": 5,
            "item_name": "Double-Smoked Bacon, Cheddar & Egg Sandwich",
            "item_type": "Bakery",
            "price": 6.75,
            "calory": 500,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/fb519df2d047d5542dacebc8548cd25b/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Bacon smoked for six hours over hickory wood chips, stacked with a cage-free fried egg, topped with a melted slice of sharp Cheddar cheese—all on our signature croissant bun. -HIGH-PROTEIN"
        },
        {  # 54
            "restaurant_id": 5,
            "item_name": "Sausage, Cheddar & Egg Sandwich",
            "item_type": "Bakery",
            "price": 5.25,
            "calory": 480,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/9fccc88a8da59bdd92161226a7386cb7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "A savory sausage patty, fluffy cage-free eggs and aged Cheddar cheese on a perfectly toasted English muffin. -HIGH-PROTEIN"
        },
        {  # 55
            "restaurant_id": 5,
            "item_name": "Butter Croissant",
            "item_type": "Bakery",
            "price": 4.45,
            "calory": 250,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/d887b0305178efd47272079624b548ef/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Classic butter croissant with soft, flaky layers and a golden-brown crust. -VEGETARIAN"
        },
        {  # 56
            "restaurant_id": 5,
            "item_name": "Caffè Americano",
            "item_type": "Hot Coffees",
            "price": 3.95,
            "calory": 5,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/3e6b2dab8acdd087797b91fc30c209b7/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot."
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
