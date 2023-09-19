# Flavor Eats 🍔🌮🍕

[View Live Site](https://flavor-eats.onrender.com/)

Welcome to Flavor Eats, your one-stop web application that seamlessly combines the best of e-commerce for both customers and restaurant businesses.

Customers can search for their preferred cuisines and restaurants, manage multiple shopping carts and track their orders. On the flip side, business managers have access to a user-friendly dashboard for monitoring sales performance, managing menus and orders and engaging with customer feedback. Flavor Eats has got you covered on both fronts!

## Customer-Centric Features:🍽️📦

### 1. Fuzzy Search:🔍

Customers can perform efficient searches across various types: dishes, restaurants cuisine types, or keywords in descrption.

### 2. Multi-Restaurant Cart Management:🛒

Create and manage multiple shopping carts across different restaurants.

### 3. Real-time Map Tracking:🗺️

Track the duration and location of your order on Google map for enhanced transparency.

### 4. Order History and Ratings:📜

Access order history, reorder favorite items with a single click, view invoices, and provide ratings for dishes and orders.

### 5. Personalized Recommendations:📍

Receive restaurant and dish recommendations based on geolocation and user reviews.

## Business Management Tools:📊🍴

### 1. Business Dashboard:📈

Business managers gain access to an intuitive dashboard for monitoring sales performance, order tracking, and data-driven decision-making.

### 2. Menu Management:🍽️

Effortlessly update restaurant menus, including indexing, sorting, adding, and removing dishes.

### 3. Customer Feedback:📣

Engage with customers through feedback collection, enabling improvements in service and offerings.

### 4. Start a New Business:🚀

Our platform facilitates the process of starting a new restaurant business, editing store profiles, and removing businesses.

## TechStack

### Languages

![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

### Frameworks and Libraries

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![google map](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Database:

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000)
![AWS](https://img.shields.io/badge/Amazon_AWS-%23232f3e.svg?style=for-the-badge&logo=amazonaws&logoColor=ec912d)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Database Schema Design
![schema](https://user-images.githubusercontent.com/43865099/268796979-82d155bd-2346-4955-9b1d-9f014ab4ac86.PNG)

## How to Build Locally

1. Clone this repository (only this branch)

2. In the root directory:

   ```shell
   # build command - enter all in one line
   pipenv install -r requirements.txt &&
   pipenv shell &&
   cp .env.example .env &&
   flask db upgrade &&
   flask seed all &&
   flask run
   ```

3. In a second terminal:

   ```shell
   cd react-app &&
   npm install &&
   npm start
   ```

4. In the brower, open http://localhost:3000/

## Developer

- Meng (Maggie) Tian
  - https://www.maggietian.com/
  - https://github.com/mengtian1212
  - https://www.linkedin.com/in/mengtian1212/
  - mengtian.thu@gmail.com

For more details on features and application architecture please refer to the wiki page:

- [Backend Endpoints & Frontend Routes](https://github.com/mengtian1212/FlavorEats/wiki/Backend-Endpoints-&-Frontend-Routes)
- [Feature List](https://github.com/mengtian1212/FlavorEats/wiki/Feature-List)
- [User Stories](https://github.com/mengtian1212/FlavorEats/wiki/User-Stories)
- [Wireframes](https://github.com/mengtian1212/FlavorEats/wiki/Wireframes)
