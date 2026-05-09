import conf from "../conf/conf.js";
import { Client, TablesDB, ID, Storage, Query } from "appwrite";

export class DatabaseService {

    client = new Client();
    tablesdb;
    bucket;

    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesdb = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId
    }) {

        try {

            return await this.tablesdb.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );

        } catch (error) {

            console.log(
                "Appwrite service :: createPost :: error",
                error
            );

            return false;
        }
    }

    // Update Post
    async updatePost(
        slug,
        {
            title,
            content,
            featuredImage,
            status
        }
    ) {

        try {

            return await this.tablesdb.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );

        } catch (error) {

            console.log(
                "Appwrite service :: updatePost :: error",
                error
            );

            return false;
        }
    }

    // Delete Post
    async deletePost(slug) {

        try {

            await this.tablesdb.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

            return true;

        } catch (error) {

            console.log(
                "Appwrite service :: deletePost :: error",
                error
            );

            return false;
        }
    }

    // Get Single Post
    async getPost(slug) {

        try {

            return await this.tablesdb.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

        } catch (error) {

            console.log(
                "Appwrite service :: getPost :: error",
                error
            );

            return false;
        }
    }

    // Get All Active Posts
    async getPosts(
        queries = [Query.equal("status", ["active"])]
    ) {

        try {

            const posts = await this.tablesdb.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );

            console.log("POSTS:", posts);

            return posts;

        } catch (error) {

            console.log(
                "Appwrite service :: getPosts :: error",
                error
            );

            return false;
        }
    }

    // Upload File
    async uploadFile(file) {

        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

        } catch (error) {

            console.log(
                "Appwrite service :: uploadFile :: error",
                error
            );

            return false;
        }
    }

    // Delete File
    async deleteFile(fileId) {

        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );

            return true;

        } catch (error) {

            console.log(
                "Appwrite service :: deleteFile :: error",
                error
            );

            return false;
        }
    }

    // File Preview
    getFilePreview(fileId) {
    return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    );
}
}

const databaseService = new DatabaseService();

export default databaseService;