const router = require('express').Router();
const book = require('./books_dumb')

let bookDirectory = book;
router.get('/books', function(req, res){
    res.send(bookDirectory)
})

router.get('/books/500Plus', function(res, res){
    const book = bookDirectory.filter(function(ele) {
        return ele.pageCount > 1000
    })
    .reduce(function(cur,ele){
        return cur + ele.pageCount
    },0); 
    if(!book) return res.status(404).send('Book does not available bhai');
    res.send(book.toString());
})

router.get('/books/:id', function(req, res){
    const { id } = req.params;
    const book = bookDirectory.find(b => b.isbn === id)
    if(!book) return res.status(404).send('Book does not availble.');
    res.send(book)
})

router.post('/books', function(req, res){
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = bookDirectory.find(b=> b.isbn === isbn);
    if(bookExist) return res.send("Book already exist.");

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    bookDirectory.push(book);
    res.send(book)
})

router.patch('/books/:id', function(req, res){
    const { id } = req.params;
    const book = bookDirectory.find(b=>b.isbn === id);
    if(!book) return res.status(404).send('Book does not availble.');

    book.title = req.body.title;
    res.send(book)
})

router.delete('/books/:id', function(req, res){
    const { id } = req.params;

    let book = bookDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    bookDirectory = bookDirectory.filter(b => b.isbn !== id);

    res.send('Success');
})
module.exports = router;