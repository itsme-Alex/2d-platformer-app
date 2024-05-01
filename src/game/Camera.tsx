export class Camera {
    x: number;
    y: number;
    viewWidth: number;
    viewHeight: number;
    mapWidth: number;
    mapHeight: number;

    constructor(viewWidth: number, viewHeight: number, mapWidth: number, mapHeight: number) {
        this.x = 0;
        this.y = 0;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    update(targetX: number, targetY: number) {
        const halfViewWidth = this.viewWidth / 2;
        const halfViewHeight = this.viewHeight / 2;

        // Calculer les décalages de caméra basés sur les dimensions de la carte et la position du personnage
        // Les valeurs pour y sont définies pour empêcher le personnage de sortir de l'écran en haut et en bas
        this.x = Math.max(0, Math.min(targetX - halfViewWidth, this.mapWidth - this.viewWidth));
        this.y = Math.min(Math.max(targetY - halfViewHeight, -250), halfViewHeight / 2);
    }

    getTranslateValues() {
        return {
            translateX: -this.x,
            translateY: -this.y
        };
    }
}
