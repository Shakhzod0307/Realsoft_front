import { ref } from 'vue';
import axios from 'axios';

const images = ref([]);
const isImagesLoaded = ref(false);

const fetchImages = async () => {
    if (isImagesLoaded.value) return;
    try {
        const { data } = await axios.get('http://localhost:8000/api/get-images');
        images.value = data.data.data;
        isImagesLoaded.value = true;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

export const useImages = () => {
    return { images, fetchImages };
};
