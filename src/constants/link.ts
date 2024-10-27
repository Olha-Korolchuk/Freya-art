export const LINK_TEMPLATES = {
    HOME: '/',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
    CREATE: '/create',
    EDIT: (id: string) => `/edit/${id}`,
    PROFILE: () => `/profile`,
    DETAILED: (id: string) => `/detailed/${id}`,
    ALL_WORKS: () => `/all-works`,
};
