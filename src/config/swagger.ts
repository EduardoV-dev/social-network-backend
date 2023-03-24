import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: { title: 'Social network REST API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:8000/v1/api' }],
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
