# Rubric Traceability Matrix (20 marks → Excellent)

## 1. Functionality & Output (8)

| Feature | Evidence |
|---------|----------|
| All screens navigable | `RootNavigator`, `MainTabs`, Assignments helper |
| Catalogue FlatList | `CatalogueScreen` + `products.json` (26 items) |
| Public API demo | `ApiDemoScreen` + `services/api.ts` (loading/error/retry) |
| Cart persistence | `CartContext` + `storage.ts` (AsyncStorage) |
| Checkout validation | `CheckoutScreen` + `validateCheckoutFields` + Alerts |
| Contact validation | `ContactScreen` + Alerts |
| Empty states | `EmptyState` on cart / catalogue / API |
| Wishlist toggle | `WishlistContext` + `ProductCard` heart |
| Order confirmation | `OrderConfirmationScreen` |
| Android run | `npx expo run:android` on Pixel_9 (see Assignment 1 doc) |

## 2. Code Structure & Syntax (4)

| Criterion | Evidence |
|-----------|----------|
| TypeScript strict | `tsconfig.json`, typed navigators & props |
| Naming | PascalCase components, camelCase functions |
| Lint / format | `eslint.config.js`, `.prettierrc`, `npm run lint` |
| Zero type errors | `npm run typecheck` (`tsc --noEmit`) |
| Folder structure | Documented in `ASSIGNMENT_4_Project_Structure.md` |

## 3. Concept Implementation (4)

| Concept | Tagged location |
|---------|-----------------|
| Props | UI kit + `ProductCard` — `// [Assignment 3]` |
| useState | Forms, quantity, filters, wishlist UX |
| Context + useReducer | `CartContext`, `WishlistContext`, `ProfileContext` |
| Flexbox / StyleSheet | Every screen |
| Core components | Profile: View, Text, Image, TextInput, Button, Switch, ScrollView |
| Stack Navigation | `RootNavigator` — `// [Assignment 7]` |
| FlatList efficiency | `CatalogueScreen` / `ApiDemoScreen` — `// [Assignment 8]` |
| Events + Alert | Checkout, Contact, Cart remove, Add to cart |
| fetch | `services/api.ts` |

## 4. Readability & Documentation (2)

| Artefact | Path |
|----------|------|
| File header comments | All `src/**` modules |
| JSDoc on exports | Components, hooks, services |
| Assignment tags | Inline `// [Assignment N]` |
| README | `README.md` |
| Setup / structure / mapping | `docs/ASSIGNMENT_*.md` |

## 5. Viva / Explanation (2)

| Artefact | Path |
|----------|------|
| Walkthrough + 25+ Q&A | `docs/VIVA_NOTES.md` |
| Live demo helper | `AssignmentsScreen` |
| Comparative study | `docs/ASSIGNMENT_2_Comparative_Study.md` + Tech Insights screen |
