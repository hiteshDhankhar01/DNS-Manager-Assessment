const csvParser = require('csv-parser');
const fs = require('fs');
const Domain = require('../Models/Domain');
const { saveToDatabase } = require('../helpers/saveToDatabase');

const uploadFileData = (req, res) => {
    console.log("upload file is run")
    const { file } = req;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.path;
    const records = [];

    if (file.mimetype === 'application/json') {
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading file' });
            }
            try {
                const jsonData = JSON.parse(data);
                await saveToDatabase(jsonData);
                res.status(200).json({ message: 'Data uploaded successfully' });
            } catch (error) {
                return res.status(400).json({ error: 'Invalid JSON format' });
            }
        });
    } else if (file.mimetype === 'text/csv') {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                records.push(row);
            })
            .on('end', async () => {
                await saveToDatabase(records);
                res.status(200).json({ message: 'Data uploaded successfully' });
            });
    } else {
        return res.status(400).json({ error: 'Unsupported file format' });
    }
};

module.exports = { uploadFileData };



// const csvParser = require('csv-parser');
// const fs = require('fs');
// const Domain = require('../Models/Domain');


// // const uploadFileData = ('/upload', upload.single('file'), (req, res) => {
// const uploadFileData = (req, res) => {
//     const { file } = req;
//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = file.path;
//     const records = [];

//     if (file.mimetype === 'application/json') {
//         fs.readFile(filePath, 'utf8', async (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Error reading file' });
//             }
//             try {
//                 const jsonData = JSON.parse(data);
//                 // Process JSON data and save to database
//                 await saveToDatabase(jsonData);
//                 res.status(200).json({ message: 'Data uploaded successfully' });
//             } catch (error) {
//                 return res.status(400).json({ error: 'Invalid JSON format' });
//             }
//         });
//     } else if (file.mimetype === 'text/csv') {
//         fs.createReadStream(filePath)
//             .pipe(csvParser())
//             .on('data', (row) => {
//                 records.push(row);
//             })
//             .on('end', async () => {
//                 // Process CSV data and save to database
//                 await saveToDatabase(records);
//                 res.status(200).json({ message: 'Data uploaded successfully' });
//             });
//     } else {
//         return res.status(400).json({ error: 'Unsupported file format' });
//     }
// };

// // const saveToDatabase = async (data) => {
// //     try {
// //         // Logic to save data to MongoDB using Mongoose
// //         // Example: await Domain.create(data);

// //         // Assuming 'data' is an array of domain objects, you can loop through them and save each one
// //         for (const domain of data) {
// //             await Domain.create(domain);
// //         }

// //         console.log('Data saved to database successfully');
// //     } catch (error) {
// //         console.error('Error saving data to database:', error);
// //         throw error; // Throw the error to handle it elsewhere if needed
// //     }
// // };



// // Sure, here's how you can implement the saveToDatabase function:

// // javascript
// // Copy code
// // const Domain = require('../Models/Domain');

// const saveToDatabase = async (data) => {
//     try {
//         // Assuming 'data' is an array of domain objects, you can loop through them and save each one
//         for (const domain of data) {
//             await Domain.create(domain);
//         }

//         console.log('Data saved to database successfully');
//     } catch (error) {
//         console.error('Error saving data to database:', error);
//         throw error; // Throw the error to handle it elsewhere if needed
//     }
// };


// module.exports = { uploadFileData ,saveToDatabase}