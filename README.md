# Is it time to go and catch the bus yet?

Being a small utility to calculate when I should leave the house to catch the bus to the station

## How it works
- TypeScript / Express app running on port 3000
- `/journey/originStop/destinationStop´ calls the VBB API wrapper to retrieve journey details for those IDs
- `luxon` is used to
  - parse the returned departure/arrival timestamps
  - calculate if it's worth leaving (bus departure is more than 5 mins away)
- returns JSON

# Stops

Falkensee Bhf: 900210010
Finkenkrug Bhf: 900210011
Innsbrucker Str: 900210131
Kleistpark: 900054102
