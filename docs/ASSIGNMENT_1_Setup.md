# Assignment 1 — Project Setup (Expo + Android Emulator)

## Objective

Set up a React Native project with Expo CLI and run a basic “Hello World” on the Android emulator.

## ARCHIVE demonstration

- Fresh Expo SDK 58 TypeScript project in this repository
- Splash background `#f2eee6` (bone)
- Boot screen [`HelloArchiveScreen`](../src/screens/HelloArchiveScreen.tsx): **Hello ARCHIVE**
- Button **Enter the Archive** navigates into the main app

## Prerequisites

1. Node.js 22+ (this machine: check with `node -v`)
2. Android Studio with Android SDK + Platform Tools
3. AVD named **Pixel_9** (or any Pixel API 34+ image)

## Environment variables

Add to `~/.zshrc` (or `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
```

Then:

```bash
source ~/.zshrc
echo $ANDROID_HOME
adb version
```

## Create / open the AVD

1. Open **Android Studio → Device Manager**
2. Create Virtual Device → Pixel 9 → system image (API 34+)
3. Cold Boot Now
4. Verify:

```bash
adb devices
# should list: emulator-5554   device
```

## Run ARCHIVE

```bash
cd /Users/shind/Desktop/ARCHIVE-APP
npm install
npx expo start
# in another terminal (or press `a` in Metro):
npx expo run:android
```

`expo run:android` builds a native Android debug app, installs it on the emulator, and connects Metro.

## What you should see

1. Splash (bone cream)
2. **Hello ARCHIVE** in Fraunces with short brand line
3. Clay **Enter the Archive** button
4. After tap → Home landing

## Screenshot checklist

See [SCREENSHOTS_CHECKLIST.md](./SCREENSHOTS_CHECKLIST.md).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `adb: command not found` | Export `ANDROID_HOME` and `platform-tools` on PATH |
| `emulator-5554 offline` | Cold boot AVD; `adb kill-server && adb start-server` |
| Metro not connecting | `adb reverse tcp:8081 tcp:8081` then reload |
| Port 8081 in use | `npx expo start -c` or kill the other Metro process |
| Reanimated / worklets crash | Ensure `babel.config.js` has `react-native-reanimated/plugin` **last**; rebuild with `npx expo run:android` |
| Fonts missing | Wait for splash hide after `useFonts`; check network for Google Fonts packages (bundled via npm) |
| Gradle build fails | Open `android/` in Android Studio once to install SDK packages; accept licenses: `sdkmanager --licenses` |

## Commands cheat sheet

```bash
npx expo start          # Metro bundler
npx expo start -c       # Clear Metro cache
npx expo run:android    # Native build + install + launch
adb devices             # List emulators / devices
adb reverse tcp:8081 tcp:8081
adb logcat *:S ReactNative:V ReactNativeJS:V
```
