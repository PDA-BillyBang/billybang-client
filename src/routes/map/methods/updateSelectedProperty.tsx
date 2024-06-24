import { OverlayData, PropertyGroup } from "@/utils/types";
import { MutableRefObject } from "react";
import Pin from "@/components/map/Pin";

export const updateSelectedProperty = (
  selectedPropertyId: number | null,
  previousSelectedPropertyIdRef: MutableRefObject<number | null>,
  overlayRef: MutableRefObject<{ [key: number]: OverlayData }>,
  properties: PropertyGroup[],
  setSelectedPropertyId: (id: number) => void
) => {
  if (selectedPropertyId === null) return;

  const previousSelectedPropertyId = previousSelectedPropertyIdRef.current;
  let previousSelectedProperty: PropertyGroup | undefined;
  let currentSelectedProperty: PropertyGroup| undefined;

  for (const property of properties) {
    if (property.representativeId === previousSelectedPropertyId) {
      previousSelectedProperty = property;
    }
    if (property.representativeId === selectedPropertyId) {
      currentSelectedProperty = property;
    }
    if (previousSelectedProperty && currentSelectedProperty) {
      break;
    }
  }

  if (previousSelectedPropertyId !== null && previousSelectedProperty) {
    const { root } = overlayRef.current[previousSelectedPropertyId];
    root.render(
      <Pin
        area={previousSelectedProperty.area}
        price={previousSelectedProperty.price}
        count={previousSelectedProperty.cnt}
        propertyId={previousSelectedPropertyId}
        handleClick={(id: number) => {
          setSelectedPropertyId(id);
        }}
        isSelected={false}
      />,
    );
  }

  if (currentSelectedProperty) {
    const { root } = overlayRef.current[selectedPropertyId];
    root.render(
      <Pin
        area={currentSelectedProperty.area}
        price={currentSelectedProperty.price}
        count={currentSelectedProperty.cnt}
        propertyId={selectedPropertyId}
        handleClick={(id: number) => {
          setSelectedPropertyId(id);
        }}
        isSelected={true}
      />,
    );
  }

  previousSelectedPropertyIdRef.current = selectedPropertyId;
};
