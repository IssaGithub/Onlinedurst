# Onlinedurst Heilbronn - E-Commerce Shop

Ein moderner Online-Getränkeshop basierend auf [Vendure.io](https://vendure.io) mit TanStack Start Storefront.

## Features

- **B2B & B2C Support**: Unterschiedliche Kundengruppen mit individuellen Preisen
- **Pfand-System**: Automatische Pfandberechnung für Mehrwegflaschen und Kästen
- **Getränke-spezifische Produktdaten**:
  - Gebindegröße (z.B. 20x0,5l)
  - Flaschengröße (0,33l, 0,5l, 1l, etc.)
  - Verpackungsart (Mehrweg Glas/PET, Einweg, Dose)
  - Alkoholgehalt
  - Regionale Produkte mit Entfernungsangabe
- **Lieferservice-Funktionen**:
  - Gewünschtes Lieferdatum
  - Zeitfenster-Auswahl (Vormittag, Mittag, Nachmittag)
  - Lieferhinweise für Kunden
- **Lokalisierung**: Vollständig auf Deutsch

## Projektstruktur

```
onlinedurst-shop/
├── apps/
│   ├── server/           # Vendure Backend (API Server)
│   │   ├── src/
│   │   │   ├── plugins/  # Custom Plugins (Pfand, B2B)
│   │   │   ├── seed-data/# Beispiel-Produktdaten
│   │   │   └── vendure-config.ts
│   │   └── static/       # Assets & E-Mail-Templates
│   └── storefront/       # TanStack Start Frontend
├── docker-compose.yml    # Production Docker Setup
└── .env.example          # Umgebungsvariablen-Vorlage
```

## Schnellstart (Entwicklung)

### Voraussetzungen

- Node.js v22 oder v20
- npm

### Installation

```bash
# In das Projektverzeichnis wechseln
cd onlinedurst-shop

# Dependencies installieren
npm install

# Entwicklungsserver starten (Server + Storefront)
npm run dev
```

### Zugriff

- **Storefront**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3000/dashboard
- **GraphQL Playground**: http://localhost:3000/graphiql
- **Shop API**: http://localhost:3000/shop-api
- **Admin API**: http://localhost:3000/admin-api

### Standard-Anmeldedaten (Admin)

- **Benutzername**: superadmin
- **Passwort**: superadmin

## Produktion (Docker)

### Voraussetzungen

- Docker & Docker Compose

### Deployment

```bash
# .env-Datei erstellen
cp .env.example .env

# Sichere Passwörter generieren und in .env eintragen
openssl rand -base64 32  # Für COOKIE_SECRET
openssl rand -base64 32  # Für REVALIDATION_SECRET

# Container starten
docker compose up -d

# Logs anzeigen
docker compose logs -f
```

### Produktion URLs

- **Storefront**: https://onlinedurst.de (Port 3001)
- **Admin Dashboard**: https://onlinedurst.de:3000/dashboard
- **API**: https://onlinedurst.de:3000/shop-api

## Konfiguration

### Umgebungsvariablen

| Variable | Beschreibung | Standard |
|----------|--------------|----------|
| `APP_ENV` | Umgebung (dev/production) | dev |
| `POSTGRES_DB` | Datenbankname | onlinedurst |
| `POSTGRES_USER` | DB-Benutzer | vendure |
| `POSTGRES_PASSWORD` | DB-Passwort | - |
| `COOKIE_SECRET` | Session-Verschlüsselung | - |
| `SUPERADMIN_PASSWORD` | Admin-Passwort | superadmin |
| `CORS_ORIGINS` | Erlaubte CORS-Origins | - |
| `STOREFRONT_URL` | Storefront-URL | http://localhost:3001 |

### Custom Fields

#### ProductVariant (Produktvariante)

- `depositAmount`: Pfandbetrag in Cent
- `containerSize`: Gebindegröße (z.B. "20x0,5l")
- `bottleSize`: Flaschengröße
- `containerType`: Verpackungsart (Mehrweg/Einweg)
- `totalVolume`: Gesamtvolumen in Litern
- `alcoholContent`: Alkoholgehalt in %
- `isRegional`: Regionales Produkt (ja/nein)
- `regionalDistance`: Entfernung zum Hersteller in km

#### Product (Produkt)

- `manufacturer`: Hersteller/Brauerei
- `beverageType`: Getränkeart
- `beerStyle`: Bierstil (nur für Biere)

#### Customer (Kunde)

- `customerType`: B2C (Privat) oder B2B (Geschäft)
- `companyName`: Firmenname (B2B)
- `vatNumber`: USt-IdNr. (B2B)
- `deliveryNotes`: Lieferhinweise

#### Order (Bestellung)

- `totalDeposit`: Gesamtpfand (automatisch berechnet)
- `deliveryDate`: Gewünschtes Lieferdatum
- `deliveryTimeSlot`: Lieferzeitfenster

## B2B-Funktionen

### Kundengruppen

1. **B2C-Privatkunden**: Standardpreise
2. **B2B-Kunden**: 10% Rabatt
3. **B2B-Premium / Großkunden**: 15% Rabatt

Die Rabatte werden automatisch basierend auf der Kundengruppe angewendet.

### B2B-Registrierung

B2B-Kunden können sich registrieren und folgende Daten angeben:
- Firmenname
- USt-IdNr.
- Lieferhinweise

Nach Prüfung durch den Admin werden sie der entsprechenden Kundengruppe zugewiesen.

## Produktkategorien

- **Biere**: Pils, Weizen, Helles/Export, Dunkel/Bockbier, Radler/Mixbiere, Alkoholfrei
- **Wasser**: Sprudel, Medium, Still
- **Säfte**: Apfelsaft, Orangensaft, Multivitamin, etc.
- **Limonaden & Cola**: Coca-Cola, Fanta, Afri Cola, etc.
- **Energy Drinks**: Red Bull, Monster, etc.
- **Regionale Produkte**: Produkte aus der Region (bis 25km, bis 50km)

## Migrationen

Nach Änderungen an Custom Fields müssen Migrationen erstellt werden:

```bash
cd apps/server

# Migration generieren
npm run migration:generate

# Migration ausführen
npm run migration:run
```

## Support

Bei Fragen oder Problemen:
- E-Mail: info@onlinedurst.de
- Telefon: 07131 255537
- Adresse: Theodor-Heuss-Str. 9, 74081 Heilbronn

## Lizenz

MIT
