import { useRef, useEffect } from 'react';
import { Character } from './Character';
import { GameSettings } from './GameSettings';
import { InputHandler } from './InputHandler';
import { Sprite } from './Sprite';
import { TileMap } from './TileMap';
import { Camera } from './Camera';
import backgroundSrc from '@/game/game-assets/background.png';
import mapJson from '@/game/game-assets/tileMap.json';

const GameCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const inputHandlerRef = useRef<InputHandler | null>(null);
    const mainCharacterRef = useRef<Character | null>(null);
    const backgroundRef = useRef<Sprite | null>(null);
    const tileMapRef = useRef<TileMap | null>(null);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        tileMapRef.current = new TileMap(mapJson);
        backgroundRef.current = new Sprite(0, 0, backgroundSrc);
        mainCharacterRef.current = new Character(30, 350, 40, 80, 'red', tileMapRef.current);
        inputHandlerRef.current = new InputHandler(mainCharacterRef);
        cameraRef.current = new Camera(GameSettings.canvasWidth, GameSettings.canvasHeight, tileMapRef.current.mapData.width * tileMapRef.current.tileWidth, tileMapRef.current.mapData.height * tileMapRef.current.tileHeight);

        inputHandlerRef.current.attachEvents();
        animationRef.current = requestAnimationFrame(draw);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            inputHandlerRef.current?.detachEvents();
        };
    }, []);

    const draw = () => {
        const canvas = canvasRef.current;
        const background = backgroundRef.current;
        const tileMap = tileMapRef.current;
        const camera = cameraRef.current;
        const mainCharacter = mainCharacterRef.current;

        if (canvas && background && mainCharacter && tileMap && camera) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, GameSettings.canvasWidth, GameSettings.canvasHeight);

                // Mise à jour de la caméra basée sur la position du personnage
                camera.update(mainCharacter.position.x + mainCharacter.size.width / 2, mainCharacter.position.y + mainCharacter.size.height / 2);

                // Appliquer la transformation de la caméra
                ctx.save();
                const { translateX, translateY } = camera.getTranslateValues();
                ctx.translate(translateX, translateY);

                if (background.loaded) {
                    background.draw(ctx);
                }

                tileMap.draw(ctx, 'Ground Layer');
                tileMap.draw(ctx, 'Platform Layer');
                inputHandlerRef.current?.update();
                mainCharacter.update();
                mainCharacter.draw(ctx);

                // Restaurer le contexte pour d'autres dessins hors caméra si nécessaire
                ctx.restore();
            }
        }
        animationRef.current = requestAnimationFrame(draw);
    };

    return <canvas ref={canvasRef} width={GameSettings.canvasWidth} height={GameSettings.canvasHeight} />;
};

export default GameCanvas;
