import type { NormalizedDevice } from "@types/uidb";
import { CopyButton } from "@components/ui/CopyButton";

interface DeviceAttributesProps {
  device: NormalizedDevice;
}

export function DeviceAttributes({ device }: DeviceAttributesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Device Information
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">ID:</span>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              {device.id}
            </code>
            <CopyButton textToCopy={device.id} title="Copy ID" />
          </div>
        </div>

        {device.sku && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">SKU:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{device.sku}</span>
              <CopyButton textToCopy={device.sku} title="Copy SKU" />
            </div>
          </div>
        )}

        {device.line && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Product Line:
            </span>
            <span className="text-sm">
              {device.line.name || device.line.id}
            </span>
          </div>
        )}

        {device.triplets && device.triplets.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Triplets</h4>
            <div className="space-y-1">
              {device.triplets.map((triplet, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                  {triplet.k1 && <span className="mr-2">K1: {triplet.k1}</span>}
                  {triplet.k2 && <span className="mr-2">K2: {triplet.k2}</span>}
                  {triplet.k3 && <span>K3: {triplet.k3}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
