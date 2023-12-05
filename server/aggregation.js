export async function AggBestSellingCategories(collection){
    
    const coll = collection;
    const pipeline = [
        {
            $match: {
                $and: [
                    { "brand": { $in: ["Amazon", "Amazonbasics"] } },
                    { "reviews.rating": { $gt: 4 } }
                ]
            }
        },
        {
            $group: {
                _id: { brand: "$brand", primaryCategories: "$primaryCategories" },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                brand: "$_id.brand",
                primaryCategories: "$_id.primaryCategories",
                count: 1
            }
        },
        {
            $sort: { count: -1 }
        }
    ];
    
    const aggCursor = coll.aggregate(pipeline)

    for await (const doc of aggCursor){
        console.log(doc);
    }
}

export async function AggBestSellCategoriesByYear(collection) {
    const coll = collection;
    console.log("col",coll)
    const pipeline = [
        {
            $addFields: {
                parsedDate: {
                    $dateFromString: {
                        dateString: "$reviews.date"
                    }
                }
            }
        },
        {
            $addFields: {
                year: { $year: "$parsedDate" },
                date: { $dateToString: { format: "%Y-%m-%d", date: "$parsedDate" } }
            }
        },
        {
            $match: {
                "brand": { $in: ["Amazon", "Amazonbasics"] },
                "reviews.rating": { $gt: 4 }
            }
        },
        {
            $group: {
                _id: {
                    brand: "$brand",
                    year: "$year",
                    primaryCategories: "$primaryCategories"
                },
                avgRating: { $avg: "$reviews.rating" },
                count: { $sum: 1 }
            }
        },
      
        // {
        //     $project: {
        //         _id: 0,
        //         brand: "$_id.brand",
        //         primaryCategories: "$_id.primaryCategories",
        //         year: "$_id.year",
        //         count: 1
        //     }
        // },
        {
            $sort: { count: -1 }
        },
        {
            $group: {
              _id: { brand: "$_id.brand", year: "$_id.year" },
              topCategory: { $first: "$_id.primaryCategories" },
              count: { $first: "$count" },
            },
          },
          {
            $project: {
              _id: 0,
              brand: "$_id.brand",
              year: "$_id.year",
              
              topCategory: 1,
              count: 1,
            },
          },
          {
            $sort: { year: 1, count: -1 },
          },

    ];

    const aggCursor =  await coll.aggregate(pipeline).toArray();

    for await (const doc of aggCursor) {
        console.log(doc);
    }
    // )const c = await aggCursor.toArray(
    console.log("arr",  aggCursor)

    return aggCursor;
}
