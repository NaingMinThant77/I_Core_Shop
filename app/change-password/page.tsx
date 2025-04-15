import { Suspense } from 'react';
import ChangePasswordForm from './change-password-form';

const ChangePassword = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordForm />
        </Suspense>
    );
};

export default ChangePassword;
