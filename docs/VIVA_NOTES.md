# VIVA Notes — ARCHIVE Mobile

## 2-minute walkthrough script

1. **Boot (10s):** Open the Pixel_9 emulator → show **Hello ARCHIVE** (Assignment 1). Tap **Enter the Archive**.  
2. **Home (20s):** Point out Fraunces logo, scroll-driven hero (Reanimated), First Look copy from the web brand, trust strip, new-arrivals carousel.  
3. **Catalogue (25s):** Search “Nike”, tap a category chip, change sort. Mention FlatList props (`keyExtractor`, `initialNumToRender`, memoised `renderItem`). Open a product.  
4. **Product → Cart (20s):** Select size, change quantity, add to cart (Alert). Show cart stepper + remove Alert.  
5. **Checkout (20s):** Submit empty → validation Alert. Fill fields, toggle gift wrap, place order → confirmation.  
6. **Profile + Assignments (15s):** Show Assignment 5 components; open **Assignments** helper and **Tech Insights** (A2).  
7. **Close (10s):** Kill app, reopen, cart still there (AsyncStorage). Mention Context instead of Redux.

## Design decision justifications

| Decision | Why |
|----------|-----|
| Expo SDK 58 | Assignment requires Expo CLI; fast Android emulator workflow |
| Context + useReducer | Course-sized state; no Redux boilerplate; easy to explain |
| AsyncStorage for cart | Survives process death; sufficient for client-side cart |
| Fraunces + DM Sans | Matches web Fraunces; DM Sans substitutes General Sans |
| Bone / ink / clay tokens | Lifted from web `tokens.css` for brand continuity |
| FlatList over ScrollView+map | Virtualisation for 24+ products (Assignment 8) |
| FakeStore for API demo | Public, no keys; labelled separately from ARCHIVE JSON |
| Stack + tabs | Stack mandatory; tabs improve storefront chrome for viva |
| Reanimated on Home | Scroll-driven landing without GSAP/Lenis web stack |

## 25+ likely viva questions (crisp answers)

1. **Why Expo?** Managed toolchain, `expo start` / `expo run:android`, fonts/splash modules, Assignment 1 requirement.  
2. **Why not Redux?** Cart/wishlist/profile are small; Context + useReducer is enough and matches course outcomes.  
3. **How does FlatList virtualise?** Renders a window of rows; recycles views as you scroll (`windowSize`, `initialNumToRender`).  
4. **Props vs state?** Props are inputs from parent; state is owned/internal and triggers re-render on change.  
5. **Flexbox main vs cross axis?** Default column: main = vertical, cross = horizontal; `flexDirection: 'row'` swaps them.  
6. **Stack navigation lifecycle?** Screens push/pop; prior screen stays mounted unless unmounted by navigator options.  
7. **Native vs Hybrid vs RN?** Native = two platforms; Hybrid = WebView; RN = native views + JS — best balance for ARCHIVE.  
8. **Why AsyncStorage for cart?** Simple key-value persistence for JSON cart lines across restarts.  
9. **What is `keyExtractor`?** Stable unique key per row so React reconciles list items correctly.  
10. **Why memoise `renderItem`?** Prevents unnecessary child re-renders when parent state unrelated to the row changes.  
11. **How do you validate email?** Regex / shape check in `validation.ts`; Alert on failure (Assignment 6).  
12. **What is a controlled TextInput?** `value` + `onChangeText` tied to React state.  
13. **Why StyleSheet.create?** Creates opaque style IDs once; clearer performance/intent than inline objects everywhere.  
14. **How is the theme centralised?** `src/theme/*` tokens imported by components — no hard-coded hex in UI.  
15. **What does `useReducer` buy you?** Predictable transitions (ADD/REMOVE/SET_QTY) vs scattered `setState` logic.  
16. **Explain authentication badge.** Products with `authenticated: true` show olive Badge — mirrors web trust model.  
17. **Condition grades?** Like New, Excellent, Good, Fair — honest grading copy from web About.  
18. **Why FakeStore separately?** Demonstrates `fetch` + loading/error without polluting curated ARCHIVE data.  
19. **SafeAreaProvider purpose?** Avoids notch/status-bar overlaps on modern Android devices.  
20. **Reanimated vs Animated API?** Reanimated runs animations on the UI thread; better for scroll-linked hero.  
21. **How do tabs relate to stack?** Tabs are a screen inside the root stack; detail/checkout push on top.  
22. **What is `getItemLayout`?** Lets FlatList skip measurement when row height is fixed — faster scroll.  
23. **Offline behaviour?** Local JSON catalogue always works; API demo shows error/retry when network fails.  
24. **Responsive strategy?** `useWindowDimensions` → column count and padding; Flexbox + aspectRatio images.  
25. **How would you secure real payments?** Native SDK (Stripe), TLS, never store PAN; this demo stops at mock place-order.  
26. **Why TypeScript?** Catch navigation param / prop mistakes at compile time (`tsc --noEmit`).  
27. **What changed from the web app?** MPA/vanilla → RN; 242-frame canvas hero → single image + Reanimated; General Sans → DM Sans.  
28. **How do you demo each assignment quickly?** Profile → Assignments screen → one-tap navigation.  
29. **Cart badge?** `itemCount` from CartContext drives `tabBarBadge` on Cart tab.  
30. **Exhaustive switches?** `never` default in reducers ensures new action types fail at compile time.
