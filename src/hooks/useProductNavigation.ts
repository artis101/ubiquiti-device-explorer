import { useMemo } from "react";
import { useUidbData } from "./useUidbData";
import { useUrlState } from "./useUrlState";

export function useProductNavigation() {
  const { filteredDevices } = useUidbData();
  const { selectedDeviceId } = useUrlState();

  const { previousProductId, nextProductId } = useMemo(() => {
    if (!selectedDeviceId) {
      return { previousProductId: undefined, nextProductId: undefined };
    }

    const currentIndex = filteredDevices.findIndex(
      (device) => device.id === selectedDeviceId,
    );

    if (currentIndex === -1) {
      return { previousProductId: undefined, nextProductId: undefined };
    }

    const previousProductId =
      currentIndex > 0 ? filteredDevices[currentIndex - 1].id : undefined;

    const nextProductId =
      currentIndex < filteredDevices.length - 1
        ? filteredDevices[currentIndex + 1].id
        : undefined;

    return { previousProductId, nextProductId };
  }, [selectedDeviceId, filteredDevices]);

  return {
    previousProductId,
    nextProductId,
    hasPrevious: previousProductId !== undefined,
    hasNext: nextProductId !== undefined,
  };
}
