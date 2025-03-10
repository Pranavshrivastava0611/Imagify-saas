import { Document, model, models, Schema } from "mongoose";

export interface Image extends Document{
    title: string;
    transformationTypes: string;  
    publicId: string;
    secureUrl: string; // Use string for URL
    width?: number; // Optional
    height?: number; // Optional
    config?: object; // Optional, generic object
    transformationUrl?: string; // Use string for URL
    aspectRatio?: string; // Optional
    color?: string; // Optional
    prompt?: string; // Optional
    Author: {
        _id : string,
        firstName : string,
        lastname : string,
    }// Reference to User 
    createdAt: Date;
    updatedAt: Date;
}
const Imageschema = new Schema({
    title : {type : String ,required : true,  },
    transformationTypes : {type : String , required : true},
    publicId : {type : String , required : true},
    secureUrl : {type :URL , required : true},
    width : {type : Number},
    height : {type : Number},
    config : {type : Object},
    transformationUrl : {type : URL},
    aspectRatio : {type : String},
    color : {type : String},
    prompt  : {type : String},
    Author : {type : Schema.Types.ObjectId , ref : 'User'},
    createdAt : {type : Date , default : Date.now},
    updatedAt : {type : Date , default : Date.now},

});


//schema turned into models;
const Image = models?.Image || model('Image', Imageschema)
 
export default Image; 