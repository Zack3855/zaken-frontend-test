import { axiosInstance } from "../axiosInstance";
import {
  TDepartments,
  TDepartmentsReturnType,
} from "./departmentServices.types";

export const getAllDepartmentsService = async () =>
  await axiosInstance.get<TDepartmentsReturnType>("departments", {
    params: {
      page: 1,
      pageSize: 50,
    },
  });

export const addDepartmentService = (args: TDepartments) =>
  axiosInstance.post("departments", args);

export const deleteDepartmentService = (departmentId: number) =>
  axiosInstance.delete(`/departments/${departmentId}`);

export const updateDepartment = (
  departmentId: number,
  name: string,
  parentDepartmentId: number
) =>
  axiosInstance.put(`departments/${departmentId}`, {
    name,
    parentDepartmentId,
  });
