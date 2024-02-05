export type TDepartmentsReturnType = {
  body: {
    departments: {
      id: number;
      name: string;
      parentDepartment: unknown;
    }[];
  };
};

export type TDepartments = {
  name: string;
  parentDepartmentId: number;
};
