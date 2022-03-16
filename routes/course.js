const express =require ('express')
const course = require('../models/course')
const router = express.Router()
const Course =require('../models/course')
//get all
router.get('/',async(req,res)=>
{

    try{
        const course=await Course.find()
        res.json(course)
    }
        catch(err){
            res.status(500).json({message:err.message})
        }
})

//get one
router.get('/:id',getCourse,(req,res)=>
{
    res.json(res.course)
})

//post
router.post('/',async(req,res)=>
{const course= new Course({
    name:req.body.name,
    photo:req.body.photo,
    price:req.body.price,
    rating:req.body.rating,  
    category:req.body.category  
})
try{
    const newCourse = await course.save()
    res.status(201).json(newCourse)
} catch(err)
{
    res.status(400).json({message:err.message})
}
    
})

//update
router.patch('/:id',getCourse,async(req,res)=>
{ if (req.body.name!=null){
    res.course.name=req.body.name
}
 if (req.body.photo!=null){
    res.course.photo=req.body.photo
}
 if (req.body.price!=null){
    res.course.price=req.body.price
}
 if (req.body.rating!=null){
    res.course.rating=req.body.rating
}

try{
    const updateCourse = await res.course.save()
    res.json(updateCourse)
}
 catch(err)
 {res.status(400).json({message:err.message})
}  
})

//delete
router.delete('/:id',getCourse,async(req,res)=>
{
    try{
        await res.course.remove()
        res.json ({message:'Deleted course'})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

    
})

async function getCourse(req,res,next)
{let course
    try{
        course=await Course.findById(req.params.id)
        if(course==null){
            return res.status(404).json({message:'course not found'})}
    } 
    catch (err)
    {return res.status(500).json({message:err.message})
    
    }
    res.course=course
   next() 
}


module.exports =router