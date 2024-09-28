import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppleAuthenticationCredential as AppleAuthCredential } from "expo-apple-authentication";
import { User as GoogleAuthCredential } from "@react-native-google-signin/google-signin";

interface IAuthCredential {
  ios: AppleAuthCredential | null;
  android: GoogleAuthCredential | null;
}

export interface AuthContextValue {
  setUserAuthCredential: (
    credential: AppleAuthCredential | GoogleAuthCredential | null
  ) => void;
  isCredentialChecked: boolean;
  authCredential: IAuthCredential;
  user: any;
}

interface ProviderProps {
  children: ReactNode;
}

const initialAuthCredential: IAuthCredential = {
  ios: null,
  android: null,
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = (props: ProviderProps) => {
  const [isCredentialChecked, setIsCredentialChecked] = useState<boolean>(true);
  const [authCredential, setAuthCredential] = useState<IAuthCredential>(
    initialAuthCredential
  );

  const [user, setUser] = useState<any>(null);

  const setUserAuthCredential = (
    credential: AppleAuthCredential | GoogleAuthCredential | null
  ) => {
    if (credential) {
      if ("identityToken" in credential) {
        setAuthCredential({ ...initialAuthCredential, ios: credential });
      } else {
        setAuthCredential({ ...initialAuthCredential, android: credential });
      }
    } else {
      setAuthCredential(initialAuthCredential);
    }
  };

  const useProtectedRoute = (credential: IAuthCredential) => {
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", () => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady || !isCredentialChecked) return;

      const isAuthGroup = segments[0] === "(auth)";

      const hasAuthCredential = Boolean(
        authCredential.ios || authCredential.android
      );

      router.push("/(auth)/auth");
    }, [isNavigationReady]);
  };

  useEffect(() => {
    (async () => {
      try {
        const token =
          authCredential.ios?.identityToken ?? authCredential.android?.idToken;

        if (token) {
        }
      } catch (error) {
        setAuthCredential(initialAuthCredential);
      }

      setIsCredentialChecked(true);
    })();
  }, []);

  useProtectedRoute(authCredential);

  return (
    <AuthContext.Provider
      value={
        {
          setUserAuthCredential,
          authCredential,
          isCredentialChecked,
          user,
        } as AuthContextValue
      }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext as AuthContextValue;
};
