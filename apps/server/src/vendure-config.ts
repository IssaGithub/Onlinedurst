import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
    LanguageCode,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import 'dotenv/config';
import path from 'path';

import { DepositPlugin } from './plugins/deposit';
import { B2BPlugin } from './plugins/b2b';
import { invoicePaymentHandler, cashOnDeliveryHandler } from './plugins/payment';

const IS_DEV = process.env.APP_ENV === 'dev';
// PORT wins because hosting platforms inject it into the environment at runtime, and that
// must take precedence over any value baked into the .env file at scaffold time.
const serverPort = +process.env.PORT || +process.env.VENDURE_SERVER_PORT || 3000;

function getDbConfig() {
    const dbType = process.env.DB_TYPE || 'better-sqlite3';
    
    if (dbType === 'postgres') {
        return {
            type: 'postgres' as const,
            host: process.env.DB_HOST || 'localhost',
            port: +(process.env.DB_PORT || 5432),
            database: process.env.DB_NAME || 'onlinedurst',
            username: process.env.DB_USERNAME || 'vendure',
            password: process.env.DB_PASSWORD || '',
            synchronize: false,
            migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
            logging: IS_DEV,
        };
    }
    
    return {
        type: 'better-sqlite3' as const,
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
    };
}

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        // Which browser origins may make credentialed requests to the Shop and Admin APIs.
        // In dev any origin is reflected, so a storefront on any port works. In production set
        // CORS_ORIGINS to a comma-separated list of the origins you serve, for example
        // "https://example.com,https://admin.example.com". An unset value blocks all
        // cross-origin browser requests, which is the safe default.
        cors: {
            origin: IS_DEV ? true : (process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean) ?? []),
            credentials: true,
        },
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiDebug: true,
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: getDbConfig(),
    paymentOptions: {
        paymentMethodHandlers: [
            dummyPaymentHandler,
            cashOnDeliveryHandler,
            invoicePaymentHandler,
        ],
    },
    // Custom fields for beverage-specific data (Getränkeladen Onlinedurst)
    customFields: {
        ProductVariant: [
            {
                name: 'depositAmount',
                type: 'int',
                defaultValue: 0,
                label: [{ languageCode: LanguageCode.de, value: 'Pfandbetrag (Cent)' }],
                description: [{ languageCode: LanguageCode.de, value: 'Pfandbetrag in Cent (z.B. 800 für 8,00€ Kastenpfand)' }],
                ui: { component: 'currency-form-input' },
            },
            {
                name: 'containerSize',
                type: 'string',
                label: [{ languageCode: LanguageCode.de, value: 'Gebindegröße' }],
                description: [{ languageCode: LanguageCode.de, value: 'z.B. "20x0,5l", "24x0,33l", "6x1l"' }],
            },
            {
                name: 'bottleSize',
                type: 'string',
                label: [{ languageCode: LanguageCode.de, value: 'Flaschengröße' }],
                options: [
                    { value: '0.2l', label: [{ languageCode: LanguageCode.de, value: '0,2 Liter' }] },
                    { value: '0.33l', label: [{ languageCode: LanguageCode.de, value: '0,33 Liter' }] },
                    { value: '0.5l', label: [{ languageCode: LanguageCode.de, value: '0,5 Liter' }] },
                    { value: '0.7l', label: [{ languageCode: LanguageCode.de, value: '0,7 Liter' }] },
                    { value: '1l', label: [{ languageCode: LanguageCode.de, value: '1 Liter' }] },
                    { value: '1.5l', label: [{ languageCode: LanguageCode.de, value: '1,5 Liter' }] },
                ],
            },
            {
                name: 'containerType',
                type: 'string',
                label: [{ languageCode: LanguageCode.de, value: 'Verpackungsart' }],
                options: [
                    { value: 'mehrweg_glas', label: [{ languageCode: LanguageCode.de, value: 'Mehrweg Glas' }] },
                    { value: 'mehrweg_pet', label: [{ languageCode: LanguageCode.de, value: 'Mehrweg PET' }] },
                    { value: 'einweg', label: [{ languageCode: LanguageCode.de, value: 'Einweg' }] },
                    { value: 'dose', label: [{ languageCode: LanguageCode.de, value: 'Dose' }] },
                ],
            },
            {
                name: 'totalVolume',
                type: 'float',
                label: [{ languageCode: LanguageCode.de, value: 'Gesamtvolumen (Liter)' }],
                description: [{ languageCode: LanguageCode.de, value: 'Gesamtvolumen des Gebindes in Litern' }],
            },
            {
                name: 'alcoholContent',
                type: 'float',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Alkoholgehalt (%)' }],
                description: [{ languageCode: LanguageCode.de, value: 'Alkoholgehalt in Prozent (leer für alkoholfrei)' }],
            },
            {
                name: 'isRegional',
                type: 'boolean',
                defaultValue: false,
                label: [{ languageCode: LanguageCode.de, value: 'Regionales Produkt' }],
            },
            {
                name: 'regionalDistance',
                type: 'int',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Regionale Entfernung (km)' }],
                description: [{ languageCode: LanguageCode.de, value: 'Entfernung des Herstellers in km (z.B. 25 für "bis 25km")' }],
            },
        ],
        Product: [
            {
                name: 'manufacturer',
                type: 'string',
                label: [{ languageCode: LanguageCode.de, value: 'Hersteller/Brauerei' }],
            },
            {
                name: 'beverageType',
                type: 'string',
                label: [{ languageCode: LanguageCode.de, value: 'Getränkeart' }],
                options: [
                    { value: 'bier', label: [{ languageCode: LanguageCode.de, value: 'Bier' }] },
                    { value: 'wasser', label: [{ languageCode: LanguageCode.de, value: 'Wasser' }] },
                    { value: 'saft', label: [{ languageCode: LanguageCode.de, value: 'Saft' }] },
                    { value: 'limo', label: [{ languageCode: LanguageCode.de, value: 'Limonade' }] },
                    { value: 'cola', label: [{ languageCode: LanguageCode.de, value: 'Cola' }] },
                    { value: 'energy', label: [{ languageCode: LanguageCode.de, value: 'Energy Drinks' }] },
                    { value: 'wein', label: [{ languageCode: LanguageCode.de, value: 'Wein' }] },
                    { value: 'spirituosen', label: [{ languageCode: LanguageCode.de, value: 'Spirituosen' }] },
                    { value: 'sonstiges', label: [{ languageCode: LanguageCode.de, value: 'Sonstiges' }] },
                ],
            },
            {
                name: 'beerStyle',
                type: 'string',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Bierstil' }],
                options: [
                    { value: 'pils', label: [{ languageCode: LanguageCode.de, value: 'Pils' }] },
                    { value: 'helles', label: [{ languageCode: LanguageCode.de, value: 'Helles/Export' }] },
                    { value: 'weizen', label: [{ languageCode: LanguageCode.de, value: 'Weizen' }] },
                    { value: 'kellerbier', label: [{ languageCode: LanguageCode.de, value: 'Kellerbier' }] },
                    { value: 'dunkel', label: [{ languageCode: LanguageCode.de, value: 'Dunkel/Bockbier' }] },
                    { value: 'radler', label: [{ languageCode: LanguageCode.de, value: 'Radler/Mixbier' }] },
                    { value: 'alkoholfrei', label: [{ languageCode: LanguageCode.de, value: 'Alkoholfrei/Malz' }] },
                    { value: 'naturtrüb', label: [{ languageCode: LanguageCode.de, value: 'Naturtrüb' }] },
                ],
            },
        ],
        Customer: [
            {
                name: 'customerType',
                type: 'string',
                defaultValue: 'b2c',
                label: [{ languageCode: LanguageCode.de, value: 'Kundentyp' }],
                options: [
                    { value: 'b2c', label: [{ languageCode: LanguageCode.de, value: 'Privatkunde (B2C)' }] },
                    { value: 'b2b', label: [{ languageCode: LanguageCode.de, value: 'Geschäftskunde (B2B)' }] },
                ],
            },
            {
                name: 'companyName',
                type: 'string',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Firmenname' }],
            },
            {
                name: 'vatNumber',
                type: 'string',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'USt-IdNr.' }],
            },
            {
                name: 'deliveryNotes',
                type: 'text',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Lieferhinweise' }],
                description: [{ languageCode: LanguageCode.de, value: 'Besondere Hinweise für die Lieferung (z.B. Keller, Hintereingang)' }],
            },
        ],
        Order: [
            {
                name: 'totalDeposit',
                type: 'int',
                defaultValue: 0,
                label: [{ languageCode: LanguageCode.de, value: 'Gesamtpfand (Cent)' }],
                public: true,
                internal: false,
            },
            {
                name: 'deliveryDate',
                type: 'datetime',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Gewünschtes Lieferdatum' }],
            },
            {
                name: 'deliveryTimeSlot',
                type: 'string',
                nullable: true,
                label: [{ languageCode: LanguageCode.de, value: 'Lieferzeitfenster' }],
                options: [
                    { value: 'morning', label: [{ languageCode: LanguageCode.de, value: '09:00 - 12:00' }] },
                    { value: 'afternoon', label: [{ languageCode: LanguageCode.de, value: '12:00 - 15:00' }] },
                    { value: 'evening', label: [{ languageCode: LanguageCode.de, value: '15:00 - 18:30' }] },
                ],
            },
        ],
    },
    plugins: [
        GraphiqlPlugin.init(),
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : (process.env.ASSET_URL_PREFIX || 'https://onlinedurst.de/assets/'),
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                fromAddress: process.env.EMAIL_FROM_ADDRESS || '"Onlinedurst Heilbronn" <noreply@onlinedurst.de>',
                verifyEmailAddressUrl: (process.env.STOREFRONT_URL || 'http://localhost:3001') + '/verify',
                passwordResetUrl: (process.env.STOREFRONT_URL || 'http://localhost:3001') + '/reset-password',
                changeEmailAddressUrl: (process.env.STOREFRONT_URL || 'http://localhost:3001') + '/account/verify-email',
            },
        }),
        DashboardPlugin.init({
            route: 'dashboard',
            appDir: IS_DEV
                ? path.join(__dirname, '../dist/dashboard')
                : path.join(__dirname, 'dashboard'),
        }),
        DepositPlugin,
        B2BPlugin,
    ],
};
