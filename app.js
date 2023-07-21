const path = require('path');
const db = require('./util/database')
const Product = require("./models/product")
const User = require("./models/user")

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then((user) => {
        req.user = user
        next();
    })
    .catch((err) => {
        console.log(err)
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)


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
    app.listen(3002)
})
.catch((err) => {
    console.log(err)
})
