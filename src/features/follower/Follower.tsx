import React, {useEffect, useRef} from 'react';
import styles from './Follower.module.css';
import followImageSrc from 'assets/fishes/bot/mosterfish.webp';

interface FollowImageProps {
    containerRef: React.RefObject<HTMLDivElement>;
}

const Follower: React.FC<FollowImageProps> = ({containerRef}) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRenderRef= useRef<boolean>(true);
    const secondsWithoutMovementRef = useRef<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const image = imageRef.current;
        const container = containerRef.current;

        if (!image || !container) return;

        const imageWidth = image.clientWidth;
        const imageHeight = image.clientHeight;

        const offset = 40;

        image.style.top = '150px';

        const handleMouseMove = (event: MouseEvent) => {
            if(intervalIdRef.current) clearInterval(intervalIdRef.current);

            const containerRect = container.getBoundingClientRect();

            image.style.transition = 'top 1s ease-in-out, left 1s ease-in-out, transform 0.5s ease-in-out';

            const containerTop = containerRect.top;
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            secondsWithoutMovementRef.current = 0;

            const lastX = parseInt(image.style.left || '0', 10);
            const lastY = parseInt(image.style.top || '0', 10);

            let newX = mouseX - (imageWidth / 2);
            let newY = mouseY - containerTop - (imageHeight / 2);

            const fishDirectionX = newX > lastX ? 1 : -1;
            const rotation = calculateRotation(newX, newY, lastX, lastY, fishDirectionX);
            image.style.transform = `scaleX(${fishDirectionX}) rotate(${rotation}deg)`;

            if (newX < offset) newX = offset;
            if (newX > containerRect.width - offset - imageWidth) newX = containerRect.width - offset - imageWidth;
            if (newY < offset) newY = offset;
            if (newY > containerRect.height  - offset) newY = containerRect.height  - offset;

            image.style.left = newX + 'px';
            image.style.top = newY + 'px';
        };

        const staticAnimation = () => {

            if (intervalIdRef.current) clearInterval(intervalIdRef.current);

            image.style.transform = `scaleX(1) rotate(0)`;
            image.style.transition = 'top 1s ease-in-out, left 2s ease-in-out, transform 0.5s ease-in-out';
            const containerRight = container.getBoundingClientRect().right;
            const containerLeft = container.getBoundingClientRect().left;

            let moveRight = true; // Флаг для отслеживания направления движения

            intervalIdRef.current = setInterval(() => {
                if (moveRight) {
                    image.style.transform = `scaleX(1) rotate(0)`;
                    image.style.left = (containerRight - imageWidth - offset) + 'px';
                } else {
                    image.style.transform = `scaleX(-1) rotate(0)`;
                    image.style.left = (containerLeft + offset) + 'px';
                }

                moveRight = !moveRight; // Переключаем флаг направления
            }, 2200);

            return () => {
                if (intervalIdRef.current)  clearInterval(intervalIdRef.current);
            };
        };

        if (isFirstRenderRef.current){
            staticAnimation();
            isFirstRenderRef.current = false;
        }

        const handleMouseEnter = () => {
            document.addEventListener('mousemove', handleMouseMove);
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);

            secondsWithoutMovementRef.current = 0;
            timerRef.current = setInterval(() => {
                secondsWithoutMovementRef.current += 3;
                if (secondsWithoutMovementRef.current === 3) staticAnimation();
            }, 3000);
        };

        const handleMouseLeave = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            staticAnimation();
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null;
            }
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [containerRef]);

    const calculateRotation = (newX: number, newY: number, lastX: number, lastY: number, directionX: number): number => {
        let radians;
        if (directionX > 0)
            radians = Math.atan2(newY - lastY, newX - lastX);
        else
            radians = Math.atan2(newY - lastY, lastX - newX);
        return radians * (180 / Math.PI);
    };

    return (
        <img
            ref={imageRef}
            src={followImageSrc} // Использование импортированного изображения
            alt="Follow Image"
            className={styles.followImage} // Использование стилей
        />
    );
};

export default Follower;
