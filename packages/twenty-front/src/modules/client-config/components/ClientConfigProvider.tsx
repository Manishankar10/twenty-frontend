// import { clientConfigApiStatusState } from '@/client-config/states/clientConfigApiStatusState';
// import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
// import { AppFullScreenErrorFallback } from '@/error-handler/components/AppFullScreenErrorFallback';
// import { useLingui } from '@lingui/react/macro';

// export const ClientConfigProvider: React.FC<React.PropsWithChildren> = ({
//   children,
// }) => {
//   const { isErrored, error } = useAtomStateValue(clientConfigApiStatusState);
//   const { t } = useLingui();

//   return isErrored && error instanceof Error ? (
//     <AppFullScreenErrorFallback
//       error={error}
//       resetErrorBoundary={() => {
//         window.location.reload();
//       }}
//       title={t`Unable to Reach Back-end`}
//     />
//   ) : (
//     children
//   );
// };


import { useEffect } from 'react';
import { clientConfigApiStatusState } from '@/client-config/states/clientConfigApiStatusState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { AppPath } from 'twenty-shared/types';

export const ClientConfigProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isErrored, error } = useAtomStateValue(clientConfigApiStatusState);

  useEffect(() => {
    if (isErrored && error instanceof Error && window.location.pathname !== AppPath.SignInUp) {
      window.location.href = AppPath.SignInUp;
    }
  }, [isErrored, error]);

  if (isErrored && error instanceof Error && window.location.pathname !== AppPath.SignInUp) {
    return null; // Fixed: Returning null prevents React from throwing an invalid object error
  }

  return <>{children}</>;
};