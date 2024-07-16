# LinguaBlitz

## Run the application

For Android:

- open Android Studio, go to more actions, click on Virtual Device Manager, choose Pixel 3a (click on `create device` if
  it not in the list yet) and press "a" (for Android)
  &rarr; this will automatically display your app when you run it from IntelliJ

Using your own Android device:

- download "expo go" from the play store onto the device
- run `npm run start:tunnel` which will create a QR code that a physical device can scan with the expo go app.
  The project will be loaded on that device.

## Development

- `npx depcheck` to check for unused dependencies

## Submissions to stores

Make sure, the eas cli is installed: `npm install -g eas-cli`

- [Prerequisites and setup](https://docs.expo.dev/build/setup/#prerequisites)
- [Submit to Play Store](https://docs.expo.dev/submit/android/)
- [Automate submissions](https://docs.expo.dev/build/automate-submissions/)

## Update target android SDK version with expo

- update with `npm i expo` to the latest or a suitable version
- update dependencies with `expo install --fix`
- in `app.json` update the `sdkVersion` property which defines the `expo` version
- build with `eas build -p android` which will based on the `sdkVersion` of expo target the correct android SDK version

## Troubleshooting

- press "r" to reload
- delete caches and `node_modules` and reinstall everything for a clean start
- if the loading spinner is always shown or freezes, it makes sense to wipe the data from the Device Manager and restart
  the simulator completely again which also install expo go again
