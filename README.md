# ARCHIVE Mobile

Curated vintage & pre-loved fashion marketplace — **React Native (Expo SDK 58)**, TypeScript, **Android-only** demonstration for Cross Platform App Development.

Brand, copy, palette, and catalogue shape adapted from the web app: [tanmays0/ARCHIVE](https://github.com/tanmays0/ARCHIVE).

## Quick start (Pixel_9 emulator)

```bash
# 1. Environment
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools

# 2. Emulator
# Start Pixel_9 from Android Studio Device Manager, then:
adb devices

# 3. App
cd /Users/shind/Desktop/ARCHIVE-APP
npm install
npx expo start
npx expo run:android
```

Full setup & troubleshooting: [docs/ASSIGNMENT_1_Setup.md](docs/ASSIGNMENT_1_Setup.md).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` / `npx expo start` | Metro bundler |
| `npm run android` / `npx expo run:android` | Native Android build + launch |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Architecture

- **Navigation:** Native Stack (root) + bottom tabs (Home, Shop, Cart, Profile)
- **State:** React Context + `useReducer` (Cart, Wishlist, Profile) — no Redux
- **Data:** Local `src/data/products.json` (26 pieces) + FakeStore API demo (Assignment 8)
- **Persistence:** AsyncStorage for cart / wishlist / profile
- **Theme:** `src/theme` — bone `#f2eee6`, ink `#181510`, clay `#a9522f`, Fraunces + DM Sans

## Screens

Hello ARCHIVE · Home · About · Authenticity & Services · Catalogue · Product Details · Cart · Checkout · Order Confirmation · Customer Profile · Contact · Tech Insights · Assignments · API Demo

## Assignments map

| # | Topic | Entry point |
|---|-------|-------------|
| 1 | Expo setup / Hello World | `HelloArchiveScreen` + Assignment 1 doc |
| 2 | Native vs Hybrid vs RN | `TechInsightsScreen` + Assignment 2 doc |
| 3 | Props & state | UI kit + ProductCard wishlist / steppers |
| 4 | Structure & reuse | `docs/ASSIGNMENT_4_Project_Structure.md` |
| 5 | Customer profile | `CustomerProfileScreen` |
| 6 | Responsive + Alerts | Checkout / Contact / Cart |
| 7 | Stack navigation | Home / About / Contact |
| 8 | FlatList + API | Catalogue + `ApiDemoScreen` |
| 9–10 | Storefront + shopping | See `docs/ASSIGNMENT_9_10_Mapping.md` |

## Rubric & viva

- [docs/RUBRIC_TRACEABILITY.md](docs/RUBRIC_TRACEABILITY.md)
- [docs/VIVA_NOTES.md](docs/VIVA_NOTES.md)
- [docs/SCREENSHOTS_CHECKLIST.md](docs/SCREENSHOTS_CHECKLIST.md)

## Dependencies (justified)

Expo, React Navigation (stack + tabs), expo-image, expo-font + Fraunces/DM Sans, safe-area-context, AsyncStorage, Reanimated, gesture-handler, screens — see plan dependency list. No Redux, no axios.
