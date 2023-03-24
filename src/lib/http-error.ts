export class HttpError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * @openapi
 * components:
 *   schemas:
 *     HttpError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Some error message here..."
 */
