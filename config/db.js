const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ortiz4419:ortiz4419@devconnector1-7nz7p.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
    
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...');

    }catch(err){
        console.log(err);
        //Exit process with failure
        //process.exit(1);
    }
}


module.exports = connectDB;