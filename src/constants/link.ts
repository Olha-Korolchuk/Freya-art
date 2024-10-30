export const LINK_TEMPLATES = {
    HOME: '/',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
    CREATE: '/create',
    EDIT: (id: string) => `/edit/${id}`,
    PROFILE: (id: string) => `/profile/${id}`,
    DETAILED: (id: string) => `/detailed/${id}`,
    ALL_WORKS: () => `/all-works`,
};
