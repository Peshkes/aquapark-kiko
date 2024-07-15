// @ts-ignore
import testImage1 from "assets/card-headers/Artboard 1.webp";
import testImage2 from "assets/card-headers/Artboard 1_1.webp";
import testImage3 from "assets/card-headers/Artboard 1_2.webp";
import testImage4 from "assets/card-headers/Artboard 1_3.webp";
import testImage5 from "assets/card-headers/Artboard 1_4.webp";
import testImage6 from "assets/card-headers/Artboard 1_5.webp";
import testImage7 from "assets/card-headers/Artboard 1_6.webp";
import testImage8 from "assets/card-headers/Artboard 1_7.webp";


export class CardHeaderGenerator {
    private static imageArray: string[] = [
        testImage1,
        testImage2,
        testImage3,
        testImage4,
        testImage5,
        testImage6,
        testImage7,
        testImage8,
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
