const express = require('express')
const router = express.Router()
const authMiddlware = require('../middlewares/auth')

const User = require('../models/User')
const News = require('../models/News')

router.use(authMiddlware)


// List 
router.get('/', async(req, res) => {
   try{
      const {page = 1} = req.query
      const news = await News.paginate({}, {page, limit: 10, populate: 'autor'})
      return res.send(news)
   }catch(err){
      return res.status(400).send({error: "Error loading your news"})
   }
})


// Read
router.get('/:id', async(req, res) => {
   try{
      const news = await News.findById(req.params.id).populate('author')
      return res.send(news)
   }catch(err){
      return res.status(400).send({error: "Error reading your news"})
   }
})


// Create
router.post('/create', async(req, res) => {
   try{
      const news = await News.create({...req.body, author: req.userId})
      return res.send(news)
   }catch(err){
      return res.status(400).send({error: "Error creating your news"})
   }
})


// Update
router.put('/update/:id', async(req, res) => {
   try{
      const news = await News.findByIdAndUpdate(req.params.id, {...req.body, author: req.userId})
      return res.send(news)
   }catch(err){
      return res.status(400).send({error: "Error updating your news"})
   }
})


// Delete
router.delete('/remove/:id', async(req, res) => {
   try{
      const news = await News.findByIdAndRemove(req.params.id)
      return res.send(news)
   }catch(err){
      return res.status(400).send({error: "Error removing your news"})
   }
})


module.exports = app => app.use("/manage_news", router)