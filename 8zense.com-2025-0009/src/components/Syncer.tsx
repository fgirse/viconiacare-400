'use client';
import useSyncAPIKeys from '@/src/hooks/useSyncAPIKeys';
import useSyncAuth from '@/src/hooks/useSyncAuth';
import useSyncInvites from '@/src/hooks/useSyncInvites';
import useSyncOrgs from '@/src/hooks/useSyncOrgs';

function Syncer() {
    useSyncAuth();
    useSyncOrgs();
    useSyncInvites();
    useSyncAPIKeys();

    return null;
}

export default Syncer;
