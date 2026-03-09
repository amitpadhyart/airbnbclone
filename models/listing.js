const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: {
            type: String,
            default: "https://tse4.mm.bing.net/th/id/OIP.VJzfWqJC0NM2QYjHs2ND_QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            set: (v) =>
                v === "" || v == null
                    ? "https://tse4.mm.bing.net/th/id/OIP.VJzfWqJC0NM2QYjHs2ND_QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                    : v,
        }
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


listingSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
 
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;