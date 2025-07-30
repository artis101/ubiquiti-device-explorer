import { generateFallbackSvg, handleImageError } from '../imageFallback';

describe('imageFallback utilities', () => {
  describe('generateFallbackSvg', () => {
    it('should generate SVG with provided parameters', () => {
      const result = generateFallbackSvg({
        deviceName: 'Test Device',
        deviceLineAbbrev: 'TD',
        size: 100
      });

      expect(result).toContain('width="100"');
      expect(result).toContain('height="100"');
      expect(result).toContain('TD');
      expect(result).toContain('data:image/svg+xml;base64,');
    });

    it('should use device name abbreviation when deviceLineAbbrev is not provided', () => {
      const result = generateFallbackSvg({
        deviceName: 'Test Device',
        size: 100
      });

      expect(result).toContain('TE');
    });

    it('should use "UI" as fallback when neither deviceLineAbbrev nor deviceName is provided', () => {
      const result = generateFallbackSvg({
        deviceName: '',
        size: 100
      });

      expect(result).toContain('UI');
    });
  });

  describe('handleImageError', () => {
    let mockEvent: React.SyntheticEvent<HTMLImageElement>;
    let mockTarget: HTMLImageElement;

    beforeEach(() => {
      mockTarget = {
        src: 'original-image.jpg',
        startsWith: jest.fn((str) => mockTarget.src.startsWith(str))
      } as unknown as HTMLImageElement;

      mockEvent = {
        target: mockTarget
      } as React.SyntheticEvent<HTMLImageElement>;

      global.btoa = jest.fn((str) => Buffer.from(str).toString('base64'));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should set fallback image src on error', () => {
      const options = {
        deviceName: 'Test Device',
        deviceLineAbbrev: 'TD',
        size: 100
      };

      handleImageError(mockEvent, options);

      expect(mockTarget.src).toContain('data:image/svg+xml;base64,');
    });

    it('should not set fallback if already using fallback', () => {
      mockTarget.src = 'data:image/svg+xml;base64,test';
      
      const options = {
        deviceName: 'Test Device',
        size: 100
      };

      handleImageError(mockEvent, options);

      expect(mockTarget.src).toBe('data:image/svg+xml;base64,test');
    });

    it('should handle btoa errors gracefully', () => {
      global.btoa = jest.fn(() => {
        throw new Error('Encoding error');
      });
      
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const options = {
        deviceName: 'Test Device',
        size: 100
      };

      handleImageError(mockEvent, options);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to generate fallback image:',
        expect.any(Error)
      );
      expect(mockTarget.style.display).toBe('none');
      
      consoleSpy.mockRestore();
    });
  });
});