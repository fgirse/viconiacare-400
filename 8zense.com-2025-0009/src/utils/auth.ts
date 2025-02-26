import { redirect } from 'next/navigation';
import { getUserOnServer } from '@/src/utils/supabase/user';
import { User } from '@supabase/supabase-js';

export const authenticatePage = async (): Promise<[User, string]> => {
    const user_data = await getUserOnServer();
    const [user, secret] = user_data
    if (!user || !secret) {
        return redirect('/sign-in');
    }
    return [user, secret];
};
