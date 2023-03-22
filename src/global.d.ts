declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: number;
        MONGODB_USERNAME: string;
        MONGODB_PASSWORD: string;
        DB_NAME: string;
        JWT_SECRET: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
        CLOUDINARY_CLOUD_NAME: string;
    }
}

declare namespace Global {
    interface CRUD {
        create: (resource: any) => Promise<any>;
        deleteById: (_id: string) => Promise<any>;
        findAll: (limit: number, skip: number) => Promise<any>;
        findById: (_id: number) => Promise<any>;
        updateById: (_id: string, resource: any) => Promise<any>;
    }

    interface BaseEntity {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    }
}
