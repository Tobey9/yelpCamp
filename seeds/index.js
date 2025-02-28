const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("MongoDB Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "67b60c68b6e72127a27597cb",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aut excepturi suscipit commodi sequi quasi officiis quae, nisi unde. Cupiditate laborum praesentium sequi nulla expedita necessitatibus possimus aperiam, porro inventore",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dszoli44o/image/upload/v1740412451/yelpCamp_9/gbfjfalemguajpaixboh.jpg",
          filename: "yelpCamp_9/gbfjfalemguajpaixboh",
        },
        {
          url: "https://res.cloudinary.com/dszoli44o/image/upload/v1740410861/yelpCamp_9/fnphntb6dfytadc7ym1a.jpg",
          filename: "yelpCamp_9/fnphntb6dfytadc7ym1a",
        },
      ],
    });
    await camp.save();
  }
};

main()
  .then(() => {
    return seedDB();
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
