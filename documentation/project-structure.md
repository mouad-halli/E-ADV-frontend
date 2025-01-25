# Architecture

## Project Structure

- `.env`: Environment variables.
- `.gitignore`: Git ignore file.
- `app/`: Main application directory.
- `assets/`: Assets such as fonts and images.
- `components/`: Reusable components.
- `constants/`: Constant values used in the project.
- `contexts/`: Context providers.
- `hooks/`: Custom hooks.
- `scripts/`: Utility scripts.
- `services/`: Service files.
- `styles/`: Styling files.
- `types/`: TypeScript type definitions.
- `package.json`: Project configuration and dependencies.
- `tsconfig.json`: TypeScript configuration.

## Extended Project Structure
```bash
└── adv-frontend/
    ├── README.md
    ├── app.json
    ├── babel.config.js
    ├── eas.json
    ├── global.css
    ├── metro.config.js
    ├── nativewind-env.d.ts
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── app/
    │   ├── _layout.tsx
    │   ├── (auth)/
    │   │   ├── _layout.tsx
    │   │   └── login.tsx
    │   └── (main)/
    │       └── (tabs)/
    │           ├── Appointments.tsx
    │           ├── _layout.tsx
    │           ├── index.tsx
    │           └── products/
    │               ├── [productId].tsx
    │               ├── _layout.tsx
    │               └── index.tsx
    ├── assets/
    │   ├── fonts/
    │   │   └── Roboto/
    │   │       ├── Roboto-Bold.ttf
    │   │       ├── Roboto-Medium.ttf
    │   │       └── Roboto-Regular.ttf
    │   └── images/
    ├── components/
    │   ├── AuthGuard.tsx
    │   ├── LoadingScreen.tsx
    │   ├── Navbar.tsx
    │   ├── NotAuthGuard.tsx
    │   ├── Appointments/
    │   │   ├── AppDataTable.tsx
    │   │   ├── DateRangePickerModal.tsx
    │   │   ├── ListSelectorModal.tsx
    │   │   └── useDataTable.tsx
    │   ├── LoginForm/
    │   │   ├── LoginForm.tsx
    │   │   └── useLoginForm.tsx
    │   ├── Products/
    │   │   ├── ProductsItem.tsx
    │   │   └── ProductsList.tsx
    │   ├── presentation/
    │   │   ├── Comments.tsx
    │   │   ├── useProductPresentation.tsx
    │   │   └── SlidesPlayer/
    │   │       ├── FeedbackRating.tsx
    │   │       ├── SlidesPlayer.tsx
    │   │       └── useSlideTimeTracker.tsx
    │   └── ui/
    │       ├── buttons/
    │       │   ├── AnnulerButton.tsx
    │       │   └── ValiderButton.tsx
    │       ├── icons/
    │       │   ├── AnnulerIcon.tsx
    │       │   ├── BadFaceIcon.tsx
    │       │   ├── CalendarIcon.tsx
    │       │   ├── Checkmark.tsx
    │       │   ├── ConfirmerIcon.tsx
    │       │   ├── GoodFaceIcon.tsx
    │       │   ├── HideCommentsIcon.tsx
    │       │   ├── LocationIcons.tsx
    │       │   ├── Logo.tsx
    │       │   ├── MicrosoftIcon.tsx
    │       │   ├── NeutralFaceIcon.tsx
    │       │   ├── NextArrowIcon.tsx
    │       │   ├── PauseIcon.tsx
    │       │   ├── PlayIcon.tsx
    │       │   ├── PreviousArrowIcon.tsx
    │       │   ├── ProfileIcon.tsx
    │       │   ├── ReplayIcon.tsx
    │       │   ├── SearchIcon.tsx
    │       │   ├── SettingIcon.tsx
    │       │   ├── ShowCommentsIcon.tsx
    │       │   └── WhiteCheckMark.tsx
    │       └── modals/
    │           └── ActionModal.tsx
    ├── constants/
    │   ├── Colors.ts
    │   └── FeedbackSlides.ts
    ├── contexts/
    │   ├── appContext.tsx
    │   └── userContext.tsx
    ├── documentation/
    │   ├── configuration.md
    │   ├── installation.md
    │   ├── project-structure.md
    │   ├── scripts.md
    │   └── usage.md
    ├── hooks/
    │   └── useTogglePasswordVisibility.tsx
    ├── scripts/
    │   └── reset-project.js
    ├── services/
    │   ├── SlidesInteractionTracker.ts
    │   ├── Api/
    │   │   ├── API.ts
    │   │   ├── ExternalAPI.ts
    │   │   ├── appointment.ts
    │   │   ├── authentication.ts
    │   │   ├── productPresentation.ts
    │   │   └── user.ts
    │   └── auth/
    │       ├── authConfig.ts
    │       └── authService.ts
    ├── styles/
    │   ├── colors.ts
    │   └── globalStyles.ts
    └── types/
        ├── appointment.ts
        ├── location.ts
        ├── productPresentation.ts
        ├── productSlide.ts
        └── user.ts

```
