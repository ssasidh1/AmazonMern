import express from 'express';
import { connectDB } from './connectDB.js';
import { AggBestSellCategoriesByYear,brandTrend, bestSellerPerManufacturer, manufacturerYearlyRating, topManufacturerPerYear, topProductsPerYear } from './aggregation.js';

const { client, database, collection } = await connectDB();
const app = express();

app.get("/api/cat/best/year/:brand", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await AggBestSellCategoriesByYear(collection,req.params.brand);
        console.log(" call completed ",req.url)
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/api/cat/trends/:brand", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await brandTrend(collection,req.params.brand);
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/api/manu/bestseller", async (req, res) => {
    try {
        console.log(" recieved the message ");
        //const result = await AggBestSellCategoriesByYear(collection);
        console.log(" caught")
        const result = await bestSellerPerManufacturer(collection);
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get("/api/products/best/year", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await topProductsPerYear(collection);
        console.log(" TopProductsperyear",result)
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get("/api/manu/best/year", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await topManufacturerPerYear(collection);
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

function modelData(data){
    
    // let map={}
    // data.map((obj)=>{
    //     if(!Object.hasOwn(map,obj.manufacturer))map[obj.manufacturer]=obj.manufacturer;
    // })
    
    // data.map((obj)=>{
    //     return{}
    // })

}
app.get("/api/manu/yearly/", async (req, res) => {
    try {

        //const result = await AggBestSellCategoriesByYear(collection);
        const result = await manufacturerYearlyRating(collection);
        modelData(result);
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(3001, () => { console.log("Im listneing") })