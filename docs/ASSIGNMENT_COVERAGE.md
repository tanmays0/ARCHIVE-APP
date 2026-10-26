# All 10 assignments — coverage map

UI copy does **not** mention assignment numbers. Course evidence lives here and under `docs/ASSIGNMENT_*.md`.

| # | Requirement | Covered in app | Notes |
|---|-------------|----------------|-------|
| 1 | Expo project + Android emulator boot | `HelloArchiveScreen`, `app.json`, Expo SDK 58 | Enter ARCHIVE → MainTabs |
| 2 | Native / Hybrid / RN comparative study | `TechInsightsScreen` + `docs/ASSIGNMENT_2_Comparative_Study.md` | Profile → The house → How we build |
| 3 | Props & state | `ProductCard`, `QuantityStepper`, `FilterChip`, wishlist heart | Catalogue / Product / Cart |
| 4 | Structure & reusable components | `src/` folders + `components/ui/` | See `ASSIGNMENT_4_Project_Structure.md` |
| 5 | Core components on Profile | `CustomerProfileScreen`: View, Text, Image, TextInput, **Button**, Switch, ScrollView | Guest vs signed-in Profile |
| 6 | Responsive UI + events / Alerts | Login/Register + Checkout/Contact TextInputs & Alerts | Cart without login; checkout gated |
| 7 | Multi-screen Stack navigation | `RootNavigator` native stack + nested `MainTabs` bottom bar | Includes Login / Register |
| 8 | Dynamic data (local JSON + public API) | `CatalogueScreen` + `products.json`; `ApiDemoScreen` + FakeStore `fetch` | Shop + Discover more |
| 9 | E-commerce storefront | Home, About, Authenticity, Catalogue, Contact + Stack | See `ASSIGNMENT_9_10_Mapping.md` |
| 10 | Full shopping app | Product, Cart, Auth, Checkout, Profile, orders | Auth required to place order |

## Navigation (A7 + storefront chrome)

- **Bottom tab bar:** Home · Shop · Cart · Profile (`MainTabs`)
- **Stack headers:** Product, Checkout, About, Discover more, etc. (`RootNavigator`)
- Profile uses a **settings-style navigation list** that pushes stack screens — not a wall of raw buttons.
