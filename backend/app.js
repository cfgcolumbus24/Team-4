const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/teachers/rank', async (req, res) => {
    try {
        const teachersSnapshot = await db.collection('teachers')
            .orderBy('performanceScore', 'desc')
            .get();
        const teachers = teachersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({
            success: true,
            rankedTeachers: teachers
        });
    } catch (error) {
        console.error("Error ranking teachers:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to rank teachers'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
