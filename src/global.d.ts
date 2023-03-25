declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
        CLOUDINARY_CLOUD_NAME: string;
        DB_NAME: string;
        JWT_SECRET: string;
        MONGODB_PASSWORD: string;
        MONGODB_USERNAME: string;
        NODE_ENV: 'development' | 'production';
        PORT: number;
    }
}

declare namespace Global {
    interface CRUD {
        create: (resource: any) => Promise<any>;
        deleteById: (_id: string) => Promise<any>;
        findAll: (limit: number, skip: number) => Promise<any>;
        findById: (_id: string) => Promise<any>;
        updateById: (_id: string, resource: any) => Promise<any>;
    }

    interface BaseEntity {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    }
}
