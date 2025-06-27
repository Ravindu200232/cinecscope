import {MongoClient, MonogoClient} from 'mongodb';

const OPTIONS = {};
const MONGODB_URI = "mongodb+srv://ravindu:R200232@cluster0.vikkn.mongodb.net/MovieApp?retryWrites=true&w=majority&appName=Cluster0" || "mongodb://localhost:27017";

const client = new MongoClient(MONGODB_URI,OPTIONS);

export const db = client.db("sample_mflix");