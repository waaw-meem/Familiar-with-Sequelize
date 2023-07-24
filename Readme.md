<h1>Understanding Sequelize</h1>

<p>
Sequelize is an Object-Relational Mapping (ORM) library for Node.js that provides an easy way to interact with relational databases like MySQL, PostgreSQL, SQLite, and MSSQL using JavaScript. It simplifies database operations by abstracting away the raw SQL queries and allows developers to work with databases using JavaScript objects and methods.

<b>Key features of Sequelize include:</b>

Model-Driven Approach: Sequelize introduces the concept of models, which are JavaScript representations of database tables. Each model defines the structure of a table and its relationships with other tables.

Associations: Sequelize allows you to define associations between models, such as one-to-one, one-to-many, and many-to-many relationships. These associations help in creating complex queries and managing relationships between different entities in the database.

Data Validation: Sequelize supports data validation, ensuring that data entered into the database follows specific rules and constraints, improving data integrity.

Migrations: Migrations are scripts that help manage the evolution of the database schema over time. Sequelize simplifies the process of creating and running database migrations, making it easier to manage database schema changes in development and production environments.

Query Building: Sequelize provides a query builder that allows you to construct complex SQL queries using JavaScript methods instead of writing raw SQL.

Hooks: Sequelize supports lifecycle hooks that enable you to execute code before or after certain database operations, providing flexibility to handle various scenarios.

Transactions: Sequelize supports database transactions, allowing you to group multiple database operations into a single transaction, ensuring that either all operations succeed or none of them are executed.

Connection Pooling: Sequelize handles connection pooling to improve performance and efficiently manage database connections.

By using Sequelize, developers can build scalable, maintainable, and database-agnostic applications. It abstracts away much of the complexity of dealing with databases directly and provides a higher-level, more intuitive API to interact with the database. Sequelize is widely used in Node.js applications that require database operations, especially when working with relational databases.
</p>

<h3>Connecting to a Database</h3>

<p>
As we describe all things in pervious database file which is actually we define our pool actions and as well as database information

Now When we use sequelize then we install sequelize package and besides this we import it on database file

Secondly, we change some coding stuff as well to define our db info as well. Example:

<code>
const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql-node','root','Nodecomplete',
{dialect:'mysql',
host:'localhost'}
)

module.exports = sequelize
</code>
</p>

<h3>Defining a Method</h3>

<p>
In models file we write code to create table in database via models. thus, we import package of sequelize and as well as give path of database file. after importing process we code to create table for specific thing (eg: product)

<code>
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
</code>

</p>

<h3>Syncing JS Definitions to the Database</h3>

<p>
Mostly we use to connect our database with app in app.js file and therefore we use sync() method
In Sequelize, the sync method is used to synchronize the defined model schema with the corresponding database table. It creates the table if it doesn't exist or updates the table's schema if there are any changes in the model definition.

The sync method is generally used during development or in scripts for setting up the database schema based on the defined Sequelize models. However, it's important to note that using sync in a production environment is generally not recommended, as it can lead to data loss or other unintended consequences if used incorrectly.

</p>

<h3>Inserting data</h3>
<p>
We can insert data with the help of created table in models and database as well as we two types of method to insert and create data

<ul>
<li>build()</li>
<li>create() (Mostly Preferred)</li>
</ul>

In Sequelize, both the build and create methods are used to create instances of model objects, but they differ in how they interact with the database.

build method:
The build method is used to create a new model instance in memory without persisting it to the database. It returns an unsaved model object that you can manipulate or set property values on before explicitly saving it to the database using the save method.

create method:
The create method, on the other hand, is used to create a new model instance and immediately save it to the database. It combines the build and save operations into a single step. The method returns a promise that resolves with the newly created model instance.

Use the build method when you want to create an unsaved instance in memory, make changes, and then explicitly save it to the database using the save method.
Use the create method when you want to create a new instance and immediately save it to the database in a single step.

</p>

<h3>Retrieving Data & Finding Products</h3>

<p>
For Retrieving Data we use one method and that was findAll()

Example : Product.findAll()

In findAll we can pass parameters to fetch some specific product like:

Product.findAll({where:{id:prodId}})

<code>
  Product.findAll()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch((err) => {
    console.log(err)
  })
</code>
</p>

<h3>Getting a Single Product with the _where_ Condition</h3>

<p>
Whenever you want to fetch some specific data you can use one method for it
findByPk(prodId)

The other method is actually we can also use findAll() with 'WHERE' conditions

</p>

<h3>Updating Products</h3>

<p>To update a product list we use same methods findByPk()
But one thing which is important when we post an product to save that in real database
we can save update data with save() method like product.save()

</p>

<h3>Deleting Products</h3>
<p>We can delete product with destroy() method

<code>
 Product.findByPk(prodId)
  .then(product => {
  return product.destroy()
  })
  .then(result => {
    console.log('DELETE PRODUCT')
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err)
  })

</code>

</p>

<h3>Adding a One-To-Many Relationship</h3>

<p>
In this module we define relations of the tables.

Product hasMany Orders
User hasMany Product 
Cart hasMany Carts && Every User contain one Cart
Order (Every User have one order or many orders item)

We define relation in app.js by importing all models which will use to attach or connect.

<code>
Product.belongsTo(User, {constraints:true,onDelete:'CASCADE'})

This is Optional!
 {constraints:true,onDelete:'CASCADE'}

We can write this code or relation in different methods example:

User.hasMany(Product)
</code>
To stop overriding a table we use different technique because if we have already a table which was created in MySQL db then we should do this in sync() method

<code>
sync({force:true})
</code>

</p>


<h3>Creating & Managing a Dummy User</h3>

<p>We can create dummy User in app.js file we are creating single user without any form data
due to just testing purpose and besides this we can get this user from requesting and therefore we use middleware for it

<code>
app.use((req,res,next) => {
    User.findByPk(1)
    .then((user) => {
        req.user = user
    })
    .catch((err) => {
        console.log(err)
    })
})
</code>

<code>
db
// .sync({force:true})
.sync()
.then((result) => {
   return User.findByPk(1)
})
.then(user => {
   if(!user){
    return User.create({name:'Wali',email:'abc@gmail.com'})
   }
   return user
})
.then(user => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})
</code>
</p>

<h3>Using Magic Association Methods</h3>

<p>
createAssociation:
getAssociation
setAssociation
addAssociation and removeAssociation:
</p>

<h3>Fetching Related Products</h3>

<p>In this video we use magic association in admin side controller</p>


<h3>One-To-Many & Many-To-Many Relations</h3>

<p>In this we create new models and create tables according to the requirement besides this we define relations as well on app.js file</p>
