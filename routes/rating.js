const express =require ('express')
const rating = require('../models/rating')
const router = express.Router()
const Rating =require('../models/rating')
//get all
router.get('/',async(req,res)=>
{

    try{
        const ratings=await Rating.find()
        res.json(ratings)
    }
        catch(err){
            res.status(500).json({message:err.message})
        }
})

//get one
router.get('/:id',getRating,(req,res)=>
{
    res.json(res.rating)
})

//post
router.post('/',async(req,res)=>
{const rating= new Rating({
    rate:req.body.rate})
try{
    const newRate = await rating.save()
    res.status(201).json(newRate)
} catch(err)
{
    res.status(400).json({message:err.message})
}
    
})

//update
router.patch('/:id',getRating,async(req,res)=>
{ if (req.body.rate!=null){
    res.rating.rate=req.body.rate
}

try{
    const updaterating = await res.rating.save()
    res.json(updaterating)
}
 catch(err)
 {res.status(400).json({message:err.message})
}  
})

//delete
router.delete('/:id',getRating,async(req,res)=>
{
    try{
        await res.rating.remove()
        res.json ({message:'Deleted rate'})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

    
})

async function getRating(req,res,next)
{let rating
    try{
        rating=await Rating.findById(req.params.id)
        if(rating==null){
            return res.status(404).json({message:'rating not found'})}
    } 
    catch (err)
    {return res.status(500).json({message:err.message})
    
    }
    res.rating=rating
   next() 
}


module.exports =router