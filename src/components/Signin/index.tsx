import { PAPER_CLIENT_ID } from '@/lib/environment-variables';
import { Button } from '@chakra-ui/react';
import { useAddress, useConnectionStatus, useLogin, usePaperWallet, usePaperWalletUserEmail, useUser } from '@thirdweb-dev/react';
import { useCallback, useEffect, useRef } from 'react';

export const Signin = () => {
  const loginAttempted = useRef(false);
  const address = useAddress();
  const connect = usePaperWallet();

  const { login } = useLogin();
  const { data: email } = usePaperWalletUserEmail();
  const { isLoading, isLoggedIn } = useUser();

  useEffect(() => {
    if (address && !isLoggedIn && !isLoading && !loginAttempted.current) {
      login();
      loginAttempted.current = true;
    };
  }, [address, isLoading, isLoggedIn, login, loginAttempted]);

  const connectionStatus = useConnectionStatus();
  const connecting =
    connectionStatus === "connecting" || connectionStatus === "unknown";

  const handleLoginOrLogout = useCallback(async () => {
    if (address) {
      return;
    }
    try {
      await connect({
        clientId: PAPER_CLIENT_ID,
      });
    } catch (e) {
      console.error(e);
    }
  }, [address, connect]);

  return (
    <Button
      isLoading={connecting}
      onClick={handleLoginOrLogout}
      minW="85px"
    >
      {(address || isLoggedIn && email) ? email : 'Sign in'}
    </Button>
  )
};
