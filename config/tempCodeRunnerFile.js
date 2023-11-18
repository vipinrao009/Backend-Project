const MONGO_URL = process.env.MONGO_URL;

const connectToDB = ()=>{
    mongoose
            .connect(MONGO_URL)
            .then((conn)=()=> console.log(`DB is connected:${conn.connection.host}`))
            .catch((err)=()=> console.log(err.message))
}