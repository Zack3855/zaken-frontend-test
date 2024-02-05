import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  useRef,
  MutableRefObject,
} from "react";
import { axiosInstance } from "@/services/axiosInstance";
import { useAuth } from "@/context/authContext";
import { TUserAuth } from "@/context/authContext/AuthContext";
import { refreshTokenService } from "@/services/authServices";

interface Props {
  children: ReactNode;
}

type TCallback = (token: string) => void;

const refreshTokenHandler = async (
  setAuth: Dispatch<SetStateAction<TUserAuth>>,
  actualAccessRef: MutableRefObject<string | null>
) => {
  const localStorageAccess = localStorage.getItem("accessToken");
  const sesionStorageAccess = sessionStorage.getItem("accessToken");
  if (localStorageAccess || sesionStorageAccess) {
    try {
      console.log("refreshTokenHandler");
      const {
        data: {
          body: { tokens },
        },
      } = await refreshTokenService();
      const newAccess = tokens.accessToken;
      const newRefresh = tokens.refreshToken;
      console.log(newAccess, "newAccess");
      console.log(newRefresh);
      if (localStorageAccess) {
        localStorage.setItem("accessToken", newAccess);
        localStorage.setItem("refreshToken", newRefresh);
      } else {
        sessionStorage.setItem("accessToken", newAccess);
        sessionStorage.setItem("refreshToken", newRefresh);
      }

      actualAccessRef.current = newAccess;
      setAuth({ accessToken: newAccess, refreshToken: newRefresh });
      return newAccess;
    } catch {
      console.log("catch");
      if (localStorageAccess) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
      }
      window.location.href = "/sign-in";
    } finally {
      console.log("finally");
    }
  }
  return null;
};

let refreshSubscribers: Array<TCallback> = [];
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => {
    cb(token);
  });
}

function subscribeTokenRefresh(cb: TCallback) {
  refreshSubscribers.push(cb);
}

const AxiosWrapper: FC<Props> = ({ children }): ReactElement => {
  const { authState, setAuthState } = useAuth();
  const [isSet, setIsSet] = useState<boolean>(false);
  const refreshRef = useRef(false);
  const actualAccessRef = useRef<string | null>(authState.accessToken);
  const domainId = Number(localStorage.getItem("domainId"));

  useEffect(() => {
    if (!actualAccessRef.current) {
      return;
    }
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request) => {
        if (request.headers) {
          request.headers.Authorization = actualAccessRef.current
            ? `Bearer ${actualAccessRef.current}`
            : " ";
          request.headers["domain_id"] = domainId;
        }

        return request;
      },
      (error) => Promise.reject(error.response)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 401 &&
          !error.request.responseURL.includes("refresh-token")
        ) {
          if (!refreshRef.current) {
            refreshRef.current = true;

            const newToken = await refreshTokenHandler(
              setAuthState,
              actualAccessRef
            );
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            onRefreshed(newToken!);
            refreshRef.current = false;
            refreshSubscribers = [];
            return axiosInstance.request(originalRequest);
          }

          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;

              resolve(axiosInstance(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );
    setIsSet(true);

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [domainId, setAuthState]);

  return <div>{isSet && children}</div>;
};

export default AxiosWrapper;
