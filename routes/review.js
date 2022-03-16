const express =require ('express')
const review = require('../models/review')
const router = express.Router()
const Review =require('../models/review')
//get all
router.get('/',async(req,res)=>
{

    try{
        const review=await Review.find()
        res.json(review)
    }
        catch(err){
            res.status(500).json({message:err.message})
        }
})

//get one
router.get('/:id',getReview,(req,res)=>
{
    res.json(res.review)
})

//post
router.post('/',async(req,res)=>
{const review= new Review({
    content:req.body.content})
try{
    const newReview = await review.save()
    res.status(201).json(newReview)
} catch(err)
{
    res.status(400).json({message:err.message})
}
    
})

//update
router.patch('/:id',getReview,async(req,res)=>
{ if (req.body.content!=null){
    res.review.content=req.body.content
}

try{
    const updateReview = await res.review.save()
    res.json(updateReview)
}
 catch(err)
 {res.status(400).json({message:err.message})
}  
})

//delete
router.delete('/:id',getReview,async(req,res)=>
{
    try{
        await res.review.remove()
        res.json ({message:'Deleted review'})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

    
})

async function getReview(req,res,next)
{let review
    try{
        review=await Review.findById(req.params.id)
        if(review==null){
            return res.status(404).json({message:'review not found'})}
    } 
    catch (err)
    {return res.status(500).json({message:err.message})
    
    }
    res.review=review
   next() 
}


module.exports =router