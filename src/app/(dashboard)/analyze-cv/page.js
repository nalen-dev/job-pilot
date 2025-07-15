import { getCVByUserId } from "@/services/cv";
import { FormAnalyze } from "./_components/form-analyze";

export default async function Page() {
    const files = await getCVByUserId();
    return (
        <main>
            <FormAnalyze files={files} />
        </main>
    )
}
