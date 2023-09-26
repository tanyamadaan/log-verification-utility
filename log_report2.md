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

- Message Id cannot be same for different sets of APIs (/confirm and /update)

**/confirm**

- billing/created_at and updated_at mismatches in /billing in /init and /confirm
- linked order total price in /confirm does not match the price in @ondc/org/payload_details in /search

**/update**

- what is the purpose of the /update call as order marked ready_to_ship = yes in /confirm

## Flow 1

**/on_status**

- Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - Order-delivered

## Flow 2

**/on_status**

- context/timestamp should be in RFC 3339 UTC time format for fulfillment state -Pending
- tracking must be boolean for fulfillment type RTO
- RTO Pickup (fulfillments/start/time/timestamp) time is missing for fulfillment state - RTO-Initiated

## Flow 1

**/search**

- Holiday date '2023-09-14' should not be past dated

India Post

## Flow 1 

- context/timestamp of all /on_action APIs should be in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format
- all fields are mandatory unless marked optional in the API contract

**/on_search**

- fulfillment type of RTO should be provided along with the quote in /items
- Delivery TAT for Standard Delivery should be reduced (/categories/time/duration)

**/on_init**

- provider_location to be provided in case returned in /on_search

**/on_confirm**

- /on_confirm/message/order/billing/tax_number mismatches in /billing in /confirm and /on_confirm
- /on_confirm/message/order/billing/created_at mismatches in /billing in /confirm and /on_confirm
- /on_confirm/message/order/billing/updated_at mismatches in /billing in /confirm and /on_confirm
- /on_confirm/message/order/created_at mismatches in /confirm and /on_confirm
- /on_confirm/message/order/updated_at does not match context/timestamp 


**/on_status**

- /on_status/message/order/provider/id mismatches between /init and /on_status
- /on_status/message/order/items must have required property 'category_id'
- /on_status/message/order/items must have required property 'descriptor'
- /on_status/message/order/items/id must be equal to constant (Standard Delivery)
- /on_status/message/order/payment must have required property 'type'
- /on_status/message/order/payment must have required property 'collected_by'
- /on_status/message/order/billing must have required property 'address'
- /on_status/message/order/billing/tax_number mismatches in /billing in /confirm and /on_status
- /on_status/message/order/billing/created_at mismatches in /billing in /confirm and /on_status
- /on_status/message/order/billing/updated_at mismatches in /billing in /confirm and /on_status
- RTO charges to be added in quote/breakup only in case RTO is initiated
- eway bill details should only be provided for orders with amount>50k
- fulfillments/state/updated_at is an invalid attribute
- fulfillments/id,rating,provider_id are not required 
- how is order picked up as the fulfillment is not marked ready_to_ship in fulfillments/tags in /confirm or /update
- Pickup timestamp (fulfillments/start/time/timestamp) is required for fulfillment state - Order-picked-up
- Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - Out-for-delivery
- Pickup timestamp (fulfillments/start/time/timestamp) is missing for fulfillment state - Order-delivered
- Delivery timestamp (fulfillments/end/time/timestamp) is required for fulfillment state - Order-delivered
- fulfillments/start and end are missing

## Flow 2

- similar issues as above
- cancellation flow triggering RTO needs to be implemented

Oogashop
## Flow 1 and 2

- Message Id cannot be same for different sets of APIs

**/search**

- fulfillment/end/location/gps cannot be equal to start/location/gps '\"12.910816, 77.546946\" (how is buyer app handling this)
- context/timestamp difference between on_search and search should be smaller than 1 sec (LSP with lower callback response time should be procured for optimized cascaded flow)

**/init**

- invalid value of tax_number provided in /billing
- start and end location and contact details should not be same

**/confirm**

- values of PCC and DCC should be appropriate 
- weight of individual item is not in sync with the entire order weight in /@ondc/org/linked_order
- additional_desc is not required in start and end/instructions in fulfillments (in /update as well)
- payment/@ondc/org/collection_amount is required for payment/type 'ON-FULFILLMENT'

### Kindly test with a verified NP in Pre-prod environment












