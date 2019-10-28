const express = require('express');
const router = express.Router();

global.db = require('../db')

// POST / Inserir Mensagem
router.post('/messages', (req, res, next) => {
    mensage = req.body
    global.db.insertMessages(mensage, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({
            message: 'Dialog cadastrado com sucesso!'
        })
    });
});
// GET / Buscar Mensagem
router.get('/messages/id', (req, res, next) => {
    const idmessages = req.body.conversationId
    if (idmessages) {
        global.db.findMessagesId(idmessages, (err, result) => {
            if (err) res.status(500).json(err)
            else res.json(result);
        })
    } else {
        res.json({
            message: 'O campo conversationId é obrigatorios'
        })
    }
});
// POST / Inserir Bot
router.post('/bots', (req, res, next) => {
    const bot = req.body
    global.db.insertBot(bot, (err, result) => {
        if (err) res.status(500).json(err)
        else res.json({
            message: 'Produto cadastrado com sucesso!'
        })
    })
});
// GET / Buscar Bot
router.get('/bots/id', (req, res, next) => {
    const idBot = req.body.id
    if (idBot) {
        global.db.findBotId(idBot, (err, result) => {
            if (err) res.status(500).json(err)
            else res.json(result);
        })
    } else {
        res.json({
            message: 'O campo id é obrigatorios'
        })
    }
});
// POST / Atualizar Bot
router.post('/bots/id', (req, res, next) => {
    var myquery = { "name": req.body.name };
    var newvalues = { $set: { name: req.body.novo } };
    if (req.body.name) {
        global.db.updateBotId(myquery, newvalues, (err, result) => {
            if (err) res.status(500).json(err)
            else res.json({
                "mensagem": "Atualizou com Sucesso"
            });
        })
    } else {
        res.json({
            message: 'O campo name é obrigatorios'
        })
    }
});
// POST / Deletar Bot
router.post('/bots/remove', (req, res, next) => {
    var newvalues = { name: req.body.name };
    if (req.body.name) {
        global.db.removeBotId(newvalues, (err, result) => {
            if (err) res.status(500).json(err)
            else res.json({
                "mensagem": "Deletado com Sucesso"
            });
        })
    } else {
        res.json({
            message: 'O campo id é obrigatorios'
        })
    }
});
module.exports = router;