import React from "react";

export const withPermissions = <T,>(
  Component: React.FC<T>,
  requiredPermissions: string[]
) => {
  const permissions = ["edit", "read"];
  if (
    !permissions.some((permission) =>
      requiredPermissions.find((value) => permission === value)
    )
  )
    return () => null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return (props: T) => <Component {...props} />;
};
