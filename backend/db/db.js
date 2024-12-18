const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connection Established");
})
.catch((e)=>{
    console.log("Error in DB Connection: ",e);
})

