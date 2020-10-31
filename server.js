const express = require('express');//bring express

const app =express();//initialize app variable

app.get('/', (req, res) => res.send('API Runninpm ng'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));//listen port

