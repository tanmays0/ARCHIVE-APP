# Assignment 2 — Comparative Study: Native, Hybrid, React Native

## Framing: e-commerce marketplace (ARCHIVE)

ARCHIVE needs: fast catalogue scrolling, trusted checkout UX, offline-capable cart, editorial UI, and a short academic delivery timeline. The table below compares approaches against those needs.

## Comparison table

| Dimension | Native (Swift/Kotlin) | Hybrid (Cordova / Capacitor WebView) | React Native (Expo) |
|-----------|----------------------|--------------------------------------|---------------------|
| **UI rendering** | Platform UIKit / Jetpack | HTML/CSS inside WebView | Native views driven by JS |
| **Catalogue performance** | Excellent (RecyclerView / UICollectionView) | Weaker on long lists | Strong with **FlatList** virtualisation |
| **Checkout security** | Best (Keychain, biometric APIs) | Relies on WebView + web TLS | Strong via native modules + secure storage |
| **Offline cart** | Straightforward local DB | Possible but awkward | **AsyncStorage** / SQLite easy |
| **Code sharing** | Two codebases | One web codebase | One TS codebase (+ optional native modules) |
| **Time to market** | Slowest | Fast for content sites | Fast for product apps |
| **Team skills** | Platform specialists | Web developers | React / TypeScript |
| **Access to device APIs** | Full | Plugin-dependent | Rich Expo + community modules |
| **Store review risk** | Standard | Sometimes flagged as “thin WebView” | Standard native binary |
| **Limitations** | Cost, dual maintenance | Scroll jank, limited native feel | Occasional native-module versioning |

## Advantages & limitations (summary)

### Native
- **Pros:** Maximum performance, deepest platform APIs, polished platform UX.
- **Cons:** Two teams/codebases; slowest for a course assignment storefront.
- **Best when:** Banking-grade apps, heavy camera/AR, OS-first features.

### Hybrid
- **Pros:** Reuse an existing website; one HTML codebase.
- **Cons:** WebView performance ceilings; checkout and list UX often feel non-native.
- **Best when:** Content/brochure apps wrapping a responsive site.

### React Native
- **Pros:** Shared TypeScript; native navigation; FlatList; Expo tooling for Android emulator demos; Context + hooks match course concepts.
- **Cons:** Must pin native dependency versions; some modules need rebuilds (`expo run:android`).
- **Best when:** Cross-platform product UIs like ARCHIVE’s catalogue → cart → checkout.

## Recommendation for ARCHIVE

**React Native with Expo** is the best fit:

1. **Catalogue** — FlatList virtualises 24+ authenticated pieces efficiently.
2. **Checkout** — Native stack screens + validated forms + Alerts; can extend to secure storage later.
3. **Offline cart** — AsyncStorage persistence survives app restarts.
4. **Time to market** — One TypeScript app demonstrated on Pixel_9 via Android Studio.
5. **Pedagogy** — Props, state, Flexbox, StyleSheet, Stack Navigator, FlatList, fetch — all first-class.

See also the in-app screen: **Tech Insights** (`TechInsightsScreen`).
