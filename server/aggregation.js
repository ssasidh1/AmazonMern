
// export async function test(collection,database){

//     let words=await database.collection("positiveWords").find().toArray();
//     let list=words.map((obj)=>obj.positiveWords );
//     // console.log(" ##### list\n",list);
//     const wordsToSearch = list // Replace with your array of words
//     const batchSize = 2; // Adjust the batch size as needed

//     // Split words into batches
//     const wordBatches = [];
//     for (let i = 0; i < wordsToSearch.length; i += batchSize) {
//       wordBatches.push(wordsToSearch.slice(i, i + batchSize));
//     }

//     // Execute the query for each batch
//     const results = [];
//     for (const wordBatch of wordBatches) {
//       const aggregationPipeline = [
//         {
//           $match: {
//             'reviews.text': {
//               $regex: new RegExp(wordBatch.join('|'), 'i'),
//             },
//           },
//         },
//         {
//           $addFields: {
//             matchedWords: {
//               $map: {
//                 input: wordBatch,
//                 as: 'word',
//                 in: {
//                   word: '$$word',
//                   score: {
//                     $cond: {
//                       if: {
//                         $gt: [
//                           {
//                             $size: {
//                               $regexFindAll: {
//                                 input: '$reviews.text',
//                                 regex: new RegExp('$$word', 'i'),
//                               },
//                             },
//                           },
//                           0,
//                         ],
//                       },
//                       then: 1,
//                       else: 0,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       ];

//       const result = await collection.aggregate(aggregationPipeline).toArray();
//     //   console.log(" paitho result ",result);
//       results.push(result);
//     }

//     // console.log('Search Results with Matched Words:', results);
//     return results;
// }




export async function bestSellerPerManufacturer(collection) {

    return await collection.aggregate([
        {
            $group: {
                _id: {
                    manufacturer: "$manufacturer",
                    product: "$name",

                },

                avgRating: { $avg: "$reviews.rating" },
                img: { $first: "$imageURLs" }

            },

        },
        {
            $sort: { "avgRating": -1 },
        }
        ,
        {
            $group: {
                _id: "$_id.manufacturer",
                bestSeller: { $first: "$_id.product" },
                bestSellerRating: { $first: "$avgRating" },
                img: { $first: "$img" }

            }
        },

        {
            $sort: { "_id": 1 },
        },
        {
            $project: {

                manufacturer: "$_id",
                bestSeller: 1,
                bestSellerRating: 1,
                _id: 0,
                img: 1

            }
        }
    ]).toArray();



}


export async function brandTrend(collection, brand) {

    const coll = collection;
    // console.log("brand is ",brand)
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
                "brand": brand,
                // "reviews.rating": { $gt: 4 }
            }
        },
        {
            $group: {
                _id: { brand: "$brand", year: "$year" },

                avgRating: { $avg: "$reviews.rating" },

            }
        },


        {
            $project: {
                _id: 0,
                brand: "$_id.brand",
                year: "$_id.year",
                Rating: { $round: ["$avgRating", 0] }
            }
        },
        {
            $sort: { year: 1 }
        }
    ];

    const aggCursor = await coll.aggregate(pipeline).toArray();

    for await (const doc of aggCursor) {
        // console.log(doc);
    }
    // )const c = await aggCursor.toArray(
    // console.log("arr", aggCursor)

    return aggCursor;
}


export async function AggBestSellCategoriesByYear(collection, brand) {
    const coll = collection;
    // console.log("col", coll)
    // console.log("brand is ",brand)
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
                "brand": brand,

            }
        },
        {
            $group: {
                _id: {
                    brand: "$brand",
                    year: "$year",
                    primaryCategories: "$primaryCategories"
                },
                // avgRating: { $avg: "$reviews.rating" },
                count: { $avg: "$reviews.rating" }
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
                Rating: "$count"
            },
        },
        {
            $sort: { year: 1 },
        },

    ];

    const aggCursor = await coll.aggregate(pipeline).toArray();

    for await (const doc of aggCursor) {
        // console.log(doc);
    }
    // )const c = await aggCursor.toArray(
    // console.log("arr", aggCursor)

    return aggCursor;
}

