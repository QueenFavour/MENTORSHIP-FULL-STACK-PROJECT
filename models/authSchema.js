import mongoose from "mongoose";

const authSchema =new mongoose.Schema({
    name:{type:String, require:true },
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true, unique:true},
    role:{type:String, require:true,
        enum:["admin", "mentor","mentor"],
    },
    
}  , {timestamps:true},
    {minimize:false}

)

const AuthModel = mongoose.model.users|| mongoose.model("users", authSchema);
export default AuthModel;