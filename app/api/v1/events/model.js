const mongoose = require("mongoose");

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Ticket type is required"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "Date is must be filled"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "Tagline is required"],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "Venue name is must be filled"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
