# Evowear (React Native / Expo)

Evowear is a mobile shopping app built with **React Native** using **Expo**. It includes browsing products, a cart with quantity controls, deals/discounts, and a support chat.

## Screenshots

|                     Home                     |               Search Products                |                    Deals                     |
| :------------------------------------------: | :------------------------------------------: | :------------------------------------------: |
| <img src="docs/Screens (8).jpg" width="220"> | <img src="docs/Screens (7).jpg" width="220"> | <img src="docs/Screens (1).jpg" width="220"> |

|                   My Cart                    |                   Support                    |                    Login                     |
| :------------------------------------------: | :------------------------------------------: | :------------------------------------------: |
| <img src="docs/Screens (2).jpg" width="220"> | <img src="docs/Screens (3).jpg" width="220"> | <img src="docs/Screens (4).jpg" width="220"> |

|                   Sign Up                    |                   Profile                    |
| :------------------------------------------: | :------------------------------------------: |
| <img src="docs/Screens (5).jpg" width="220"> | <img src="docs/Screens (6).jpg" width="220"> |

## Features

- **Home tab**: Product feed with search and category filtering
- **Product details**: Size selection + add-to-cart (with sale badges)
- **Deals tab**: “Flash Sale” listing with discounted products
- **Cart tab**: Update quantities, remove items, and place order (demo)
- **Message tab**: In-app chat with simple rule-based replies
- **Dark/Light mode**: Automatic based on system theme
- **Cart badge**: Shows total quantity in the bottom tab

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Expo CLI (or use `npx expo ...`)

### Install

```bash
npm install
```

### Run (development)

```bash
npx expo start
```

Then choose one of:

- **a**: Android emulator / device
- **i**: iOS simulator / device
- **w**: Web

## Project Structure (high level)

- `App.js` - wraps providers and renders `AppNavigator`
- `navigators/` - navigation setup (tabs + product detail stack)
- `screens/` - screen components (Home, Deals, Cart, Messages, Account, ProductDetail)
- `components/` - reusable UI components (Home header/products/cards, account screens, etc.)
- `utils/` - app state & helpers (CartContext, UserContext, product data, themes)

## Tech Stack

- **Expo** + **React Native**
- **React Navigation** (bottom tabs + native stack)
- **react-native-paper** (UI)
- **react-hook-form** + **yup** (forms/validation)
- **react-native-flash-message** (toast notifications)

## Notes

- Checkout and order placement use a demo flow (shows a success toast and clears the cart).
- The Messages screen uses a lightweight rule-based “AI reply” generator.
