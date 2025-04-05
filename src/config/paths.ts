export const paths = {
    home: {
        getHref: () => '/',
    },
    root: {
        getHref: () => '/',
    },
    characters: {
        getHref: () => '/characters',
    },
    memorias: {
        getHref: () => '/memorias',
    },
    equipments: {
        getHref: () => '/equipments',
    },
    items: {
        getHref: () => '/items',
    },
    materials: {
        getHref: () => '/materials',
    },
} as const;
