import { loanRoutes } from './LoanRouter';
import { mapRoutes } from './MapRouter';
import { userRoutes } from './UserRouter';
import { mypageRoutes } from './MypageRouter';
import { notFoundRoutes } from './NotFoundRouter';
import { statisticsRoutes } from './StatisticsRouter';
import { propertyRoutes } from './PropertyRouter';

export const mainRoutes = [
  ...loanRoutes,
  ...mapRoutes,
  ...userRoutes,
  ...mypageRoutes,
  ...statisticsRoutes,
  ...notFoundRoutes,
  ...propertyRoutes,
];
