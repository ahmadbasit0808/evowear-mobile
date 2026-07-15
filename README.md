# Evowear (evowear-mobile)

Evowear is a mobile commerce app built with **Expo + React Native**. It includes browsing products with search + categories, viewing product details (with size selection), a cart with quantity handling, and simple auth state via context.

## Tech stack

- **Expo** SDK ~57
- **React Native** 0.86
- **React** 19
- **React Navigation**
  - Bottom tabs
  - Native stack (for screens like Product Detail)
- **Contexts (state management)**
  - `utils/UserContext.js`
  - `utils/CartContext.js`
- **UI / UX**
  - `react-native-paper`
  - `react-native-flash-message`
  - Dark/light theming via `useColorScheme`
- **Carousel**
  - `react-native-reanimated-carousel`

## Screens (high level)

- **Home** (`screens/Home.js`)
  - Header + search
  - Category pills
  - Product grid
- **Product Detail** (`screens/ProductDetail.js`)
  - Product image
  - Sale badge + discount calculation
  - Size selector
  - “Add to Cart” CTA
- **Cart** (`screens/Cart.js`)
  - Uses cart context for items/quantity/total
- **Deals** (`screens/Deal.js`)
- **Messages** (`screens/Messages.js`)
- **Account** (`screens/Account.js`)

## How to run locally

### 1) Install dependencies

```bash
npm install
```

### 2) Start the dev server

```bash
npx expo start
```

Then follow the Expo CLI instructions to run on:

- Android emulator/device (`npx expo run android`)
- iOS simulator/device (`npx expo run ios`)
- Web (`npx expo run web`)

## Build / EAS (optional)

This project includes an `eas.json` configuration.

```bash
npm install -g eas-cli
eas login
```

Typical flows:

```bash
eas build --platform android
# or
eas build --platform ios
```

## Project structure (quick map)

- `App.js` – app entry, wraps providers
- `navigators/`
  - `RootNavigator.js` – bottom tabs + cart badge
  - `AppNavigator.js` – stack navigator + ProductDetail
- `screens/` – top-level screens
- `components/` – reusable UI pieces
- `utils/`
  - `CartContext.js`, `UserContext.js`
  - `product.js` (demo product data)
  - `themes.js` (colors + theme helpers)

## Notes

- Product data is currently static from `utils/product.js` (images are loaded from `images/`).
- Cart state is kept in-memory via React context (not persisted across app restarts).
