import { notFound } from 'next/navigation'

// Unmatched URLs under /en or /it land here so the localized not-found page
// renders inside the root layout.
export default function CatchAll() {
  notFound()
}
