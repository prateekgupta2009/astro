let mongoose = require('mongoose');
let Book = require('../models/Book');

let BookService = {
  getBookList: () => {
    return new Promise((resolve, reject) => {
      Book.find((err, books) => {
        if (err) {
          reject(err);
        };
        resolve(books);
      });
    })
  }
}

module.exports = BookService;