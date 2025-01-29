import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.DUMMY_API_KEY,
        'X-Goog-fieldMask': [
            'place.photos',
            'place.displayName',
            'place.id',
        ],
    },
};

export const GetPlaceDetails = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching place details:', error);
        throw error; // Re-throw the error so the calling function can handle it
    }
};
