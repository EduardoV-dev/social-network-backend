import path from 'path';
import fs from 'fs';

import Express from 'express';

const router = Express.Router();

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
 * Gets all of the routes name for a feature, route folder has to be created inside of the feature, otherwise, node app will crash.
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
 * @returns Routes name array
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

const getRoutesFromFeatures = () => {
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

            console.log(routePath);

            import(routePath).then((module) => {
                router.use(`/${routeWithoutExtension}`, module.router);
            });
        });
    });
};

getRoutesFromFeatures();

export { router };
