import ConfirmEmail from '@/components/confirm-email'
import React, { Suspense } from 'react'

const ConfirmEmailPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmEmail />
        </Suspense>
    )
}

export default ConfirmEmailPage
