import { useUidbData } from "@hooks/useUidbData";
import { DeviceHeader } from "../common/DeviceHeader";
import { DeviceAttributes } from "./DeviceAttributes";
// import { DeviceImages } from "@components/device/DeviceImages";
import { DeviceAliases } from "./DeviceAliases";
import { RawJsonViewer } from "@components/ui/RawJsonViewer";
import type { NormalizedDevice } from "types/uidb";

interface DeviceDetailsProps {
  deviceId: string;
  onClose: () => void;
}

export function DeviceDetails({ deviceId, onClose }: DeviceDetailsProps) {
  const { devices } = useUidbData();
  const device = devices.find((d: NormalizedDevice) => d.id === deviceId);

  if (!device) {
    return null; // Or a loading/error state
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <DeviceHeader title={device.displayName} onClose={onClose} />

        <div className="flex-1 overflow-y-auto">
          {/* <DeviceImages device={device} /> */}

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <DeviceAttributes device={device} />
              </div>
              <div>
                <DeviceAliases aliases={device.shortnames || []} />
                <RawJsonViewer data={device} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
