# ARCHIVE

Curated vintage and pre-loved fashion marketplace for Android — authenticated pieces, editorial catalogue, cart, and checkout.

Built with **Expo (SDK 58)**, **React Native**, and **TypeScript**. Companion to the web experience at [tanmays0/ARCHIVE](https://github.com/tanmays0/ARCHIVE).

## Features

- Scroll-driven home landing with brand story and featured collections
- Catalogue with search, category chips, sort, and efficient `FlatList` scrolling
- Product details with gallery, condition grade, authenticity badge, wishlist
- Cart with quantity controls and AsyncStorage persistence
- Checkout with validation, gift-wrap option, and order confirmation
- Customer profile, contact form, authenticity & services pages
- Local catalogue (26 pieces) plus optional public API demo screen

## Requirements

- Node.js 22+
- Android Studio with Android SDK and Platform Tools
- Pixel_9 (or similar) Android Virtual Device

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

## Install

```bash
git clone https://github.com/tanmays0/ARCHIVE-APP.git
cd ARCHIVE-APP
npm install
```

## Run on Android emulator

Start the Pixel_9 AVD from Android Studio **Device Manager**, then:

```bash
adb devices
npx expo run:android
```

First build compiles native modules and can take several minutes. Later launches are much faster.

### Day-to-day restart

With the emulator already running and the app installed:

```bash
cd ARCHIVE-APP
adb reverse tcp:8081 tcp:8081
npx expo start
# press `a` to open on Android, or:
npx expo run:android
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Build, install, and launch on Android |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | Expo 58 / React Native 0.88 |
| Language | TypeScript |
| Navigation | React Navigation (native stack + bottom tabs) |
| State | React Context + `useReducer` |
| Persistence | AsyncStorage |
| Images | `expo-image` |
| Motion | `react-native-reanimated` |
| Fonts | Fraunces (display), DM Sans (body) |

## Project layout

```
App.tsx                 # Entry: fonts, providers, navigation
src/
  navigation/           # Root stack + main tabs
  screens/              # Route screens
  components/ui/        # Shared UI primitives
  components/product/   # Product card / grid
  context/              # Cart, wishlist, profile
  hooks/                # Products, debounce, responsive
  services/             # API + storage
  data/                 # products.json, collections.json
  theme/                # Colors, typography, spacing
  utils/                # Format + validation
  types/                # Shared types
docs/                   # Course assignment notes (optional reading)
```

## Brand

Warm-neutral editorial palette from the ARCHIVE web design system: bone `#f2eee6`, ink `#181510`, clay `#a9522f`, olive `#6b6a54`.

## License

See [LICENSE](LICENSE).
