export class GameSettings {
    static gravity: number = 0.75;
    static canvasWidth: number = 800;
    static canvasHeight: number = 600;

    static setCanvasSize(width: number, height: number) {
        GameSettings.canvasWidth = width;
        GameSettings.canvasHeight = height;
    }
}
