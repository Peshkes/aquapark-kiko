// @ts-ignore
import testImage from "assets/card-headers/testheader.webp";

export class CardHeaderGenerator {
    private static imageArray: string[] = [
        testImage
    ];
    public static  getHeaders(count: number): string[] {
        const uniqueImages = Array.from(this.imageArray);
        const result: string[] = [];

        for (let i = 0; i < count; i++) {
            if (uniqueImages.length === 0) {
                uniqueImages.push(...(this.imageArray));
            }
            const randomIndex = Math.floor(Math.random() * uniqueImages.length);
            const randomImage = uniqueImages.splice(randomIndex, 1)[0];

            result.push(randomImage);
        }
        return result;
    }
}
