import APIClient from "@/utils/apiClient";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface SocialLoginProps {}

export const SocialLogin: React.FC<
  SocialLoginProps
> = ({}: SocialLoginProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Login");
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const client = new APIClient();
    await toast.promise(
      client.post("google-login", {
        credential: credentialResponse.credential,
      }),
      {
        loading: t("googleLoginLoading"),
        success: (data) => {
          router.push(`/${locale}/`);
          return t("googleLoginSuccess");
        },
        error: "Error",
      }
    );
  };

  const handleError = () => {
    toast(t("loginErrorTitle"), {
      description: t("googleLoginErrorDescription"),
    });
  };

  return (
    <div className="mt-4">
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleError}
          useOneTap
        />
      </GoogleOAuthProvider>
    </div>
  );
};
