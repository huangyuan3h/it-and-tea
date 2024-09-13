import APIClient from '@/utils/apiClient';
import { decodeJWT } from '@/utils/auth';
import { toastMessages } from '@/utils/toastMessage';
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useUser } from '../user-context';

export interface SocialLoginProps {
  onHide: () => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({
  onHide,
}: SocialLoginProps) => {
  const { updateUser } = useUser();
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const client = new APIClient();
    const response = await toast.promise(
      client.post('auth/login/google', {
        credential: credentialResponse.credential,
      }),
      {
        success: toastMessages.LOGIN_SUCCESS,
        pending: toastMessages.LOADING,
        error: toastMessages.REQUEST_ERROR,
      },
      {
        position: 'top-center',
      }
    );
    if (response.Authorization) {
      setCookie(null, 'Authorization', response.Authorization);
      updateUser(decodeJWT(response.Authorization));
      onHide();
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => toast.error(toastMessages.REQUEST_ERROR)}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};
