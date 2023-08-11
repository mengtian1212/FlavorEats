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
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0005_BigMac_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Ever wondered what's on a Big Mac? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun."
        },
        {  # 2
            "restaurant_id": 1,
            "item_name": "Cheeseburger",
            "item_type": "Burgers",
            "price": 4.09,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0003_Cheeseburger_StraightBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Enjoy the cheesy deliciousness of a McDonald's Cheeseburger! Our simple, classic cheeseburger begins with a 100% pure beef burger patty seasoned with just a pinch of salt and pepper. "
        },
        {  # 3
            "restaurant_id": 1,
            "item_name": "Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 7.29,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0007-005_QuarterPounderwithCheese_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Each Quarter Pounder with Cheese burger features a ¼ lb.* of 100% fresh beef that's hot, deliciously juicy and cooked when you order. "
        },
        {  # 4
            "restaurant_id": 1,
            "item_name": "Double Hamburger",
            "item_type": "Burgers",
            "price": 4.19,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202006_0001_Hamburger_Alt_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The Classic McDonald's Hamburger starts with a 100% pure beef patty seasoned with just a pinch of salt and pepper. Then, the McDonald's burger is topped with a tangy pickle, chopped onions, ketchup, and mustard. "
        },
        {  # 5
            "restaurant_id": 1,
            "item_name": "Cheesy Jalapeño Bacon Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 11.79,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_CheesyJalapenoBaconQPC_Single_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Introducing McDonald's new Cheesy Jalapeño Bacon QPC, featuring our 100% fresh beef Quarter Pounder patty that's cooked right when you order so it's hot and juicy every time. "
        },
        {  # 6
            "restaurant_id": 1,
            "item_name": "Bacon Quarter Pounder with Cheese",
            "item_type": "Burgers",
            "price": 9.19,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_4295-005_BaconQPC_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Each Quarter Pounder with Cheese Bacon burger features thick-cut applewood smoked bacon atop a ¼ lb.* of 100% McDonald's fresh beef that's cooked when you order."
        },
        {  # 7
            "restaurant_id": 1,
            "item_name": "McChicken",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 4.39,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201909_4314_McChicken_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "It's a classic for a reason. Savor the satisfying crunch of our juicy chicken patty, topped with shredded lettuce and just the right amount of creamy mayonnaise, all served on a perfectly toasted bun."
        },
        {  # 8
            "restaurant_id": 1,
            "item_name": "McCrispy",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 6.89,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202012_0383_CrispyChickenSandwich_PotatoBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The McDonald's McCrispy is a southern-style fried chicken sandwich that's crispy, juicy and tender perfection. It's topped with crinkle-cut pickles and served on a toasted, buttered potato roll. The McCrispy has 470 calories."
        },
        {  # 9
            "restaurant_id": 1,
            "item_name": "Filet-O-Fish",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 7.29,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202001_5926_Filet-O-Fish_HalfSlice_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Dive into our wild-caught Filet-O-Fish, a classic McDonald's fish sandwich! Our fish sandwich recipe features a crispy fish filet patty on melty American cheese and is topped with creamy McDonald's tartar sauce, all served on a soft, steamed bun."
        },
        {  # 10
            "restaurant_id": 1,
            "item_name": "Spicy Deluxe McCrispy",
            "item_type": "Chicken & Fish Sandwiches",
            "price": 9.09,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The Spicy Deluxe McCrispy is big on everything, including heat. Our southern-style fried chicken fillet on a potato roll, topped with shredded lettuce, Roma tomatoes and Spicy Pepper Sauce kicks crispy, juicy and tender up to the highest level."
        },
        {  # 11
            "restaurant_id": 1,
            "item_name": "French Fries",
            "item_type": "Fries",
            "price": 4.69,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_8932_MediumFries_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "McDonald's World Famous Fries are made with premium potatoes such as the Russet Burbank and the Shepody. With 0g of trans fat per labeled serving, these epic fries are crispy and golden on the outside and fluffy on the inside. "
        },
        {  # 12
            "restaurant_id": 1,
            "item_name": "Big Mac Meal",
            "item_type": "Combo Meals",
            "price": 12.59,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/b9eb19b19727cbea4de310a92374e222/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
        },
        {  # 13
            "restaurant_id": 1,
            "item_name": "Double Quarter Pounder with Cheese Meal",
            "item_type": "Combo Meals",
            "price": 16.09,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/5c18cdc1ae72115291f42399a0148147/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
        },
        {  # 14
            "restaurant_id": 1,
            "item_name": "Hamburger Happy Meal",
            "item_type": "Combo Meals",
            "price": 10.69,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202103_6975_HamburgerHappyMeal_AppleSlices_WhiteMilkJug_Left_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
        },
        {  # 15
            "restaurant_id": 1,
            "item_name": "10 Piece McNuggets Meal",
            "item_type": "Combo Meals",
            "price": 12.59,
            "image_url": "https://tb-static.uber.com/prod/image-proc/processed_images/71ead9db896ec112fd16e0dfa247efe9/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
            "description": "Our Chicken McNugget Happy Meal features ten tender Chicken McNuggets made with white meat, World Famous Fries and a side of beverage."
        },
        {  # 16
            "restaurant_id": 1,
            "item_name": "OREO McFlurry",
            "item_type": "Sweets & Treats",
            "price": 5.99,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_3832_OREOMcFlurry_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "The McDonald's McFlurry with OREO Cookies is a popular combination of creamy vanilla soft serve with crunchy pieces of OREO cookies!"
        },
        {  # 17
            "restaurant_id": 1,
            "item_name": "Vanilla Cone",
            "item_type": "Sweets & Treats",
            "price": 1.99,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202106_0336_LargeVanillaCone_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Treat yourself to a delicious Vanilla Cone Treat from McDonald's! Our Vanilla Cone features creamy vanilla soft serve in a crispy cone. It's the perfect sweet treat in addition to any McDonald's meal or on its own."
        },
        {  # 18
            "restaurant_id": 1,
            "item_name": "Strawberry Shake",
            "item_type": "Sweets & Treats",
            "price": 6.19,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_1513_MediumStrawberryShake_Glass_A1_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Get a delicious McDonald's Strawberry Shake—the perfect sweet treat for any day. Our Strawberry Shake recipe features creamy vanilla soft serve blended with strawberry syrup and finished with whipped light cream. "
        },
        {  # 19
            "restaurant_id": 1,
            "item_name": "Apple Pie",
            "item_type": "Sweets & Treats",
            "price": 2.29,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202004_0706_BakedApplePie_Broken_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "McDonald's Baked Apple Pie recipe features 100% American-grown apples, and a lattice crust baked to perfection and topped with sprinkled sugar."
        },
        {  # 20
            "restaurant_id": 1,
            "item_name": "Coke",
            "item_type": "Beverages",
            "price": 3.69,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/DC_202112_0521_MediumCoke_Glass_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "Enjoy a cold, refreshing Coca-Cola soda from McDonald's that complements all your menu favorites. "
        },
        {  # 21
            "restaurant_id": 1,
            "item_name": "Sprite",
            "item_type": "Beverages",
            "price": 3.69,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_MediumSprite_Glass_832x472:product-header-desktop?wid=830&hei=456&dpr=off",
            "description": "Cool off with the refreshing McDonald's Sprite®—the classic and delicious lemon-lime fountain drink. "
        },
        {  # 22
            "restaurant_id": 1,
            "item_name": "Minute Maid Premium Orange Juice",
            "item_type": "Beverages",
            "price": 4.09,
            "image_url": "https://s7d1.scene7.com/is/image/mcdonalds/Header_MediumMinuteMaidPremiumOrangeJuice_832x472:product-header-desktop?wid=830&hei=458&dpr=off",
            "description": "100% orange juice, packed with Vitamin C."
        },
        {  # 23
            "restaurant_id": 1,
            "item_name": "Hot Chocolate",
            "item_type": "Beverages",
            "price": 4.09,
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
