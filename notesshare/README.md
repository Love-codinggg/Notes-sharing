# NotesShare setup

The notes marketplace and sign-in pages continue to use Firebase. The request
form now uses Supabase directly and does not require a NotesShare account.

## Set up the request form

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase/schema.sql`. It creates the
   `public.note_requests` table with an anonymous insert-only policy. Public
   clients cannot read, update, or delete submitted requests.
3. In `supabase-config.js`, replace the project URL and anon/publishable key
   with the values from **Project Settings → API**. Use only a public key;
   never put a `service_role` or secret key in browser code.
4. Serve the folder over HTTP. For example, from the repository root:

   ```sh
   python -m http.server 8000
   ```

   Open `http://localhost:8000/notesshare/`. Opening pages with `file://`
   prevents the JavaScript module imports from working.

Submitted requests appear in the Supabase Dashboard under **Table Editor →
note_requests**. The public form displays an on-page confirmation only; it
does not send email. Anonymous submissions are acceptable for a private,
controlled classroom demo using test data. Do not expose the form publicly
until you add CAPTCHA or server-side rate limiting and decide how to handle
the personal information collected.

If Supabase rejects a submission, the form displays the database error code and
common fixes. `42501` usually indicates a missing insert grant or RLS policy;
`42P01`/`PGRST205` usually means the table is missing; `23514` indicates a
field constraint failed.

## Firebase pages

Sign-in and notes uploads/listings still use the Firebase project configured
in `firebase.js`. Enable Email/Password and Google under **Authentication →
Sign-in method**, create Firestore and Storage, and deploy their rules from
this folder:

```sh
firebase login
firebase deploy --only firestore:rules,storage --project logun-7ae48
```

The home page displays clearly marked sample notes if the live notes collection
is empty or unavailable. Paid checkout is not enabled; completing sales safely
requires a trusted payment backend.

## Prototype deployment

For a classroom presentation, serve this folder over HTTP or use a private
static host and test data. `firebase.json` deploys Firestore and Storage rules
only; it does not configure website hosting. Choose and configure a static
hosting provider separately before deploying the pages. Do not describe the
prototype as ready for public production until Firebase access is verified,
public-form abuse controls are added, and checkout is either implemented
securely or kept disabled.
