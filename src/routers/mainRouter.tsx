import { loanRoutes } from "./LoanRouter";
import { mapRoutes } from "./MapRouter";
import { userRoutes } from "./UserRouter";
import { mypageRoutes } from "./MypageRouter";

export const mainRoutes = [
  ...loanRoutes,
  ...mapRoutes,
  ...userRoutes,
  ...mypageRoutes,
];
