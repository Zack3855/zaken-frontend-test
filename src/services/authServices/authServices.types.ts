export type TSignInServiceReturn = {
  body: { tokens: { accessToken: string; refreshToken: string } };
};

export type TRefreshTokenServiceReturn = TSignInServiceReturn;

export type TSignUpArguments = {
  identifier: number;
  email: string;
  password: string;
  role: string;
  designationId: number;
  departmentId: number;
  reportingToId?: number;
};
