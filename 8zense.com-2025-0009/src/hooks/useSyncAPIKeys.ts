import { useEffect } from 'react';
import { createClient } from '@/src/utils/supabase/client';
import { useAPIKeysStore } from '@/src/store/useAPIKeysStore';

const supabase = createClient();

const useSyncAPIKeys = () => {
    const { setAPIKeys, setLoading } = useAPIKeysStore();

    const fetchAndUpdateAPIKeys = async () => {
        let { data: apiKeys, error } = await supabase
            .from('api_keys')
            .select('id, apikeys, created_at');

        if (error) {
            console.error('Error fetching API Keys:', error);
            return;
        }

        if (apiKeys) {
            const formattedAPIKeys = apiKeys.map((key: { id: string; apikeys: string | null; created_at: string; }) => ({
                id: key.id,
                apikeys: key.apikeys ?? '',
                api_key_id: key.id,
                key: key.apikeys ?? '',
                created_at: new Date(key.created_at), // Convert to Date
                created_by: '', // Add appropriate value
                org_id: '', // Add appropriate value
                is_active: false // Add appropriate value
            }));
            setAPIKeys(formattedAPIKeys);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndUpdateAPIKeys();
    }, []);
};

export default useSyncAPIKeys;