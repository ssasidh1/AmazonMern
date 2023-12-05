import express from 'express';
import { connectDB } from './connectDB.js';
import { AggBestSellCategoriesByYear,AggBestSellingCategories } from './aggregation.js';

const { client, database, collection } = await connectDB();
const app = express();

app.get("/api", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await AggBestSellCategoriesByYear(collection);
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/api/trends", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await AggBestSellingCategories(collection);
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.listen(3001, () => { console.log("Im listneing") })