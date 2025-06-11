import { MongoClient } from 'mongodb';

db.books.find({genre: "Fiction"}); //Finding all books in a specific genre
db.books.find({pubished_year : {$gt: 2005}}); //Fing all the books published after 2005
db.books.find({author: "George Orwell"}); //Finding all books by a specific author
db.books.updateOne(
    {titile: "1984"},
    {$set: {price: 16.00}} //Updating price of a book
);

db.books.deleteOne({title: "The hobbit"}); //eleting a book by its title

//Advanced queries
db.books.find({
    in_stock: true,
    published_year: {$gt: 2010},
});     //Finding all the books that are in stock and published after 2010

db.books.find({}, {_id: 0, title: 1, author: 1, price: 1}); //Projection: only title, author and price

db.books.find().sort({ price: 1}); //Sorting by price ascending

db.books.find().sort({ price: -1}); //Sorting by descending price

db.books.find().skip(0).limit(5); //Pagination page 1; first 5 pages

db.books.find().skip(5).limit(5); //Pagination page 2; next 5 pages

//Aggregation pipeline
db.books.aggregate([
    {
        $group: {
            _id: "$genre", 
            averagePrice: {$avg: "$price"}
        }
    }
]); //Avg price by genre

db.books.aggregate([
    {
        $group: {
            _id: "$author",
            count: {$sum:1}
        }
    },
    {$sort: {count: -1}},
    {$limit:1}
]); //Author with the most books

db.books.aggregate([
    {
        $group: {
            _id: {
                $concat:[
                    {$substr: ["$published_year", 0, 3]},
                    "0s"
                ]
            },
            count: {$sum: 1}
        }
    }
]);    //Count of books published in each decade

//Indexing
db.books.createIndex({title: 1}); //INdex on title

db.books.createIndex({author: 1, publishe_year: 1}); //Compound index on author and published year

db.boooks.find({title: "1984"}).explain("exectionStats"); //Explain to analyse performance 



