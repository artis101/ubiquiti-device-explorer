import { describe, it, expect } from 'vitest';
import { normalizeDevices, parseUidbResponse, buildImageUrl, getProductLines } from '@utils/uidb';
import type { Device, NormalizedDevice } from '@types/uidb';

describe('UIDB Utilities', () => {
  describe('parseUidbResponse', () => {
    it('should parse a valid UIDB response', () => {
      const mockData = {
        devices: [
          { id: 'd1', product: { name: 'Device 1' }, images: { default: 'img1' } },
          { id: 'd2', product: { name: 'Device 2' }, images: { default: 'img2' } },
        ],
      };
      const result = parseUidbResponse(mockData);
      expect(result.devices.length).toBe(2);
      expect(result.warnings.length).toBe(0);
      expect(result.error).toBeUndefined();
    });

    it('should return an error for invalid top-level data structure', () => {
      const mockData = { notDevices: [] };
      const result = parseUidbResponse(mockData);
      expect(result.devices.length).toBe(0);
      expect(result.warnings.length).toBe(0);
      expect(result.error).toBeDefined();
    });

    it('should return an error if devices array contains invalid device objects', () => {
      const mockData = {
        devices: [
          { id: 'd1', product: { name: 'Device 1' }, images: { default: 'img1' } },
          null, // Zod will reject this
          { id: 'd2', product: { name: 'Device 2' }, images: { default: 'img2' } },
          undefined, // Zod will reject this
          {}, // Zod will reject this (missing id)
          { product: { name: 'Device 3' } }, // Zod will reject this (missing id)
        ],
      };
      const result = parseUidbResponse(mockData);
      expect(result.devices.length).toBe(0); // Zod will reject the whole array if it contains invalid items
      expect(result.warnings.length).toBe(0);
      expect(result.error).toBeDefined();
    });
  });

  describe('normalizeDevices', () => {
    it('should normalize valid devices and generate display names', () => {
      const devices: Device[] = [
        { id: 'd1', sku: 'SKU1', product: { name: 'Product 1' }, images: { default: 'img1' } },
        { id: 'd2', shortnames: ['Shortname 2'], images: { default: 'img2' } },
        { id: 'd3', sku: 'SKU3', images: { default: 'img3' } },
        { id: 'd4', images: { default: 'img4' } }, // Fallback to ID
      ];
      const { normalized, warnings } = normalizeDevices(devices);

      expect(normalized.length).toBe(4);
      expect(warnings.length).toBe(2); // d3 and d4 missing product name/shortnames
      expect(normalized[0].displayName).toBe('Product 1');
      expect(normalized[1].displayName).toBe('Shortname 2');
      expect(normalized[2].displayName).toBe('SKU3');
      expect(normalized[3].displayName).toBe('d4');
    });

    it('should collect warnings for invalid device objects and missing critical fields', () => {
      const devices: Device[] = [
        null as any, // Invalid type - will be filtered out by normalizeDevices
        undefined as any, // Invalid type - will be filtered out by normalizeDevices
        {}, // Missing ID - will be filtered out by normalizeDevices
        { id: 'd1' }, // Missing product name/shortnames/sku - will generate warning
        { id: 'd2', product: { name: 'Device 2' }, images: {} }, // Missing image hashes - will generate warning
      ];
      const { normalized, warnings } = normalizeDevices(devices);

      expect(normalized.length).toBe(2); // d1 and d2 should be normalized
      expect(warnings.length).toBe(6); // Corrected expectation: 3 invalid objects + 1 missing product name + 1 missing image hashes + 1 missing images for d1
      expect(warnings[0].reason).toBe('Invalid device object');
      expect(warnings[1].reason).toBe('Invalid device object');
      expect(warnings[2].reason).toBe('Missing device ID');
      expect(warnings[3].reason).toBe('Missing product name and shortnames');
      expect(warnings[4].reason).toBe('Missing all image hashes'); // This is for d1
      expect(warnings[5].reason).toBe('Missing all image hashes'); // This is for d2
    });

    it('should collect warnings for duplicate IDs', () => {
      const devices: Device[] = [
        { id: 'd1', product: { name: 'Device 1' }, images: { default: 'img1' } },
        { id: 'd1', product: { name: 'Device 1 Duplicate' }, images: { default: 'img1' } },
      ];
      const { normalized, warnings } = normalizeDevices(devices);

      expect(normalized.length).toBe(1);
      expect(warnings.length).toBe(1);
      expect(warnings[0].reason).toBe('Duplicate device ID (first occurrence kept)');
    });

    it('should collect warnings for missing image hashes', () => {
      const devices: Device[] = [
        { id: 'd1', product: { name: 'Device 1' }, images: {} },
        { id: 'd2', product: { name: 'Device 2' } },
      ];
      const { normalized, warnings } = normalizeDevices(devices);

      expect(normalized.length).toBe(2);
      expect(warnings.length).toBe(2);
      expect(warnings[0].reason).toBe('Missing all image hashes');
      expect(warnings[1].reason).toBe('Missing all image hashes');
    });
  });

  describe('buildImageUrl', () => {
    const mockDevice: Device = {
      id: 'test-device',
      images: {
        default: 'default-hash',
        nopadding: 'nopadding-hash',
        topology: 'topology-hash',
        icon: 'icon-hash',
      },
    };

    it('should return undefined if device has no images', () => {
      const deviceWithoutImages: Device = { id: 'no-images' };
      expect(buildImageUrl(deviceWithoutImages)).toBeUndefined();
    });

    it('should prioritize default image', () => {
      const url = buildImageUrl(mockDevice);
      expect(url).toBeDefined();
      const decodedUrlPart = decodeURIComponent(url!.split('?u=')[1].split('&w=')[0]);
      expect(decodedUrlPart).toContain('/test-device/default/default-hash.png');
    });

    it('should fallback to nopadding if default is missing', () => {
      const device: Device = {
        ...mockDevice,
        images: { nopadding: 'nopadding-hash' },
      };
      const url = buildImageUrl(device);
      expect(url).toBeDefined();
      const decodedUrlPart = decodeURIComponent(url!.split('?u=')[1].split('&w=')[0]);
      expect(decodedUrlPart).toContain('/test-device/nopadding/nopadding-hash.png');
    });

    it('should fallback to topology if default and nopadding are missing', () => {
      const device: Device = {
        ...mockDevice,
        images: { topology: 'topology-hash' },
      };
      const url = buildImageUrl(device);
      expect(url).toBeDefined();
      const decodedUrlPart = decodeURIComponent(url!.split('?u=')[1].split('&w=')[0]);
      expect(decodedUrlPart).toContain('/test-device/topology/topology-hash.png');
    });

    it('should fallback to icon if default, nopadding, and topology are missing', () => {
      const device: Device = {
        ...mockDevice,
        images: { icon: 'icon-hash' },
      };
      const url = buildImageUrl(device);
      expect(url).toBeDefined();
      const decodedUrlPart = decodeURIComponent(url!.split('?u=')[1].split('&w=')[0]);
      expect(decodedUrlPart).toContain('/test-device/icon/icon-hash.png');
    });

    it('should include specified size in URL', () => {
      const url = buildImageUrl(mockDevice, 256);
      expect(url).toMatch(/&w=256/);
    });

    it('should return undefined if no image hashes are present', () => {
      const device: Device = { id: 'no-hashes', images: {} };
      expect(buildImageUrl(device)).toBeUndefined();
    });
  });

  describe('getProductLines', () => {
    it('should return unique product lines sorted by name', () => {
      const devices: NormalizedDevice[] = [
        { id: 'd1', displayName: 'd1', line: { id: 'unifi', name: 'UniFi' } },
        { id: 'd2', displayName: 'd2', line: { id: 'airmax', name: 'airMAX' } },
        { id: 'd3', displayName: 'd3', line: { id: 'unifi', name: 'UniFi' } },
        { id: 'd4', displayName: 'd4', line: { id: 'uisp', name: 'UISP' } },
        { id: 'd5', displayName: 'd5' }, // No line
      ];
      const productLines = getProductLines(devices);

      expect(productLines.length).toBe(3);
      expect(productLines[0]).toEqual({ id: 'airmax', name: 'airMAX' });
      expect(productLines[1]).toEqual({ id: 'uisp', name: 'UISP' }); // Corrected order
      expect(productLines[2]).toEqual({ id: 'unifi', name: 'UniFi' }); // Corrected order
    });

    it('should handle devices with missing line info gracefully', () => {
      const devices: NormalizedDevice[] = [
        { id: 'd1', displayName: 'd1', line: { id: 'unifi', name: 'UniFi' } },
        { id: 'd2', displayName: 'd2' },
      ];
      const productLines = getProductLines(devices);
      expect(productLines.length).toBe(1);
      expect(productLines[0]).toEqual({ id: 'unifi', name: 'UniFi' });
    });

    it('should use line id as name if name is missing', () => {
      const devices: NormalizedDevice[] = [
        { id: 'd1', displayName: 'd1', line: { id: 'unifi' } },
      ];
      const productLines = getProductLines(devices);
      expect(productLines.length).toBe(1);
      expect(productLines[0]).toEqual({ id: 'unifi', name: 'unifi' });
    });

    it('should return an empty array if no devices have line info', () => {
      const devices: NormalizedDevice[] = [
        { id: 'd1', displayName: 'd1' },
        { id: 'd2', displayName: 'd2' },
      ];
      const productLines = getProductLines(devices);
      expect(productLines.length).toBe(0);
    });
  });
});
