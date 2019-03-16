const mongoose = require('../../database')
const mongoosePaginate = require("mongoose-paginate")

const NewsSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true
   },

   title: {
      type: String,
      required: true,
   },

   lead: {
      type: String,
      required: true,
   },

   body: {
      type: String,
      required: true,
   },

   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   location: {
      type: String,
      required: true
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