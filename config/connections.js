const {connect, connection, connections} = require('mongoose');

connect('mongodb://localhost/socialAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = connections;