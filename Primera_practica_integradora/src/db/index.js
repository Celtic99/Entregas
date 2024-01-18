const mongoose = require('mongoose')

const mongoconnect = async () => {
    try{
        await mongoose.connect(
            'mongodb+srv://admin:T2ACOIo9PmhS5bZ4@ecommerce.igw8cqh.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log('db is connected')
    } catch(error) {
        console.log(error)
    }
}

module.exports = mongoConnect