export async function topProductsPerYear(collection, database) {
    return await collection.aggregate([
        {


            $addFields: {
                year: { $year: { $dateFromString: { dateString: "$reviews.date" } } }
            }


        },
        {
            $group: {
                _id: {
                    year: "$year",
                    product: "$name"

                },
                reviews: { $first: "$reviews.title" },
                avgRating: { $avg: "$reviews.rating" },
                img: { $first: "$imageURLs" },


            },

        }, {
            $sort: { "avgRating": -1 }
        },
        {
            $group: {
                _id: "$_id.year",
                name: { $first: "$_id.product" },
                rating: { $first: "$avgRating" },
                img: { $first: "$img" },
                reviews: { $first: "$reviews" },



            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                year: "$_id",
                name: "$name",
                avgRating: "$rating",
                _id: 0,
                reviews: 1,

                img: 1
            }
        }
    ], { serializeFunctions: true }).toArray();
}

export async function topManufacturerPerYear(collection) {
    return await collection.aggregate([
        {
            $addFields: {
                year: { $year: { $dateFromString: { dateString: "$reviews.date" } } }
            },
        }, {
            $group: {
                _id: {
                    year: "$year",
                    manufacturer: "$manufacturer"
                },

                avgRating: { $avg: "$reviews.rating" },

            },

        }, {
            $sort: { "avgRating": -1 }
        },
        {
            $group: {
                _id: "$_id.year",
                manufacturer: { $first: "$_id.manufacturer" },
                rating: { $first: "$avgRating" },

            }
        },
        {
            $sort: { "_id": 1 }
        },
        {
            $project: {
                year: "$_id",
                manufacturer: "$manufacturer",
                avgRating: "$rating",
                _id: 0,

            }
        }
    ]).toArray();




}


export async function manufacturerYearlyRating(collection) {
    let ret = await collection.aggregate([
        {

            $addFields: {
                year: { $year: { $dateFromString: { dateString: "$reviews.date" } } },
                manufacturer: {
                    $function: {
                        body: function (manu) {
                            if (manu === "Amazon" || manu === "Amazon.com") return "Amazon.com";
                            else return manu
                        },
                        args: ["$manufacturer"],
                        lang: "js"
                    }
                }
            },
        }, {
            $group: {
                _id: {
                    year: "$year",
                    manufacturer: "$manufacturer"
                },

                avgRating: { $avg: "$reviews.rating" },

            },

        }, {
            $sort: { "_id.year": 1 },
        },
        // {
        //     $project: {
        //         year: "$_id.year",
        //         manufacturer: "$_id.manufacturer",
        //         avgRating: "$avgRating",
        //         _id: 0,

        //     }
        // }
        {

            $group: {
                _id: "$_id.year",
                details: {
                    $accumulator: {
                        init: function () {
                            return { sum: 0 }
                        }

                        ,
                        accumulate: function (state, manufacturer, avgRating, year) {

                            //return {sum:state.sum+1}
                            return { ...state, year: year, [`${manufacturer}Rating`]: avgRating }
                        },
                        merge: function (state1, state2) {
                            return { ...state1, ...state2 };
                        },
                        accumulateArgs: ["$_id.manufacturer", "$avgRating", "$_id.year"],
                        finalize: function (state) {
                            return state;
                        },
                        lang: "js"
                    }
                }
            }
        }
    ], { serializeFunctions: true }).toArray();
    // console.log(ret);

}



export async function getReviewTitle(collection) {
    // let ret = await collection.aggregate([{
    //     $project: {
    //         _id: 0,
    //         reviewTitle: "$reviews.title"
    //     }
    // }]).toArray();

    // // console.log("ret",ret)
    // return ret;


}

// export async function addColumnSentiment(collection){
//     let ret = await collection.
// }