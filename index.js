const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
const uri = process.env.MONGODB_URI;
console.log(uri);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

try {
      const { payload } = await jwtVerify(token, JWKS)
      console.log(payload);
      next()
} catch (error) {
  return res.status(401).json({message:"Forbidden"})
}

 
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destination");
    const bookingCollection = db.collection("booking");

    // Cancel Api
    app.delete("/booking/:bookingId",verifyToken, async (req, res) => {
      const { bookingId } = req.params;
      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(bookingId),
      });
      res.json(result);
    });

    // Get Api
    app.get("/destination", async (req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    });

    // Post Api
    app.post("/destination", async (req, res) => {
      const destinationData = req.body;
      const result = await destinationCollection.insertOne(destinationData);
      console.log(destinationData);
      res.json(result);
    });

    // Destination Id Api
    // Middleware
    app.get("/destination/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await destinationCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
      
    });

    // Patch Api
    app.patch("/destination/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;

      

      const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );
      res.json(result);
    });

    // Booking Get Api
    app.get("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId: userId }).toArray();
      res.json(result);
    });

    // Booking Post Api
    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
     
      res.json(result);
    });

    // Delete Api
    app.delete("/destination/:id", async (req, res) => {
      const { id } = req.params;
      const result = await destinationCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wanderlust API Server</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-slate-900 text-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
      
      <div class="max-w-xl w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm p-6 md:p-8 space-y-6">
        
        <!-- Header Section -->
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 animate-pulse">
            <i class="fa-solid fa-earth-americas text-3xl"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Wanderlust Server
            </h1>
            <p class="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
              Operational & Running smoothly
            </p>
          </div>
        </div>

        <hr class="border-slate-700/60" />

        <!-- Quick Stats / Status -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-850 p-4 rounded-xl border border-slate-700/30">
            <span class="text-xs text-slate-400 block mb-1">Database Connected</span>
            <span class="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <i class="fa-leaf text-emerald-500"></i> MongoDB Atlas
            </span>
          </div>
          <div class="bg-slate-850 p-4 rounded-xl border border-slate-700/30">
            <span class="text-xs text-slate-400 block mb-1">Environment</span>
            <span class="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <i class="fa-server text-blue-400"></i> Production Mode
            </span>
          </div>
        </div>

        <!-- Available Endpoints Tracker -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider">Available Endpoints</h3>
          
          <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-blue-400 font-bold bg-blue-950/50 px-2 py-0.5 rounded">GET</span>
              <span class="font-mono text-slate-300">/destination</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded">POST</span>
              <span class="font-mono text-slate-300">/destination</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-purple-400 font-bold bg-purple-950/50 px-2 py-0.5 rounded">PATCH</span>
              <span class="font-mono text-slate-300">/destination/:id</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-amber-400 font-bold bg-amber-950/50 px-2 py-0.5 rounded">GET</span>
              <span class="font-mono text-slate-300">/booking/:userId</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-rose-400 font-bold bg-rose-950/50 px-2 py-0.5 rounded">DELETE</span>
              <span class="font-mono text-slate-300">/booking/:bookingId</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center pt-2">
          <p class="text-xs text-slate-500">
            &copy; ${new Date().getFullYear()} Wanderlust API. All rights reserved.
          </p>
        </div>

      </div>

    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
