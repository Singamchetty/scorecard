const express = require('express')
const { connectToDb, getDb } = require("./db")
const { ObjectId } = require("mongodb")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())



connectToDb((err) => {
    if (!err) {
        app.listen(4000, () => {
            console.log('app listening on port 4000')
        })
        db = getDb()
    }
})


app.get('/products', (req, res) => {
    db.collection('products').find().toArray()
        .then(result => { res.send(result) })
        .catch(error => res.status(500).send(error))
})

// app.get('/products', (req, res) => {
//     const  pageIndex=parseInt(req.query.p || "0")
//     let pageSize=5;
//     db.collection('products').find().skip(pageIndex*pageSize).limit(pageSize).toArray()
//     .then(result => {res.send(result)})
//     .catch(error => res.status(500).send(error))
// })

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        const numericId = Number(id);
        db.collection('products').findOne({ id: numericId })
            .then(result => {
                if (result != null) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ error: 'Product not found' });
                }
            })
            .catch(error => res.status(400).json({ error: 'Invalid ID' }));
    } else if (/^[a-zA-Z]+$/.test(id)) {
        res.status(404).json({ error: 'Invalid ID' });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

// Middleware function to check if userId already exists
const checkUserIdExists = (req, res, next) => {
    const userId = req.body.userId.trim();
    db.collection('users').findOne({ userId: userId })
        .then(result => {
            if (result) {
                res.status(400).json({ error: "userId already exists" });
            } else {
                next(); // Proceed to register user if userId is not taken
            }
        })
        .catch(error => res.status(500).json({ error: "Internal server error" }));
};

// Register User endpoint with middleware
app.post('/registeruser', checkUserIdExists, (req, res) => {
    const user = req.body;
    const userid = req.body.userId;
    db.collection('users').insertOne(user)
        .then(result => {
            res.status(201).json(result);
            db.collection('cartitems').insertOne({ userId: userid, cartItems: [] })
        })
        .catch(err => res.status(500).json({ error: "Could not create a new document" }));
});

// Get Users endpoint
app.get('/users', (req, res) => {
    // db.collection('users').find({}, { projection: { _id: false, userId: true, password: true } }).toArray()
    db.collection('users').find({}, { projection: { _id: false } }).toArray()
        .then(result => {
            res.send(result);
        })
        .catch(error => res.status(500).send(error));
});

//login api
app.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    try {
      const user = await db.collection('users').findOne({userId:userId})
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed', message: 'User not found' });
      }
      if (password === user.password && userId === user.userId) { 
        delete user.password;
        delete user._id;
        res.json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Authentication failed', message: 'Email and password do not match' });
      }
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

app.delete('/deregister/:userid', (req, res) => {
    const userid = req.params.userid
    if (isNaN(userid)) {
        db.collection('users').deleteOne({ userId: userid })
            .then(result => {
                res.send(result)
                db.collection('cartitems').deleteOne({ userId: userid })
            })
            .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})

app.patch('/updateuser/:id', (req, res) => {
    const Id = req.params.id
    const data = req.body
    if (ObjectId.isValid(Id)) {
        db.collection('users').updateOne({ _id: new ObjectId(Id) }, { $set: data })
            .then(result => { res.send(result) })
            .catch(error => res.status(500).send(error))
    } else {
        res.status(500).json({ error: 'Invalid ID' })
    }
})

app.get('/cartItems/:userid', (req, res) => {
    const userid = req.params.userid
    const usernameRegex = /^[a-zA-Z0-9_]{1,10}$/;
    if (usernameRegex.test(userid)) {
        db.collection('cartitems').findOne({ userId: userid })
        .then(result => {
            if (result != null) {
                res.status(200).send(result);
            } else {
                res.status(404).json({ error: 'UserCart not found' });
            }
        })
        .catch(error => res.status(500).send(error))
    } else {
        res.status(400).json({ error: 'Invalid UserId' })
    }
})

app.patch('/updateCartItems/:userid', async (req, res) => {
    const userid = req.params.userid;
    const newCartItem = req.body;

    // Check if userid is a number
    if (!isNaN(userid)) {
        return res.status(400).json({ error: 'Invalid UserId' });
    }

    try {
        // const cart = await db.collection('cartitems').findOne({ userId: userid });

        // if (!cart) {
        //     // If cart doesn't exist, create a new one with the newCartItem
        //     await db.collection('cartitems').insertOne({ userId: userid, cartItems: [newCartItem] });
        //     return res.status(200).json({ message: 'Cart created with new item' });
        // }

        // // Check if the item already exists in the cart
        // const existingItemIndex = cart.cartItems.findIndex(item => item.id === newCartItem.id);

        // if (existingItemIndex !== -1) {
        //     // If the item already exists, increase its quantity by 1
        //     cart.cartItems[existingItemIndex].qty += 1;
        // } else {
        //     // If the item doesn't exist, add it to the cart
        //     cart.cartItems.push(newCartItem);
        // }
        // // Update the cart with the modified cartItems
        // await db.collection('cartitems').updateOne({ userId: userid }, { $set: { cartItems: cart.cartItems } });
        await db.collection('cartitems').updateOne({ userId: userid }, { $set: { cartItems: newCartItem } });
        return res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
