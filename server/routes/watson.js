const express = require('express');
const router = express.Router();
const conversation = require('../services/conversation');

var myMap = new Map();

router.post('/message', (req, res) => {
    var payload = {
        workspace_id: {},
        context: {},
        input: {}
    };

    if (req.body) {
        if (req.body.input) {
            payload.input = {
                'text': req.body.input
            };
        }
        if (req.body.id) {
            payload.context = myMap.get(req.body.id);
            payload.context.conversation_id = req.body.id;
        }
    }

    conversation.message(payload, response => {
        if (!req.body.id) {
            myMap.set(response.context.conversation_id, response.context);
        } else {
            myMap.set(req.body.id, response.context);
        }
        return res.json(response);
    });
});

module.exports = router;