// src/routes/map/updateSelectedProperty.ts

import { Property, OverlayData } from "@/utils/types";
import { MutableRefObject } from "react";
import Pin from "@/components/map/Pin";

export const updateSelectedProperty = (
  selectedPropertyId: number | null,
  previousSelectedPropertyIdRef: MutableRefObject<number | null>,
  overlayRef: MutableRefObject<{ [key: number]: OverlayData }>,
  properties: Property[],
  setSelectedPropertyId: (id: number) => void
) => {
  if (selectedPropertyId === null) return;

  const previousSelectedPropertyId = previousSelectedPropertyIdRef.current;
  let previousSelectedProperty: Property | undefined;
  let currentSelectedProperty: Property | undefined;

  for (const property of properties) {
    if (property.propertyId === previousSelectedPropertyId) {
      previousSelectedProperty = property;
    }
    if (property.propertyId === selectedPropertyId) {
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
        area={previousSelectedProperty.area1}
        price={previousSelectedProperty.price}
        count={previousSelectedProperty.count}
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
        area={currentSelectedProperty.area1}
        price={currentSelectedProperty.price}
        count={currentSelectedProperty.count}
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
