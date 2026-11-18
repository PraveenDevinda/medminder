# MedMinder

**Name:** Loku Geeganage Praveen Devinda  
**Student ID:** PS/2022/148 
**Course:** COSC 32152 Mobile Application Development - Assignment 01  
**Demo Video:** https://klnaclk-my.sharepoint.com/:v:/g/personal/devinda-ps22148_stu_kln_ac_lk/IQCUxNcEEBG3QZ45SEpZBHJLAdmYd4fqpEaK-QE_terEWYM?e=V0Drmd

## 1. What is this app?

MedMinder is a simple mobile application that provides general information about common over-the-counter medicines. It helps users browse medicines, understand their uses and precautions, save their frequently used medicines, and set reminders to take their medicines.

Users can search medicines by name and filter them by category. They can also create custom reminders by selecting a preferred time and choosing whether the reminder should repeat every day or happen only once on a selected date.

The application provides general information only and does not give dosage advice.

## 2. Screens (5)

| Screen | Purpose |
|---|---|
| Medicines (tab) | Browse medicines, search by name and filter by category using a Modal. |
| My Meds (tab) | Display medicines saved by the user using shared state. |
| Reminders (tab) | Display scheduled reminders, delete reminders and test notifications. |
| Medicine Detail (stack) | Display medicine information, uses, precautions and disclaimer. Users can save medicines and set reminders. |
| Set Reminder (stack) | Select a custom time and choose Every day or One time with a specific date. |

## 3. Core React Native Components and Features Used

| Component / Feature | Where it is used |
|---|---|
| View and Text | All screens |
| Image | MedicineCard.js and Medicine Detail screen |
| Pressable | Medicine cards, filter options and buttons |
| FlatList | Medicines, My Meds and Reminders screens |
| Modal | Category filtering in Medicines screen |
| ScrollView | Medicine Detail screen |
| TextInput | Medicine search |
| React Context and useState | Shared favourites and reminders |
| AppState | Detects when the app returns to the foreground |
| expo-notifications | Local notification scheduling |

## 4. Expo Router Structure

The application uses Expo Router for file-based navigation.

```text
MedMinder/
│
├── src/
│   └── app/
│       ├── _layout.js
│       │
│       ├── (tabs)/
│       │   ├── _layout.js
│       │   ├── index.js
│       │   ├── my-meds.js
│       │   └── reminders.js
│       │
│       └── medicine/
│           ├── _layout.js
│           ├── [id].js
│           └── add-reminder.js
│
├── components/
│   └── MedicineCard.js
│
├── constants/
│   └── theme.js
│
├── context/
│   └── MedsContext.js
│
├── data/
│   └── medicines.js
│
├── utils/
│   └── notifications.js
│
├── package.json
└── README.md
```

- `src/app/_layout.js` defines the root Stack and wraps the application with MedsProvider.
- `src/app/(tabs)/_layout.js` creates the bottom tab navigator with three tabs.
- `src/app/medicine/_layout.js` defines the nested Stack navigation.
- `src/app/medicine/[id].js` is a dynamic route that displays details of a selected medicine.
- `src/app/medicine/add-reminder.js` allows users to create custom medicine reminders.
- `router.back()` returns the user to the previous screen.

## 5. State Management

React Context API and the `useState` hook are used for shared state management in `context/MedsContext.js`.

The context stores the user's favourite medicines and scheduled reminders. This allows different screens to access and update the same information without passing data through multiple components.

## 6. AppState

An AppState change listener is implemented in `context/MedsContext.js`.

It detects when the application moves between the background and foreground. When the user returns to the application, a "Welcome back" message is displayed.

## 7. Local Notifications

The `expo-notifications` package is used to implement local notifications.

The implementation includes:

- A notification handler to control how notifications appear while the app is in the foreground.
- A permission request to allow the application to send notifications.
- An instant notification for testing.
- A time-interval notification for the 10-second demonstration.
- A daily notification that repeats at the selected time.
- A date-based notification that occurs once at the selected date and time.
- A function to cancel scheduled notifications.

The notification scheduling functions are implemented in `utils/notifications.js`.

I installed the package using `npx expo install expo-notifications` and followed the Expo documentation to implement notification scheduling.

During testing, Android notification channel setup caused a runtime error in Expo Go. Therefore, the explicit channel setup was temporarily disabled while testing the notification functionality.

## 8. Custom Medicine Reminders

The Set Reminder screen allows users to:

1. Select a custom reminder time using a time picker.
2. Choose **Every day** to receive a repeating daily notification.
3. Choose **One time** to select a specific date and time for a single notification.
4. Save the reminder and view it in the Reminders screen.

Users can also delete scheduled reminders.

## 9. Run Locally

Clone the GitHub repository:

```bash
git clone https://github.com/YOUR_USERNAME/medminder.git
```

Navigate to the project folder:

```bash
cd medminder
```

Install the dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Scan the QR code using the Expo Go application on an Android phone. Make sure the computer and phone are connected to the same Wi-Fi network.

## 10. Technologies Used

- React Native
- Expo
- Expo Router
- JavaScript
- React Context API
- Expo Notifications
- React Native DateTimePicker
- Git and GitHub
