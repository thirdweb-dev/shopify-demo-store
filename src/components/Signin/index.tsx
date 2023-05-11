import { PAPER_CLIENT_ID } from '@/lib/environment-variables';
import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { useAddress, useConnectionStatus, useDisconnect, useLogin, useLogout, usePaperWallet, usePaperWalletUserEmail, useUser } from '@thirdweb-dev/react';
import { useCallback, useEffect, useRef } from 'react';
import { FiArrowDown, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const Signin = ({ ...rest }) => {
  const loginAttempted = useRef(false);
  const address = useAddress();
  const connect = usePaperWallet();

  const { login } = useLogin();
  const { data: email } = usePaperWalletUserEmail();
  const { isLoading, isLoggedIn } = useUser();

  // If you want to handle logout, uncomment these lines:
  const { logout } = useLogout();
  const disconnect = useDisconnect();

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
      // If you want to handle logout, uncomment these lines:
      await disconnect();
      await logout();
      return;
    }
    try {
      await connect({
        clientId: PAPER_CLIENT_ID,
      });
    } catch (e) {
      console.error(e);
    }
  }, [address, connect, disconnect, logout]);

  return (
    <>
    {!address && !isLoggedIn && !isLoading ? (
      <Button
        as={Button}
        isLoading={connecting}
        onClick={handleLoginOrLogout}
        rightIcon={address ? <FiArrowDown /> : undefined}
        minW="85px"
        bg="white"
        color="black"
        _hover={{
          bg: "white",
          color: "black",
          opacity: 0.9,
        }}
        {...rest}
      >
        {(address || isLoggedIn && email) ? email : 'Sign in'}
      </Button>
    ) : (
      <Menu matchWidth>
        {({ isOpen }) => (
          <>
            <MenuButton 
              as={Button}
              isLoading={connecting}
              rightIcon={address ? isOpen ? <FiChevronUp /> : <FiChevronDown /> : undefined}
              transition="all 1s linear"
              _active={{
                bg: "white",
                color: "black",
                opacity: 0.9,
              }}
              bg="white"
              color="black"
              _hover={{
                bg: "white",
                color: "black",
                opacity: 0.9,
              }}
              {...rest}
            >
              {email}
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={handleLoginOrLogout}>Sign Out</MenuItem>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    )}
    </>
  )
};
