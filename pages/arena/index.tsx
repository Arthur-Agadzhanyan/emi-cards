import React from 'react';
import Link from 'next/link'
import {PageContainer, PageWrapper } from '@/shared/page';
import { withAuth } from '@/app/hocs/authentication';

function Arena() {

    return (
        <PageWrapper>
            <PageContainer>
                <Link href={'/arena/common'}>
                    <a>Common</a>
                </Link>


            </PageContainer>
        </PageWrapper>
    );
}

export default withAuth(Arena);