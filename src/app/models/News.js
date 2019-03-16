const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate")

const NewsSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true
   },

   title: {
      type: String,
      required: true,
      min: [6, 'Too short title'],
      max: [90, 'Too long title']
   },

   lead: {
      type: String,
      required: true,
      min: [6, 'Too short lead'],
      max: [450, 'Too long lead']
   },

   body: {
      type: String,
      required: true,
      min: [10, 'Too short body']
   },

   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   location: {
      type: String,
      required: [true, 'Please, enter the location where the event occurred']
   },

   date: {
      type: Date,
      required: true,
      default: Date.now()
   },
})

NewsSchema.plugin(mongoosePaginate)

const News = mongoose.model("News", NewsSchema)


module.exports = News