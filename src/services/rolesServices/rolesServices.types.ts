export type TRole = { id: number; name: string; priority: number };

export type TReturnedRoles = {
  body: {
    roles: TRole[];
  };
};
