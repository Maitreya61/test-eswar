const axios = require('axios');

exports.getData = async (req, res) => {
    try {
        const { category, limit } = req.query;
        const response = await axios.get('https://api.publicapis.org/entries', {
            params: {
                category,
                limit
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
