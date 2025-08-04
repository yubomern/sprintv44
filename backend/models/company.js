const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{

        email: {
            type:String ,
            require :  false 
        },
        name: {
            type: String ,
            require : true 
    
        
        
        }
        ,

        phoneNo: {
            type:String ,
            require :  false 
        },
        motive: {
            type: String ,
            require : false 
    
        



    },

    details: {
        type:String ,
        require :  false 
    },
    location: {
        type: String ,
        require : false 

    },



    patente: {
        type: String ,
        require : false 

    },

}

);



module.exports = mongoose.model("Company", companySchema);