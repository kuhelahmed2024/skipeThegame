import mongoose from 'mongoose';

export async function Connect() {
    try {
        mongoose.connect(process.env.DB_URI!);
        const connection = mongoose.connection;

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }


}
