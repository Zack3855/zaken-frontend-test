import { axiosInstance } from "../axiosInstance";
import {
  TDesignationReturnType,
  TDesignations,
} from "./designationServices.types";

interface DesignationRequestBody {
  name: string;
  parentDesignationId: number;
}

export const getDesignationsService = () =>
  axiosInstance.get<TDesignationReturnType>("/designations");

export const addDesignationService = ({
  name,
  parentDesignationId,
}: TDesignations) =>
  axiosInstance.post("/designations", {
    name,
    parentDesignationId,
  });

export const updateDesignationService = (
  designationId: number,
  body: DesignationRequestBody
) => axiosInstance.put(`/designations/${designationId}`, body);

export const deleteDesignationService = (designationId: number) =>
  axiosInstance.delete(`/designations/${designationId}`);
