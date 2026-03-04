const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;