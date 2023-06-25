import app from "./app.js";
import 'dotenv/config.js'
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('App is running')
})