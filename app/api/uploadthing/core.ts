import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("file url", file.url);
        }),

    variantImagesUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("variant file url", file.url);
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;