import { ReactNode } from 'react';

export interface RouteProps {
  path: string;
  name: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  isProtected?: boolean;
  layout?: React.ComponentType<{ children: ReactNode }>;
  roles?: string[];
}

export interface RouteConfig extends Omit<RouteProps, 'component'> {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

export interface BreadcrumbItem {
  path: string;
  name: string;
  current: boolean;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  roles?: string[];
}

export type RouteParams = {
  [key: string]: string | number | undefined;
};

export type QueryParams = {
  [key: string]: string | string[] | undefined;
};

export type RouteMatch = {
  params: RouteParams;
  query: QueryParams;
  path: string;
  url: string;
  isExact: boolean;
};

export type RouterHistory = {
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: any;
    key: string;
  };
};
