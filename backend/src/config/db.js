const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Drop stale indexes left from previous model versions
        try {
            const db = conn.connection.db;
            const suppliersCollection = db.collection('suppliers');
            const indexes = await suppliersCollection.indexes();
            const staleIndexes = ['email_1', 'phone_1', 'contactPerson_1'];
            for (const idx of indexes) {
                if (staleIndexes.includes(idx.name)) {
                    await suppliersCollection.dropIndex(idx.name);
                    console.log(`Dropped stale index: ${idx.name}`);
                }
            }
        } catch (indexErr) {
            console.log('Index cleanup note:', indexErr.message);
        }
    } catch (error) {
        console.error("Database connection failed:", error.message);
        console.error("Check your MONGO_URI in .env and internet connection.");
        // Don't exit — let the server keep running so the frontend doesn't get "Failed to fetch"
        // Mongoose will auto-reconnect when the DB becomes available
    }
};

module.exports = connectDB;