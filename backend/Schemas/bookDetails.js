import mongoose from 'mongoose';

const bookDetailSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    reviewText: [{
        review: {
          type: String,
          required: true
        },
        userId: {
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: true,
          min: 1,
          max: 5
      }
      }]
});


const BookDetail = mongoose.model('BookDetail', bookDetailSchema);

export default BookDetail;
