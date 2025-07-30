import type { NormalizedDevice } from "../types/uidb";
import { DeviceHeader } from "./DeviceHeader";
import { DeviceAttributes } from "./DeviceAttributes";
import { DeviceImages } from "./DeviceImages";
import { DeviceAliases } from "./DeviceAliases";
import { RawJsonViewer } from "./RawJsonViewer";

interface DeviceDetailsProps {
  device: NormalizedDevice;
  onClose: () => void;
}

export function DeviceDetails({ device, onClose }: DeviceDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DeviceHeader title={device.displayName} onClose={onClose} />

        <div className="flex flex-col lg:flex-row">
          <DeviceImages device={device} />

          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-4">
              <DeviceAttributes device={device} />
              <DeviceAliases shortnames={device.shortnames || []} />
              <RawJsonViewer data={device} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
