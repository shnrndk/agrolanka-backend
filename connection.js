var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adm123@cluster0-mv4ft.mongodb.net/agrolanka?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("Succesfully Connected"))
    .catch((err)=>console.log(err))

module.exports = mongoose;