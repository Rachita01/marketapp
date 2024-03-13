import mongoose from 'mongoose';

const mdataSchema = mongoose.Schema(
    {
        pcname:{
            type:String,
            required:true,
        },

        shopname:{
            type:String,
            required:false,
        },

        beatname:{
            type:String,
            required:false
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
            reuired:true
        }
    }
);

export const Mdata = mongoose.model('Mdata',mdataSchema)