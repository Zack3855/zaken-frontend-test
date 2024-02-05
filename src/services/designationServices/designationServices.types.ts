export type TDesignationReturnType = {
  body: {
    designations: {
      id: number;
      name: string;
      parentDesignation: unknown;
    }[];
  };
};

export type TDesignations = {
  name: string;
  parentDesignationId: number;
};
