const sampleListings = [
  {
    title: "Chic Parisian Apartment",
    description:
      "Enjoy your morning croissant on a balcony overlooking the Eiffel Tower. A perfectly styled apartment in the heart of Paris.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Paris",
    country: "France",
  },
  {
    title: "Traditional Riad in the Medina",
    description:
      "Immerse yourself in Moroccan culture in this stunning riad featuring a central courtyard and a rooftop terrace.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Glass Igloo Under the Northern Lights",
    description:
      "Fall asleep watching the Aurora Borealis from the comfort of a heated glass igloo in the snowy wilderness.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Luxury Houseboat in the Backwaters",
    description:
      "Float along tranquil backwaters on a fully crewed luxury houseboat. A peaceful escape like no other.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 600,
    location: "Kerala",
    country: "India",
  },
  {
    title: "Vineyard Estate in Napa",
    description:
      "Sip world-class wines on the porch of this grand estate surrounded by endless rolling vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Napa Valley",
    country: "United States",
  },
  {
    title: "Overwater Bungalow",
    description:
      "Dive straight into crystal clear lagoons from your private deck in this iconic overwater bungalow.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7500,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Eco-Yurt in Patagonia",
    description:
      "Experience off-the-grid living without sacrificing comfort. Incredible hiking trails are right outside your door.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 450,
    location: "Torres del Paine",
    country: "Chile",
  },
  {
    title: "Ancient Cave Hotel",
    description:
      "Stay in a beautifully restored historical cave dwelling. Watch hundreds of hot air balloons fill the morning sky.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Cappadocia",
    country: "Turkey",
  },
  {
    title: "Cliffside Villa on the Amalfi Coast",
    description:
      "Breathtaking ocean views and private terraces make this pastel cliffside villa a Mediterranean dream.",
    image: {
      filename: "listingimage",
      url: "https://tse1.mm.bing.net/th/id/OIP.wVV1nqMcDa-tgqUoBXzdXQHaFk?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    price: 3800,
    location: "Positano",
    country: "Italy",
  },
  {
    title: "Tranquil Ryokan",
    description:
      "Experience traditional Japanese hospitality. Sleep on tatami mats and soak in your private outdoor hot spring.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Jungle Treehouse in Tulum",
    description:
      "A modern, open-air treehouse hidden deep in the Mayan jungle. Disconnect from the world and reconnect with nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 850,
    location: "Tulum",
    country: "Mexico",
  },
  {
    title: "Luxury Glamping Dome in the Desert",
    description:
      "Stargaze from your bed in this luxury geodesic dome located in the stunning red sands of Wadi Rum.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Wadi Rum",
    country: "Jordan",
  },
  {
    title: "Alpine Chalet in Chamonix",
    description:
      "A stunning timber chalet with an open fireplace, outdoor hot tub, and direct views of Mont Blanc.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518733057094-95b5ee1404c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Chamonix",
    country: "France",
  },
  {
    title: "Historic Manor House",
    description:
      "Feel like landed gentry in this grand 18th-century stone manor set on 50 acres of private gardens.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Cornwall",
    country: "United Kingdom",
  },
  {
    title: "Bohemian Beach Shack",
    description:
      "A vibrant, colorful shack right on the sand. Perfect for surfers, yogis, and free spirits looking to unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 300,
    location: "Goa",
    country: "India",
  },
  {
    title: "Sky-High Penthouse",
    description:
      "Live above the clouds in this ultra-modern high-rise penthouse overlooking the spectacular city skyline and bay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Blue Ridge Mountain Cabin",
    description:
      "A rustic yet refined cabin with a wraparound porch. Perfect for watching the autumn leaves change colors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 650,
    location: "Asheville",
    country: "United States",
  },
  {
    title: "Sunlit Farmhouse in Provence",
    description:
      "Surrounded by lavender fields, this classic French farmhouse is a culinary and sensory delight.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Provence",
    country: "France",
  },
  {
    title: "Amazon Rainforest Eco-Lodge",
    description:
      "Fall asleep to the sounds of the jungle in this sustainable lodge. Guided river tours included.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Manaus",
    country: "Brazil",
  },
  {
    title: "Sahara Desert Camp",
    description:
      "Ride camels into the sunset and sleep in luxurious Berber tents nestled between towering sand dunes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542317834-627c24f61f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Merzouga",
    country: "Morocco",
  },
  {
    title: "A-Frame Cabin in the Woods",
    description:
      "A picture-perfect A-frame cabin hidden among giant pine trees. The ultimate cozy weekend retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 550,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Whitewashed Villa with Caldera View",
    description:
      "Iconic blue domes and stunning sunsets await you at this private villa perched high on the cliffs.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2900,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Ski Cabin in Whistler",
    description:
      "Just minutes from the gondola, this cozy timber cabin features a roaring fire and outdoor cedar hot tub.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520699049698-acd2fceb8cc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1750,
    location: "Whistler",
    country: "Canada",
  },
  {
    title: "Private Island Resort Lodge",
    description:
      "Absolute seclusion on pristine white sands. A private chef and butler are included in your stay.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Mahe",
    country: "Seychelles",
  },
  {
    title: "Lake Como Lakeside Retreat",
    description:
      "A grand stone house sitting right on the water's edge. Includes access to a private classic wooden speedboat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506125840744-167167210587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4100,
    location: "Lake Como",
    country: "Italy",
  },
  {
    title: "Geodesic Desert Dome",
    description:
      "An architectural marvel in the high desert. Enjoy quirky design, a cowboy tub, and spectacular starry nights.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 450,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Fairy-tale Castle in Bavaria",
    description:
      "Live your own fairy tale in this authentic 16th-century German castle, completely modernized for luxury living.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533647672202-b2ee93c1ebfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Bavaria",
    country: "Germany",
  },
  {
    title: "Luxury Bamboo Villa",
    description:
      "An architectural masterpiece crafted entirely from bamboo, featuring an indoor-outdoor living experience by the river.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Oceanfront Lighthouse",
    description:
      "A truly unique stay! Sleep in a renovated historic lighthouse and wake up to 360-degree ocean views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Cape Cod",
    country: "United States",
  }
];


module.exports = { data: sampleListings };