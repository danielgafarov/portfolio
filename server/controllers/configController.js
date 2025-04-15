const fs = require('fs');
const path = require('path');
const {readJSON} = require('../utils/readJSON');

const getIconMap = (req, res) => {
    try {
        const data = readJSON('/static/iconMap.json');
        res.send(data);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getIconMap}