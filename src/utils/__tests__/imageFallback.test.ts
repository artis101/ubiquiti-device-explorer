
import { describe, it, expect, vi } from 'vitest';
import {
  generateFallbackSvg,
  handleImageError,
} from '../imageFallback';

// Mock btoa and atob for the Node.js environment
global.btoa = (str: string) => Buffer.from(str).toString('base64');
global.atob = (b64: string) => Buffer.from(b64, 'base64').toString();

describe('imageFallback', () => {
  describe('generateFallbackSvg', () => {
    it('should generate a snapshot for an SVG with a deviceLineAbbrev', () => {
      const options = { deviceName: 'Test', deviceLineAbbrev: 'AB', size: 100 };
      const decodedSvg = atob(generateFallbackSvg(options).split(',')[1]);
      expect(decodedSvg).toMatchSnapshot();
    });

    it('should generate a snapshot for an SVG with a generated abbreviation', () => {
      const options = { deviceName: 'My Device', size: 120 };
      const decodedSvg = atob(generateFallbackSvg(options).split(',')[1]);
      expect(decodedSvg).toMatchSnapshot();
    });

    it('should generate a snapshot for an SVG with the default "UI" abbreviation', () => {
      const options = { deviceName: '', size: 140 };
      const decodedSvg = atob(generateFallbackSvg(options).split(',')[1]);
      expect(decodedSvg).toMatchSnapshot();
    });
  });

  describe('handleImageError', () => {
    it('should set the target src to a fallback SVG', () => {
      const target = { src: 'original.png' } as HTMLImageElement;
      const event = {
        target,
        currentTarget: target,
      } as unknown as React.SyntheticEvent<HTMLImageElement>;
      const options = { deviceName: 'Test', size: 50 };
      const fallbackSrc = generateFallbackSvg(options);

      handleImageError(event, options);

      expect(target.src).toBe(fallbackSrc);
    });

    it('should not change the src if it is already a fallback', () => {
      const fallbackSrc = 'data:image/svg+xml;base64,somefakesvg';
      const target = { src: fallbackSrc } as HTMLImageElement;
      const event = {
        target,
        currentTarget: target,
      } as unknown as React.SyntheticEvent<HTMLImageElement>;
      const options = { deviceName: 'Test', size: 50 };

      handleImageError(event, options);

      expect(target.src).toBe(fallbackSrc);
    });

    it('should hide the image if SVG generation fails', () => {
      const target = { src: 'original.png', style: { display: 'block' } } as HTMLImageElement;
      const event = {
        target,
        currentTarget: target,
      } as unknown as React.SyntheticEvent<HTMLImageElement>;
      // Trigger an internal error by passing invalid options
      const invalidOptions = { deviceName: '', size: -1 };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Mock btoa to throw an error
      global.btoa = () => { throw new Error('btoa failed'); };

      handleImageError(event, invalidOptions);

      expect(target.style.display).toBe('none');
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
      // Restore btoa
      global.btoa = (str: string) => Buffer.from(str).toString('base64');
    });
  });
});
