import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import { BASE_URL, NODE_ENV, PORT } from '../constants/env-variables';

const API_PORT: string = NODE_ENV === 'development' ? `:${PORT || 3120}` : '';
const API_BASE_URL = `${BASE_URL + API_PORT}/v1/api`;

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: { title: 'Social network REST API', version: '1.0.0' },
    servers: [{ url: API_BASE_URL }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/**/*.ts'],
};

export const swaggerV1Setup = swaggerJSDoc(swaggerOptions);
