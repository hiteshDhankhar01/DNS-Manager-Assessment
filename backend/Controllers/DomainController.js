// controllers/domainController.js
const Domain = require('../Models/Domain');

// Create a new domain
const createDomain = async (req, res) => {
    try {
        const { name, records } = req.body;
        const domain = new Domain({ name, records });
        await domain.save();
        res.status(201).json(domain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all domains
const getAllDomains = async (req, res) => {
    try {
        const domains = await Domain.find();
        res.json(domains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get domain by ID
const getDomainById = async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) {
            return res.status(404).json({ msg: 'Domain not found' });
        }
        res.json(domain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update domain by ID
const updateDomain = async (req, res) => {
    try {
        const { name, records } = req.body;
        const domain = await Domain.findByIdAndUpdate(req.params.id, { name, records, updatedAt: Date.now() }, { new: true });
        if (!domain) {
            return res.status(404).json({ msg: 'Domain not found' });
        }
        res.json(domain);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete domain by ID
const deleteDomain = async (req, res) => {
    try {
        const domain = await Domain.findOneAndDelete({ _id: req.params.id });
        if (!domain) {
            return res.status(404).json({ msg: 'Domain not found' });
        }
        res.json({ msg: 'Domain deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const findDomains = async (req, res) => {
    try {
        const { key, page, limit } = req.query
        // const skip = (page - 1) * limit
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const search = key ? {
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { categories: { $regex: key, $options: 'i' } },
            ]
        } : {}

        //const result = await Product.find(search);
        const result = await Domain.find(search)
            .skip(skip)
            .limit(parseInt(limit));
        // if (result.length === 0) {
        //     return res.status(404).json({ message: "No products found",result });
        // }

        res.status(200).json({ message: "Here are the products", result });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//(http://127.0.0.1:7000/api/v2/product/findProducts?key=fr&page=1&limit=2)


module.exports = { createDomain, getAllDomains, getDomainById, updateDomain, deleteDomain, findDomains }
