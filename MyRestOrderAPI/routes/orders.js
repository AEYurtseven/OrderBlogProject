const express = require('express')
const router = express.Router();
const Order = require('./../models/order')

//getting all subscribers
router.get('/', async (req,res)=>{
    //res.send("Hello World !!")
    try{
        const order = await Order.find()
        res.json(order)
    }catch(error){
        res.status(500).json({message: error.message, message})
    }
})

router.get('/:id',getOrder,(req,res)=>{
    //res.send(res.subscriber.name)
    res.json(res.order)
})

// Creating one
router.post('/', async (req, res) => {
    const order = new Order({
        orderTitle: req.body.orderTitle,
        orderDescription: req.body.orderDescription,
        orderMarkDown: req.body.orderMarkDown
    })
    try {
      const newOrder = await order.save()
      res.status(201).json(newOrder)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

//updating one subscriber
router.patch('/:id',getOrder,async (req,res)=>{
    if(req.body.orderTitle != null){
        res.order.orderTitle = req.body.orderTitle
    }
    if(req.body.orderDescription != null){
        res.order.orderDescription = req.body.orderDescription
    }
    if(req.body.orderMarkDown != null){
        res.order.orderMarkDown = req.body.orderMarkDown
    }

    try {
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    } catch (err) {
      res.statu(400).json({message: err.message})
    }

})

//deleting one subscriber
router.delete('/:id',getOrder, async (req,res)=>{
    try{
        await res.order.remove()
        res.json({message : 'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getOrder(req,res,next){
    let order
    try{
        order = await Order.findById(req.params.id)
        if(order == null){
            return res.status(404).json({message: 'Cannot find Order'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.order = order
    next()
}

module.exports = router