import {mongoConnect} from './services/mongo';
import app from './app';

const startServer = async(): Promise<void> => {

    await mongoConnect();

    const port = 5000;
    app.listen(port, () => {
        console.log(`Server has started on port ${port}!`)
    })
}
startServer();

// intrance of our application, 