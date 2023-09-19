## Flow 1 and 2

**/on_search**

- motorable distance for the given start and end cordinates shows approx 1.5km, how is 3.5km calculated?

**/init**

- invalid tax_number in /billing by the buyer app, how is LSP handling this? (format validation needs to be in place, eg. 22AAAAA0000A1Z5)

**/on_status**

- why end time range changing (w.r.t /on_confirm) and breaching the TAT (S2D) provided in /on_search
- status is missing in payment object in /on_status for fulfillment states Agent-assigned,Order-picked-up,Out-for-delivery

## Flow 3

**/on_status(RTO-Delivered)**

- RTO Delivery timestamp (fulfillments/end/time/timestamp) is missing for fulfillment state - RTO-Delivered
- cancellation attribute is required in order, if order state is "Cancelled" 

**/on_cancel**

- quote price does not match up to the total of breakup prices
- in fulfillment tags - rto_event, rto_id will be fulfillment id of RTO fulfillment

**track**

- context/timestamp should be in RFC 3339 date-time format

## Flow 1

- the callback responses for every request are taking long; proper ttl should be configured for efficient cascaded flow

**/init**

- billing/address/building cannot be equal to locality
- why are billing details of the logistics buyer matching with the end buyer?
- settlement details are not required as the payment is collected by BAP post fulfillment

## Flow 2

- similar issues as above

**/on_update**

- Message ID for solicted /on_update should be same as /update: \"f71f285e-ce01-4a31-b47a-1a83187b822b\ 

## Flow 1 and 2

- null value attributes should be removed (AWB no /on_confirm and /on_status)
- context/timestamp difference between action and /on_action APIs should be within 1 sec (as it is a cascaded flow)










