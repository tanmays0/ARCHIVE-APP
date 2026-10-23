# Assignment 4 — Project Structure & Reusable Components

## Annotated folder tree

```
ARCHIVE-APP/
├─ App.tsx                 # Fonts, splash, providers, NavigationContainer
├─ index.ts                # registerRootComponent
├─ app.json                # Expo config (splash bone, Android package)
├─ babel.config.js         # Expo preset + Reanimated plugin (last)
├─ eslint.config.js        # eslint-config-expo + prettier
├─ assets/                 # Icons & splash
├─ docs/                   # Assignment write-ups, viva, rubric
└─ src/
   ├─ navigation/          # RootNavigator (Stack) + MainTabs
   ├─ screens/             # One file per route (Hello, Home, About, …)
   ├─ components/
   │  ├─ ui/               # Shared Button, Badge, PriceTag, Input, …
   │  └─ product/          # ProductCard, ProductGrid
   ├─ context/             # Cart, Wishlist, Profile (Context + useReducer)
   ├─ hooks/               # useProducts, useDebounce, useResponsive
   ├─ services/            # api.ts (FakeStore), storage.ts (AsyncStorage)
   ├─ data/                # products.json (≥24), collections.json
   ├─ theme/               # colors, typography, spacing, radii, shadows
   ├─ utils/               # format, validation
   └─ types/               # Shared TypeScript interfaces
```

## Why this structure

| Folder | Responsibility |
|--------|----------------|
| `theme/` | Single source of brand tokens — no hard-coded colours in screens |
| `components/ui/` | Reusable presentational primitives (Assignment 3 + 4) |
| `components/product/` | Domain-specific catalogue UI |
| `context/` | Cross-screen state without Redux |
| `hooks/` | Data/filter and layout logic kept out of JSX |
| `services/` | I/O boundary (network + persistence) |
| `screens/` | Route-level composition only |
| `docs/` | Academic artefacts for grading & viva |

## Reusable components (UI kit)

| Component | Props highlight | State interaction |
|-----------|-----------------|-------------------|
| `Button` | `title`, `onPress`, `variant` | — |
| `Badge` | `label`, `tone` | — |
| `PriceTag` | `price`, `compareAtPrice` | — |
| `QuantityStepper` | `value`, `onChange` | Parent `useState` / cart reducer |
| `FilterChip` | `label`, `active`, `onPress` | Catalogue filter state |
| `Input` | `label`, `error`, TextInput props | Form `useState` |
| `EmptyState` / `Loader` | messaging | Async UI |
| `ProductCard` | `product`, `onPress` | Wishlist Context toggle |

## State-based updates

1. **Wishlist heart** — `WishlistContext` toggle updates card UI instantly and persists IDs.
2. **Cart quantity** — `CartContext` `SET_QTY` / `ADD` / `REMOVE` re-renders Cart tab badge and subtotal; AsyncStorage write on change.
3. **Catalogue filters** — `useState` for search, category, sort → memoised filtered list → FlatList data.

## Naming conventions

- Components: **PascalCase** (`ProductCard.tsx`)
- Functions / hooks: **camelCase** (`useProducts`, `formatPrice`)
- Constants: **UPPER_SNAKE** sparingly for storage keys
- Types: **PascalCase** interfaces in `src/types`
