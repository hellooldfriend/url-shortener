const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (request, response) => {
    try {
        const link = await Link.findOne({ code: request.params.code });

        if(link) {
            link.clicks++;
            await link.save();
            return response.redirect(link.from);
        }

        return response.status(404).json('Link was not found.')

    } catch(e) {
        response.status(500).json({ message: 'Something went wrong, try again.' })
    }
})

module.exports = router;