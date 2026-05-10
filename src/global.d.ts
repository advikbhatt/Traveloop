declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/navigation' {
  export const useRouter: () => any;
  export const usePathname: () => any;
  export const useSearchParams: () => any;
}

declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: any);
    [key: string]: any;
  }
}

declare module 'firebase/app' {
  export const initializeApp: (config: any) => any;
  export const getApps: () => any[];
  export const getApp: () => any;
}

declare module 'firebase/analytics' {
  export const getAnalytics: (app: any) => any;
  export const isSupported: () => Promise<boolean>;
}

declare module 'firebase/auth' {
  export const getAuth: (app: any) => any;
  export const signInWithEmailAndPassword: (auth: any, email: string, pass: string) => Promise<any>;
  export const createUserWithEmailAndPassword: (auth: any, email: string, pass: string) => Promise<any>;
  export const signInWithPopup: (auth: any, provider: any) => Promise<any>;
  export class GoogleAuthProvider {
    constructor();
  }
}

