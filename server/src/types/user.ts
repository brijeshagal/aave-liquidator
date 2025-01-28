export type UserData = {
  totalCollateralBase: string;
  totalDebtBase: string;
  healthFactor: string;
};
export type UserDetails = {
  beforeSimulation: UserData;
  afterSimulation: UserData;
  afterLiquidation: UserData;
};
