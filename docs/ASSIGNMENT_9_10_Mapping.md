# Assignments 9 & 10 — Requirement Mapping

Both assignments are satisfied by **the same ARCHIVE codebase**. Assignment 10 extends Assignment 9; nothing from 9 is removed.

## Assignment 9 — E-Commerce Storefront

| Requirement | Where it lives | Notes |
|-------------|----------------|-------|
| Home: brand name, hero image, brief introduction | `src/screens/HomeScreen.tsx` | Logo ARCHIVE, Unsplash hero, First Look copy from web |
| About: brand story, mission, sourcing | `src/screens/AboutScreen.tsx` | Story + mission + vision + auth process |
| Authenticity & Services | `src/screens/AuthenticityServicesScreen.tsx` | Craft + Customer promise |
| Catalogue with FlatList | `src/screens/CatalogueScreen.tsx` | Local `products.json` |
| Contact form (TextInput + Button) | `src/screens/ContactScreen.tsx` | Validated + Alert |
| Stack Navigation | `src/navigation/RootNavigator.tsx` | Native Stack; tabs nested inside |
| Responsive StyleSheet + Flexbox | All screens + `useResponsive` | Percentage widths, `numColumns` |

## Assignment 10 — Complete Shopping Application

| Requirement | Where it lives | Notes |
|-------------|----------------|-------|
| All Assignment 9 bullets | Same files as above | Still present and linked |
| Catalogue search, filter, sort | `CatalogueScreen` + `useProducts` | Chips + sort row + search |
| Product Details | `src/screens/ProductDetailsScreen.tsx` | Gallery, size, badge, wishlist, add to cart |
| Cart | `src/screens/CartScreen.tsx` + `CartContext` | Stepper, remove, subtotal, AsyncStorage |
| Checkout + validation + alerts | `src/screens/CheckoutScreen.tsx` | Switches, Alert, OrderConfirmation |
| Customer Profile | `src/screens/CustomerProfileScreen.tsx` | Assignment 5 core components |
| Contact form | `ContactScreen` | Shared with A9 |
| Stack Navigation | `RootNavigator` | Product → Cart → Checkout → Confirmation |
| Responsive UI | Theme + Flexbox + `useWindowDimensions` | Phone & wide layouts |

## Why one codebase covers both

Assignment 10 is a **strict superset** of Assignment 9. ARCHIVE ships the storefront screens (9) and the shopping extensions (10) behind one Expo app and one Stack navigator. Demo path for viva:

1. **A9 path:** Hello → Home → About → Authenticity → Catalogue → Contact  
2. **A10 path:** Catalogue → Product → Cart → Checkout → Confirmation → Profile  

Use the Profile navigation list (Account / Shop / Help / The house) to jump between demos.
