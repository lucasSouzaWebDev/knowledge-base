const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'

        // special characters to apply red background on error message.
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })