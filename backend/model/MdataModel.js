import mongoose from 'mongoose';

const mdataSchema = mongoose.Schema(
    {
        pcname:{
            type:String,
            required:true,
        },

        shopname:{
            type:String,
            required:true,
        },

        beatname:{
            type:String,
            required:true
        },
        latitude:{
            type:String,
            required:true
        },
        longitude:{
            type:String,
            required:true
        },
        date:{
            type:String,
            reuired:false
        }
    }
);

export const Mdata = mongoose.model('Mdata',mdataSchema)