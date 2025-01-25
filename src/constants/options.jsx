

export const SelecetTravelOptions = [
    {
        id: 1,
        title: 'Just me',
        desc: 'I am travelling solo',
        icon: '🕺',
        people: '1'
    },
    {
        id: 2,
        title: 'Me and my partner',
        desc: 'I am travelling with my partner',
        icon: '👫',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'I am travelling with my family',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'I am travelling with thrill seekers',
        icon: '👨‍👩‍👧‍👦',
        people: '6+'
    }
]


export const selectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'I am on a tight budget',
        icon: '💰',
    
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'I have a moderate budget',
        icon: '💰💰',
    
    },
    {
        id: 3,
        title: 'Expensive',
        desc: 'I have a high budget',
        icon: '💰💰💰',
    }
]

export const AI_PROMPT = `
Generate a detailed travel plan for location: {location} for {days} days for {people} with a {budget} budget. 
The response should include:
1. A list of hotel options with the following details:
   - Hotel Name
   - Address
   - Price
   - Image URL
   - Geo-coordinates
   - Rating
   - Description
2. A suggested itinerary for each day that includes:
   - Place Name
   - Place Details
   - Place Image URL
   - Geo-coordinates
   - Ticket Pricing
   - Rating
   - Time Travel (to the location)
   - Best Time to Visit
Structure the response in JSON format.
`
