import { InitialData, LanguageCode } from '@vendure/core';

export const onlinedurstInitialData: InitialData = {
    defaultLanguage: LanguageCode.de,
    defaultZone: 'DE',
    taxRates: [
        { name: 'Standard-MwSt', percentage: 19 },
        { name: 'Ermäßigte MwSt', percentage: 7 },
    ],
    shippingMethods: [
        {
            name: 'Lieferung Heilbronn & Umgebung',
            price: 0,
        },
        {
            name: 'Expresslieferung (gleicher Tag)',
            price: 500,
        },
    ],
    paymentMethods: [
        {
            name: 'Barzahlung bei Lieferung',
            handler: {
                code: 'dummy-payment-handler',
                arguments: [],
            },
        },
        {
            name: 'Rechnung (nur B2B)',
            handler: {
                code: 'dummy-payment-handler',
                arguments: [],
            },
        },
    ],
    countries: [
        { name: 'Deutschland', code: 'DE' as any, zone: 'DE' },
        { name: 'Österreich', code: 'AT' as any, zone: 'EU' },
    ],
    collections: [
        {
            name: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Bier'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Pils',
            parentName: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Pils'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Weizen',
            parentName: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Weizen'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Helles & Export',
            parentName: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Helles'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Alkoholfrei',
            parentName: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Alkoholfrei'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Radler & Mixbiere',
            parentName: 'Biere',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Radler'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Wasser',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Wasser'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Säfte',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Saft'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Limonaden & Cola',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Limonade', 'Cola'], containsAny: true },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Energy Drinks',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Energy'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
        {
            name: 'Regionale Produkte',
            filters: [
                {
                    code: 'facet-value-filter',
                    args: { facetValueNames: ['Regional'], containsAny: false },
                },
            ],
            assetPaths: [],
        },
    ],
};

export const sampleProducts = [
    {
        name: 'Augustiner Lager Hell',
        slug: 'augustiner-lager-hell-20x05l',
        description: 'Ein helles Exportbier, weich, spritzig und frisch zugleich, aus edelsten Rohstoffen gebraut. Das Spitzenerzeugnis altbayerischer Braukunst. Ein Hochgenuss für jeden Bierkenner.',
        facets: ['Bier', 'Helles'],
        customFields: {
            manufacturer: 'Augustiner-Bräu München',
            beverageType: 'bier',
            beerStyle: 'helles',
        },
        variants: [
            {
                sku: 'AUG-HELL-20x05',
                price: 2790,
                customFields: {
                    depositAmount: 310,
                    containerSize: '20x0,5l',
                    bottleSize: '0.5l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 10,
                    alcoholContent: 5.2,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Augustiner Edelstoff',
        slug: 'augustiner-edelstoff-20x05l',
        description: 'Ein helles Exportbier, weich, spritzig und frisch zugleich, aus edelsten Rohstoffen gebraut.',
        facets: ['Bier', 'Helles'],
        customFields: {
            manufacturer: 'Augustiner-Bräu München',
            beverageType: 'bier',
            beerStyle: 'helles',
        },
        variants: [
            {
                sku: 'AUG-EDEL-20x05',
                price: 2790,
                customFields: {
                    depositAmount: 310,
                    containerSize: '20x0,5l',
                    bottleSize: '0.5l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 10,
                    alcoholContent: 5.6,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Bitburger Premium Pils',
        slug: 'bitburger-pils-24x033l',
        description: 'Bitburger Premium Pils - Das einzigartige Bier aus der Eifel. Gebraut nach dem deutschen Reinheitsgebot.',
        facets: ['Bier', 'Pils'],
        customFields: {
            manufacturer: 'Bitburger Brauerei',
            beverageType: 'bier',
            beerStyle: 'pils',
        },
        variants: [
            {
                sku: 'BIT-PILS-24x033',
                price: 2150,
                customFields: {
                    depositAmount: 342,
                    containerSize: '24x0,33l',
                    bottleSize: '0.33l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 7.92,
                    alcoholContent: 4.8,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Bitburger 0,0% Alkoholfrei',
        slug: 'bitburger-alkoholfrei-24x033l',
        description: 'Genießen Sie den neuen Geschmack von Bitburger 0,0% alkoholfreies Pils. Es überzeugt mit Vitaminen und isotonischer Wirkung.',
        facets: ['Bier', 'Alkoholfrei'],
        customFields: {
            manufacturer: 'Bitburger Brauerei',
            beverageType: 'bier',
            beerStyle: 'alkoholfrei',
        },
        variants: [
            {
                sku: 'BIT-AF-24x033',
                price: 2150,
                customFields: {
                    depositAmount: 342,
                    containerSize: '24x0,33l',
                    bottleSize: '0.33l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 7.92,
                    alcoholContent: 0,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Haller Löwenbräu Pilsner',
        slug: 'haller-loewenbraeu-pils-20x05l',
        description: 'Traditionelles Pilsner aus Schwäbisch Hall - regional und frisch.',
        facets: ['Bier', 'Pils', 'Regional'],
        customFields: {
            manufacturer: 'Haller Löwenbräu',
            beverageType: 'bier',
            beerStyle: 'pils',
        },
        variants: [
            {
                sku: 'HALL-PILS-20x05',
                price: 1990,
                customFields: {
                    depositAmount: 310,
                    containerSize: '20x0,5l',
                    bottleSize: '0.5l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 10,
                    alcoholContent: 4.9,
                    isRegional: true,
                    regionalDistance: 50,
                },
            },
        ],
    },
    {
        name: 'Erdinger Weissbier',
        slug: 'erdinger-weissbier-20x05l',
        description: 'Das fruchtig-frische Weissbier mit feiner Hefe. Bayerische Brautradition seit 1886.',
        facets: ['Bier', 'Weizen'],
        customFields: {
            manufacturer: 'Erdinger Weissbräu',
            beverageType: 'bier',
            beerStyle: 'weizen',
        },
        variants: [
            {
                sku: 'ERD-WEISS-20x05',
                price: 2290,
                customFields: {
                    depositAmount: 310,
                    containerSize: '20x0,5l',
                    bottleSize: '0.5l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 10,
                    alcoholContent: 5.3,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Beil Apfelsaft Klar 100% Direktsaft',
        slug: 'beil-apfelsaft-klar-6x1l',
        description: 'Apfelsaft klar. Aus heimischem Obst, von traditionell bewirtschafteten Streuobstwiesen. Kelterei und Abfüllung im eigenen Betrieb. Jährliche Prämierung.',
        facets: ['Saft', 'Regional'],
        customFields: {
            manufacturer: 'Kelterei Beil',
            beverageType: 'saft',
        },
        variants: [
            {
                sku: 'BEIL-APFEL-6x1',
                price: 1190,
                customFields: {
                    depositAmount: 240,
                    containerSize: '6x1l',
                    bottleSize: '1l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 6,
                    isRegional: true,
                    regionalDistance: 25,
                },
            },
        ],
    },
    {
        name: 'Beil Apfelsaft Naturtrüb 100% Direktsaft',
        slug: 'beil-apfelsaft-naturtrueb-6x1l',
        description: 'Naturtrüber Apfelsaft, 100% Direktsaft ohne Zuckerzusatz. Aus heimischem Obst.',
        facets: ['Saft', 'Regional'],
        customFields: {
            manufacturer: 'Kelterei Beil',
            beverageType: 'saft',
        },
        variants: [
            {
                sku: 'BEIL-APFEL-NT-6x1',
                price: 1260,
                customFields: {
                    depositAmount: 240,
                    containerSize: '6x1l',
                    bottleSize: '1l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 6,
                    isRegional: true,
                    regionalDistance: 25,
                },
            },
        ],
    },
    {
        name: 'Coca-Cola Classic',
        slug: 'coca-cola-classic-12x1l',
        description: 'Der Klassiker - Original Coca-Cola in der 1-Liter-Flasche.',
        facets: ['Cola', 'Limonade'],
        customFields: {
            manufacturer: 'Coca-Cola',
            beverageType: 'cola',
        },
        variants: [
            {
                sku: 'COKE-12x1',
                price: 1790,
                customFields: {
                    depositAmount: 360,
                    containerSize: '12x1l',
                    bottleSize: '1l',
                    containerType: 'mehrweg_pet',
                    totalVolume: 12,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Afri Cola',
        slug: 'afri-cola-24x033l',
        description: 'DIE NEUESTE AFRISCHUNG - afri cola mit 25mg Koffein pro 100ml.',
        facets: ['Cola', 'Limonade'],
        customFields: {
            manufacturer: 'Mineralbrunnen Überkingen-Teinach',
            beverageType: 'cola',
        },
        variants: [
            {
                sku: 'AFRI-24x033',
                price: 2390,
                customFields: {
                    depositAmount: 342,
                    containerSize: '24x0,33l',
                    bottleSize: '0.33l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 7.92,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Gerolsteiner Sprudel',
        slug: 'gerolsteiner-sprudel-12x1l',
        description: 'Gerolsteiner Sprudel - Natürliches Mineralwasser mit Kohlensäure aus der Vulkaneifel.',
        facets: ['Wasser'],
        customFields: {
            manufacturer: 'Gerolsteiner Brunnen',
            beverageType: 'wasser',
        },
        variants: [
            {
                sku: 'GERO-SPRU-12x1',
                price: 990,
                customFields: {
                    depositAmount: 360,
                    containerSize: '12x1l',
                    bottleSize: '1l',
                    containerType: 'mehrweg_pet',
                    totalVolume: 12,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Gerolsteiner Medium',
        slug: 'gerolsteiner-medium-12x1l',
        description: 'Gerolsteiner Medium - Natürliches Mineralwasser mit wenig Kohlensäure.',
        facets: ['Wasser'],
        customFields: {
            manufacturer: 'Gerolsteiner Brunnen',
            beverageType: 'wasser',
        },
        variants: [
            {
                sku: 'GERO-MED-12x1',
                price: 990,
                customFields: {
                    depositAmount: 360,
                    containerSize: '12x1l',
                    bottleSize: '1l',
                    containerType: 'mehrweg_pet',
                    totalVolume: 12,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Red Bull Energy Drink',
        slug: 'red-bull-24x025l',
        description: 'Red Bull verleiht Flügel - Der Energy Drink Klassiker.',
        facets: ['Energy'],
        customFields: {
            manufacturer: 'Red Bull',
            beverageType: 'energy',
        },
        variants: [
            {
                sku: 'RBULL-24x025',
                price: 3590,
                customFields: {
                    depositAmount: 600,
                    containerSize: '24x0,25l',
                    bottleSize: '0.2l',
                    containerType: 'dose',
                    totalVolume: 6,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Astra Urtyp',
        slug: 'astra-urtyp-27x033l',
        description: 'Astra Urtyp - Ein Kasten Hamburger Kiez. 27 Flaschen eines Bieres mit langer Tradition seit 1647.',
        facets: ['Bier', 'Pils'],
        customFields: {
            manufacturer: 'Astra (Carlsberg)',
            beverageType: 'bier',
            beerStyle: 'pils',
        },
        variants: [
            {
                sku: 'ASTRA-UR-27x033',
                price: 2390,
                customFields: {
                    depositAmount: 366,
                    containerSize: '27x0,33l',
                    bottleSize: '0.33l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 8.91,
                    alcoholContent: 4.9,
                    isRegional: false,
                },
            },
        ],
    },
    {
        name: 'Astra Kiezmische',
        slug: 'astra-kiezmische-27x033l',
        description: 'Das Radler auf St. Pauli-Art mit 2,5% Alkohol. Prickelnde Mischung aus 50% leckerem Astra Bier und 50% fruchtiger, trüber Zitronenlimonade.',
        facets: ['Bier', 'Radler'],
        customFields: {
            manufacturer: 'Astra (Carlsberg)',
            beverageType: 'bier',
            beerStyle: 'radler',
        },
        variants: [
            {
                sku: 'ASTRA-KIEZ-27x033',
                price: 2390,
                customFields: {
                    depositAmount: 366,
                    containerSize: '27x0,33l',
                    bottleSize: '0.33l',
                    containerType: 'mehrweg_glas',
                    totalVolume: 8.91,
                    alcoholContent: 2.5,
                    isRegional: false,
                },
            },
        ],
    },
];

export const facetData = [
    {
        name: 'Getränkeart',
        values: ['Bier', 'Wasser', 'Saft', 'Limonade', 'Cola', 'Energy', 'Wein', 'Spirituosen'],
    },
    {
        name: 'Bierstil',
        values: ['Pils', 'Helles', 'Weizen', 'Kellerbier', 'Dunkel', 'Radler', 'Alkoholfrei', 'Naturtrüb'],
    },
    {
        name: 'Herkunft',
        values: ['Regional', 'National', 'International'],
    },
    {
        name: 'Verpackung',
        values: ['Mehrweg Glas', 'Mehrweg PET', 'Einweg', 'Dose'],
    },
];

export const customerGroups = [
    {
        name: 'B2C-Privatkunden',
    },
    {
        name: 'B2B-Kunden',
    },
    {
        name: 'B2B-Premium',
    },
    {
        name: 'Großkunden',
    },
];
