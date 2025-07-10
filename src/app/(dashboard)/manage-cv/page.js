import { prisma } from "@/utils/prisma"
import { FormUpload } from "./_components/form-upload";
import { DataTableDemo } from "./_components/table";
import { generatePresignedUrl } from "@/utils/presigned-url";

export default async function Page() {
    const files = await prisma.cvFile.findMany({
        where: { userId: "aa" },
        select: {
            id: true,
            fileName: true,
            path: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const filesWithUrl = await Promise.all(
        files.map(async (file) => ({
            ...file,
            previewUrl: await generatePresignedUrl(file.fileName),
        }))
    );

    return (
        <main className=" py-10 max-w-6xl mx-auto space-y-8">
            <section className="mb-6">
                <h1 className="text-2xl font-bold text-cv-primary">Keep it up, Jake 👋</h1>
                <p className="text-zinc-500">Manage your uploaded CV here</p>
            </section>

            <FormUpload />

            <section className="mt-10 space-y-2">
                <h2 className="text-xl font-semibold">Uploaded CV History</h2>
                <p className="text-zinc-500 text-sm">Here is your lists of CV</p>
                <DataTableDemo data={filesWithUrl} />
            </section>
        </main>
    )
}
