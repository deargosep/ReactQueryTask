export const currentUserSelector = (state) => state.auth.user
export const currentUserPortfolioSelector = (state) =>
  state.auth.user?.portfolio
export const currentUserLoadingSelector = (state) => state.auth.authInProgress
export const getIsSpecialist = (state) => state.auth.user?.isSpecialist
