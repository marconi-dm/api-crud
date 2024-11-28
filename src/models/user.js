import mongoose, {mongo} from "mongoose";
const {Schema} = mongoose;


const userSchema = new Schema({
    nome:{type: String, required: true, minlength: 3},
    email:{type: String, required: true, unique: true, trim: true},
    senha:{type: String, required: true, minlength: 6}
    
},{ timestamps: true});


const Users = mongoose.model('usuarios', userSchema);

export default Users;