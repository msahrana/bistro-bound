const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bistro-bound.web.app",
    "https://bistro-bound.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.crgl3kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollection = client.db("bistroBossDB").collection("menu");
    const reviewsCollection = client.db("bistroBossDB").collection("reviews");
    const cartsCollection = client.db("bistroBossDB").collection("carts");
    const usersCollection = client.db("bistroBossDB").collection("users");
    const membersCollection = client.db("bistroBossDB").collection("members");
    const paymentsCollection = client.db("bistroBossDB").collection("payments");

    /* Verify Token Middleware */
    const verifyToken = (req, res, next) => {
      const authHeader = req?.headers?.authorization;
      if (!authHeader) {
        return res.status(401).send("Unauthorized access");
      }
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).send({message: "forbidden access"});
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = {email: email};
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({message: "forbidden access"});
      }
      next();
    };

    /* jwt api */
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7D",
      });
      res.send({token});
      // res.cookie("token", token, cookieOptions).send({success: true});
    });

    /* menu api */
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await menuCollection.findOne(query);
      res.send(result);
    });

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    });

    app.patch("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          ...item,
        },
      };
      const result = await menuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    /* review api */
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    /* carts api */
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/cart", async (req, res) => {
      const result = await cartsCollection.find().toArray();
      res.send(result);
    });

    app.get("/cart/:id", async (req, res) => {
      const result = await cartsCollection.find().toArray();
      res.send(result);
    });

    app.patch("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      const filter = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          ...body,
          status: "Done",
        },
      };
      const result = await cartsCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cart = req.body;
      const result = await cartsCollection.insertOne(cart);
      res.send(result);
    });

    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    /* user api */
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({message: "forbidden access"});
      }
      const query = {email: email};
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({admin});
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      const query = {email: user?.email};
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/user/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    /* payment intent */
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const {price} = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({clientSecret: paymentIntent.client_secret});
    });

    /* payment api */
    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = {email: req.params.email};
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({message: "forbidden access"});
      }
      const result = await paymentsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentsCollection.insertOne(payment);
      console.log("payment-info", payment);
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      const deleteResult = await cartsCollection.deleteMany(query);
      res.send({paymentResult, deleteResult});
    });

    /* membership */
    app.post("/members", async (req, res) => {
      const member = req.body;
      const result = await membersCollection.insertOne(member);
      res.send(result);
    });

    app.get("/members/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await membersCollection.findOne(query);
      res.send(result);
    });

    /* admin stats */
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentsCollection.estimatedDocumentCount();
      const result = await paymentsCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {$sum: "$price"},
            },
          },
        ])
        .toArray();
      const revenue = result.length > 0 ? result[0].totalRevenue : 0;
      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });

    app.get("/order-stats", async (req, res) => {
      const result = await paymentsCollection
        .aggregate([
          {
            $addFields: {
              menuItemIds: {
                $map: {
                  input: "$menuItemIds",
                  as: "menuId",
                  in: {$toObjectId: "$$menuId"},
                },
              },
            },
          },
          {
            $unwind: "$menuItemIds",
          },
          {
            $lookup: {
              from: "menu",
              localField: "menuItemIds",
              foreignField: "_id",
              as: "menuItem",
            },
          },
          {
            $unwind: "$menuItem",
          },
          {
            $group: {
              _id: "$menuItem.category",
              quantity: {$sum: 1},
              revenue: {$sum: "$menuItem.price"},
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              quantity: "$quantity",
              revenue: "$revenue",
            },
          },
        ])
        .toArray();
      res.send(result);
      console.log(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bistro Boss server is running");
});

app.listen(port, () => {
  console.log(`Bistro Boss server is running on port: ${port}`);
});
