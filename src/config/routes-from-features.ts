import fs, { readdirSync } from 'fs';
import path from 'path';

import express from 'express';

const apiRouter = express.Router();
const pathToApiFolder = path.join(__dirname, '..', 'api');

/**
 * Retrieves all of the features name that are within `features` folder.
 *
 * @returns a list of the features name inside features folder.
 */
const getAPIsName = (): string[] => fs.readdirSync(pathToApiFolder);

const getAPIRouterFile = (apiName: string): string | undefined => {
    const filesInAPI = readdirSync(path.join(pathToApiFolder, apiName));
    const apiRoute: string | undefined = filesInAPI.find((file) => file.includes('.routes'));
    return apiRoute;
};

/**
 * Removes extension from a route name, will keep the first path of a string that is preceded by a `.`
 * @example
 * input: index.routes.ts
 * output: index
 *
 * @param routeName
 * @returns Route name without extension
 */
const removeExtensionFromFile = (routeName: string) => routeName.split('.').shift();

/**
 * Loads all of the routes that are within any API inside the `api` folder, routes are loaded inside an express `router` with their respective routes (POST, GET, PUT, PATH, DELETE or any that you would be using insde a router).
 * This function avoids to be adding new routes manually, instead, this is done in a programmatic way.
 *
 * For this to work, a certain file structure must be followed:
 *
 * ```
 * - src/
 * -- api/
 * --- [api-name]/
 * ---- [(filename).routes.ts]/ Where filename is any filename you want to set for that route
 * ```
 *
 * The generated REST API route would be in this format: `/[api-name]`,
 * which would contain any of the actions described in that route
 *
 * @example
 * posts ([(filename).routes.ts]) has:
 * ```
 *  router
 *     .get('/', controller)
 *     .post('/new-entry', postController)
 * ```
 *
 * A route within: `src/api/posts/post.routes.ts`, would result in the next endpoints:
 * ```
 *  * /posts [GET]
 *  * /posts/new-entry [POST]
 * ```
 */
const loadRoutesFromAPI = () => {
    const APIsName: string[] = getAPIsName();

    APIsName.forEach((apiName) => {
        const apiRouteFilename: string | undefined = getAPIRouterFile(apiName);
        if (!apiRouteFilename) return;

        const apiRouteName: string | undefined = removeExtensionFromFile(apiRouteFilename);
        if (!apiRouteName) return;

        const pathToApiRoutes = path.join(pathToApiFolder, apiName, apiRouteFilename);
        import(pathToApiRoutes).then((module) => apiRouter.use(`/${apiName}`, module.router));
    });
};

loadRoutesFromAPI();

export { apiRouter as v1Router };
