# Wine Store
JavaScript single page application made with Page JS and Lit HTML
## :speech_balloon: Concept
An application that receives customer orders and uses authentication and authorization. 
The main CRUD operations - GET, POST, PUT have been implemented as well as storing user's orders.
## :hammer_and_pick: Technologies used 
* JavaScript
* Page.js: https://visionmedia.github.io/page.js
* Lit HTML: https://lit.dev
* WebPack: https://webpack.js.org
## :information_source: Structure
The application has the following parts:
### Home page
* They can visit all other sections depending on the authentication status
* Guests can see wines of the week 
* They can add wines to the shopping cart
### Products
Products can be filtered by type and price simultaneously.
Items can be searched by the first letters of product name. Searching is case-insensitive.
Guests and users can see product details and add items to the cart from this page. 
### Login
To finalize the order, any guest should log in first.
The application has two users preliminary registered which can be used for immediate testing: 
* email: "ivan@abv.bg", password: 123456
* email: "ana@abv.bg", password: 123456
### Register 
In case the guest has no account, he can register at the Register Page.
### Details
This page shows more details about a single product and supports the option to add the item to the shopping cart.
### Ordering process and cart functionality
Guests and users can choose wines from the Products and Details Pages. Quantity can be increased / decreased and the total amount of the order is immediately calculated. When quantity reaches 0, the item is automatically  removed from the cart.
There is an option to remove a product from the shopping cart.
### Customer's order
The logged in user can see all his orders with information of the exact time of creation. Total amount of orders as well as total of the specific order is shown.
If a quest is not logged in he is prompted to log in before confirming his order.
### About page
* Some information about the store
## :paperclips: Project link on Internet
* Now available at :point_right: : https://wine-store-project.web.app