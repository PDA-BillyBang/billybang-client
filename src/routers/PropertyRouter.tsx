import PropertyDetail from '@/routes/property/PropertyDetail';
import SubHeader from '@components/common/header/SubHeader';
import { RouteObject } from 'react-router-dom';

export const propertyRoutes: RouteObject[] = [
  {
    path: 'property',
    element: <SubHeader />,
    children: [
      {
        path: ':id',
        element: <PropertyDetail />,
      },
    ],
  },
];
