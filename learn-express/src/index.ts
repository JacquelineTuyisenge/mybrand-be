import {mongoConnect} from './services/mongo';
import app from './app';

const startServer = async(): Promise<void> => {
    try{
        await mongoConnect();

        const port = 5000;
        app.listen(port, () => {
            const message = `Server has started on port ${port}!`
            console.log(JSON.stringify(message));
    
        });
    } catch(err){
        console.log('Error starting server:',err);
    }
};

startServer();

// intrance of our application, 