export {};

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      options: {
        dataUrl: string;
        frameworkUrl: string;
        codeUrl: string;
        streamingAssetsUrl: string;
        companyName: string;
        productName: string;
        productVersion: string;
        matchWebGLToCanvasSize?: boolean;
        devicePixelRatio?: number;
      }
    ) => Promise<unknown>;
  }
}
