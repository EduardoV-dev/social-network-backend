import path from 'path';
import fs from 'fs';

import Express from 'express';

const featuresRouter = Express.Router();

/**
 * Retrieves all of the features name that are within `features` folder.
 *
 * @returns a list of the features name inside features folder.
 */
const getFeaturesName = (): string[] => fs.readdirSync(path.join(__dirname, 'features'));

interface RoutesFromFeature {
    feature: string;
    routes: string[];
}

/**
 * Gets all of the routes name from a feature, route folder has to be created inside of the feature, otherwise, node app will crash.
 *
 * @param featureName name of the feature to retrieve its routes.
 * @returns All of the routes name for a single feature.
 */
const getRoutesNameFromFeature = (featureName: string): RoutesFromFeature => {
    const routesFromFeature: string[] = fs.readdirSync(
        path.join(__dirname, 'features', featureName, 'routes'),
    );

    return {
        feature: featureName,
        routes: routesFromFeature,
    };
};

/**
 * Gathers all of the existing routes name inside the features folder into a single array.
 *
 * @param featuresName Name of all the features inside features folder
 * @returns Routes array
 */
const getRoutesNameForAllFeatures = (featuresName: string[]): RoutesFromFeature[] =>
    featuresName.reduce<RoutesFromFeature[]>(
        (routesFromFeatures, featureName) => [
            ...routesFromFeatures,
            getRoutesNameFromFeature(featureName),
        ],
        [],
    );

/**
 * Removes `.ts` extension from a route name
 *
 * @param routeName
 * @returns Route name without extensiono
 */
const removeTSExtensionFromRouteName = (routeName: string) => routeName.replace('.ts', '');

/**
 * Loads all of the routes that are within any feature inside the feature folder, routes are loaded inside a express `router` with their respective routes (POST, GET, PUT, PATH, DELETE or any that you would be using insde a router).
 *
 * This function avoids to be adding new routes manually, instead, this is done in a programmatic way.
 *
 * For this to work, a certain file structure must be followed:
 *
 * ```
 * - src/
 * -- features/
 * --- [feature-name]/
 * ---- routes/
 * ----- [route-name]
 * ```
 *
 * The generated REST API route would be in this format: `/[route-name]`,
 * which would contain any of the actions described in that route
 *
 * @example
 * posts ([route-name]) has:
 * ```
 *  router
 *     .get('/', controller)
 *     .post('/new-entry', postController)
 * ```
 *
 * A route within: `src/features/posts/routes/feed`, would result in the next endpoints:
 * ```
 *  * /feed [GET]
 *  * /feed/new-entry [POST]
 * ```
 */

const loadRoutesFromFeatures = () => {
    const featuresName: string[] = getFeaturesName();
    const featuresAndRoutes: RoutesFromFeature[] = getRoutesNameForAllFeatures(featuresName);

    featuresAndRoutes.forEach((featureAndRoutes) => {
        featureAndRoutes.routes.forEach((route) => {
            const routeWithoutExtension: string = removeTSExtensionFromRouteName(route);

            const routePath: string = path.join(
                __dirname,
                'features',
                featureAndRoutes.feature,
                'routes',
                routeWithoutExtension,
            );

            import(routePath).then((module) => {
                featuresRouter.use(`/${routeWithoutExtension}`, module.router);
            });
        });
    });
};

loadRoutesFromFeatures();

export { featuresRouter };
