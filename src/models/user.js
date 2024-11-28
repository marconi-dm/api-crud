import mongoose, {mongo} from "mongoose";
const {Schema} = mongoose;


const userSchema = new Schema({
    nome:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    senha:{type: String, required: true}
},    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});


const Users = mongoose.model('usuarios', userSchema);

export default Users;