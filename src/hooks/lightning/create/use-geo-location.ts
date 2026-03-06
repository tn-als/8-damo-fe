"use client";

import { useCallback, useEffect, useState } from "react";

export type LocationPermission = "unknown" | "granted" | "denied";

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10_000,
      maximumAge: 300_000,
    });
  });
}

export function useGeolocation() {
  const [permission, setPermission] = useState<LocationPermission>("unknown");
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!("permissions" in navigator)) {
      setIsInitializing(false);
      return;
    }

    let permissionStatus: PermissionStatus;

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      permissionStatus = status;

      if (status.state === "granted") {
        setPermission("granted");
      } else if (status.state === "denied") {
        setPermission("denied");
      }

      setIsInitializing(false);

      status.onchange = () => {
        if (status.state === "granted") {
          setPermission("granted");
        } else if (status.state === "denied") {
          setPermission("denied");
        } else {
          setPermission("unknown");
        }
      };
    }).catch(() => {
      setIsInitializing(false);
    });

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, []);

  const requestLocation = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setPermission("denied");
      throw new Error("Geolocation not supported");
    }

    try {
      const pos = await getCurrentPosition();
      setPermission("granted");

      return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      };
    } catch (e) {
      setPermission("denied");
      throw e;
    }
  }, []);

  return {
    permission,
    isInitializing,
    requestLocation,
  };
}
