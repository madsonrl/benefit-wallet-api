import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

createConnection();

export const options: cors.CorsOptions = {
    origin: "*",
};

const app = express();
const server = http.createServer(app);

app.use(cors(options));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal Server Error - ${err.message}`,
        });
    }
);


server.listen(9000, () => {
    console.log("listening on *:9000");
});
