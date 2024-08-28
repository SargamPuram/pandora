import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import userSign from './routes/userSignIn';
import createWallet from './routes/walletRoutes';
import newWallets from './routes/walletCreator'


const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend's origin
  methods: ['GET', 'POST'], // Allow specific HTTP methods
// If you need to include cookies or headers
}));

app.use(bodyParser.json());


// postgres + prisma => ORM postgresql://postgresql_owner:OVgunaSi58MX@ep-withered-paper-a5ml9fz9.us-east-2.aws.neon.tech/postgresql?sslmode=require

// CONNECTION URL TO DATABASE

// app.use('/api/users', userRoutes);
app.use(userSign);
app.use(createWallet)
app.use(newWallets)

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});





