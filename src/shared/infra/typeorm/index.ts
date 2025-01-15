import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (host = "benefit_wallet_database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
};
