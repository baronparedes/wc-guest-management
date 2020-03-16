import { MongoClient, MongoClientOptions } from 'mongodb';

export class MongoDB {
    public static client: MongoClient;
    public static connect(uri: string, options: MongoClientOptions) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, options, (err, client) => {
                if (err) {
                    reject(err);
                } else {
                    MongoDB.client = client;
                    resolve(client);
                }
            });
        });
    }
}
