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

app.post('/teachers/:id/evaluate', async (req, res) => {
    const teacherId = req.params.id;
    const { evaluationScore } = req.body;

    if (typeof evaluationScore !== 'number' || evaluationScore < 1 || evaluationScore > 5) {
        return res.status(400).json({
            success: false,
            message: 'Evaluation score must be a number between 1 and 5'
        });
    }
    try {
        const teacherRef = db.collection('teachers').doc(teacherId);
        const teacherDoc = await teacherRef.get();

        if (!teacherDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }
        const { parentEvaluations = [] } = teacherDoc.data();
        parentEvaluations.push(evaluationScore);
        const performanceScore = parentEvaluations.reduce((sum, score) => sum + score, 0) / parentEvaluations.length;
        await teacherRef.update({
            parentEvaluations,
            performanceScore
        });

        res.status(200).json({
            success: true,
            message: 'Evaluation added successfully',
            updatedPerformanceScore: performanceScore
        });
    } catch (error) {
        console.error("Error adding evaluation:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to add evaluation'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
