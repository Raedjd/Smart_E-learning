const TopicModel = require('../models/Topic')
const express= require('express')


module.exports.addTopic =  (req,res)=>{
    const topic = new TopicModel( {
         
        title:req.body.title,   
        subtitle:req.body.subtitle,
        subcategory:req.body.subcategory,
        author:req.body.author
        
        
    });
    console.log(req.body);
    topic.save().
    then(data => res.json(data))
    .catch (err => {res.json({message:err})});
};