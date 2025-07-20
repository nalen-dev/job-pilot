import { getCurrentSession } from '@/services/auth';
import FormEdit from './_components/form-edit';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getCurrentSession();
    if (!session) {
        redirect("/login");
    }
    return (
        <FormEdit session={session} />
    );
}

