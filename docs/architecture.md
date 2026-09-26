# Frontend Architecture

The client is organized by application infrastructure, product feature, and shared UI ownership.

```text
client/src/
  app/
    App.tsx                 # application composition
    auth/                   # app-level authentication URL/config helpers
    errors/                 # application error boundary
    providers/              # global context/provider composition
    routing/                # route table
  features/
    auth/pages/              # sign-in, registration, onboarding
    cart/pages/              # cart
    catalog/
      pages/                 # course browsing and details
      components/            # catalog-owned cards and curriculum UI
    checkout/pages/          # checkout flow
    instructor-dashboard/   # instructor area
    learning/
      pages/                 # student lesson experience
      components/            # player, quiz, attachments
    marketing/pages/         # home, product guide, not-found
    profile/pages/           # learner profile
    student-dashboard/      # learner portal
  components/
    common/                  # reusable product-level components
    integrations/            # external platform integrations
    layout/                  # shared site and portal layouts
    ui/                      # Radix/shadcn primitives; keep upstream-style APIs
  contexts/                  # application state contexts
  hooks/                     # reusable hooks and context accessors
  lib/                       # mock domain data and pure helpers
  types/                     # shared TypeScript contracts
  index.css                  # global design tokens and styles
  main.tsx                   # browser bootstrap
```

## Dependency Rules

- `main.tsx` only mounts the app and global stylesheet.
- `app` may compose providers and import feature route components; feature code must not import from `app`.
- A feature owns its pages and domain-specific components. Cross-feature reusable UI belongs in `components/common` or `components/layout`.
- `components/ui` is the shared primitive layer. It should not import feature code.
- `contexts`, `hooks`, `lib`, and `types` contain cross-feature state, reusable behavior, data/helpers, and contracts respectively.
- Keep route definitions in `app/routing/AppRouter.tsx`; do not register routes from feature components.
- Use the existing `@/` alias for imports rooted at `client/src` and `@shared/` for server/client shared code.

## Adding a Feature

1. Add a folder under `features/<feature-name>/`.
2. Keep route-level screens in `pages/` and feature-only UI in `components/`.
3. Put reusable, feature-independent UI in `components/common` or `components/layout`.
4. Register the route in `app/routing/AppRouter.tsx`.
5. Add or update tests for the feature's domain behavior and route workflow.
