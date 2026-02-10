"use client";

import { useCallback, useEffect, useState } from "react";
import type { LocationPermission } from "@/src/types/lightning";

interface UseLightningLocationResult {
  permission: LocationPermission;
  requestPermission: () => void;
}

export function useLightningLocation(): UseLightningLocationResult {
  const [permission, setPermission] = useState<LocationPermission>("unknown");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    if (!("geolocation" in navigator)) {
      setPermission("denied");
      return;
    }

    if (!navigator.permissions?.query) return;

    void navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (status.state === "granted") setPermission("granted");
        if (status.state === "denied") setPermission("denied");
      })
      .catch(() => {});
  }, []);

  const requestPermission = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setPermission("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setPermission("granted");
      },
      () => {
        setPermission("denied");
      }
    );
  }, []);

  return { permission, requestPermission };
}