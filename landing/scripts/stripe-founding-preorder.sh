#!/usr/bin/env bash
# Creates the Kilig founding pre-order Payment Link (D5 diaspora rail).
# Product + $9.99 one-time price + payment link, per
# docs/designs/founding-preorder-preregistration.md.
#
# Usage:
#   STRIPE_SECRET_KEY=sk_test_... bash landing/scripts/stripe-founding-preorder.sh
# Run once with the test key (pay with card 4242 4242 4242 4242, then refund
# it from the dashboard to test the refund path), then again with the live
# key. Never hardcode the key here — the repo is not a secrets store.
set -euo pipefail

: "${STRIPE_SECRET_KEY:?Set STRIPE_SECRET_KEY (sk_test_... or sk_live_...)}"

api() {
  local path="$1"; shift
  curl -sS "https://api.stripe.com/v1/$path" -u "$STRIPE_SECRET_KEY:" "$@"
}

json_get() { python3 -c "import json,sys; print(json.load(sys.stdin)['$1'])"; }

echo "→ Creating product…"
PRODUCT_ID=$(api products \
  -d "name=Kilig Founding Member" \
  -d "description=Refundable founding deposit. Locks the \$9.99/mo founding price for life and credits in full toward your first month at launch. Full refund any time before launch, no questions." \
  | json_get id)
echo "  product: $PRODUCT_ID"

echo "→ Creating \$9.99 one-time price…"
PRICE_ID=$(api prices \
  -d "unit_amount=999" \
  -d "currency=usd" \
  -d "product=$PRODUCT_ID" \
  | json_get id)
echo "  price: $PRICE_ID"

echo "→ Creating payment link…"
LINK_JSON=$(api payment_links \
  -d "line_items[0][price]=$PRICE_ID" \
  -d "line_items[0][quantity]=1" \
  -d "after_completion[type]=hosted_confirmation" \
  -d "after_completion[hosted_confirmation][custom_message]=Reserved! You're a Kilig founding member — \$9.99/mo locked in for life. This deposit becomes your first month at launch. Full refund before launch, no questions: just reply to any Kilig email. Salamat! 💖" \
  -d "custom_text[submit][message]=One-time refundable deposit. No subscription starts today — we email you before launch." \
  -d "metadata[cohort]=founding-preorder-2026-08" \
  -d "payment_intent_data[description]=Kilig founding deposit (refundable)")
LINK_URL=$(echo "$LINK_JSON" | json_get url)
LINK_ID=$(echo "$LINK_JSON" | json_get id)

echo
echo "✅ Payment link ready: $LINK_URL"
echo "   (id: $LINK_ID — email collection is on by default; payments visible"
echo "    in the Stripe dashboard, no webhook needed at this cohort size)"
echo
echo "Next: paste the URL into the diaspora pre-order email (send pack §EMAIL 2),"
echo "delete the warning line, send. Log payers in the ledger CSV."
