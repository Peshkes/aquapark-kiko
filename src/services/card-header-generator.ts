
const imageArray: string[] = [

];
export function getRandomImages(count: number): string[] {
    const uniqueImages = Array.from(imageArray);
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
        if (uniqueImages.length === 0) {
            uniqueImages.push(...imageArray);
        }
        const randomIndex = Math.floor(Math.random() * uniqueImages.length);
        const randomImage = uniqueImages.splice(randomIndex, 1)[0];

        result.push(randomImage);
    }
    return result;
}