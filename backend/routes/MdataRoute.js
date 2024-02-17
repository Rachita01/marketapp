import express from 'express';
import { Mdata }  from '../model/MdataModel.js';
const router = express.Router();
//Add a Market data
router.post("/",async(request,response) => {
    try{
        const newMdata = {
            pcname:request.body.name,
            shopname:request.body.shopname,
            beatname:request.body.beatname,
            latitude:request.body.latitude,
            longitude:request.body.longitude
        }

        const mdata = await Mdata.create(newMdata);

        return response.status(201).send(mdata)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


//Get market data
router.get('/',async(request,response) => {
    try{
        const mdatas = await Mdata.find({});

        return response.status(200).json({
            count:mdatas.length,
            data:mdatas
        });
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
})

export default router;