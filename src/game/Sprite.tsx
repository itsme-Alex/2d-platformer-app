import { GameSettings } from "./GameSettings";

export class Sprite {
    position: { x: number, y: number };
    image: HTMLImageElement;
    loaded: boolean = false;

    constructor(x: number, y: number, imgSrc: string) {
        this.position = { x, y };
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.onerror = () => {
            console.error("Failed to load image at " + imgSrc);
        };
        this.image.src = imgSrc;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.loaded) return;
        // Calculer la nouvelle position Y pour que l'image soit alignée en bas
        let positionY = GameSettings.canvasHeight - this.image.height + 150;
        ctx.drawImage(this.image, this.position.x, positionY);
    }
}
