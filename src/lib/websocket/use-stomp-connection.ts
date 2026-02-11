"use client"

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient } from "./create-stomp-client";
import { useStableEvent } from "@/src/hooks/use-stable-event";

interface UseStompConnectionOptions {
  brokerURL: string | null;
  accessToken: string | null;
  reconnectDelay?: number;
  onConnect?: (client: Client) => void;
  onDisconnect?: () => void;
  onError?: (error: unknown) => void;
}

export function useStompConnection({
  brokerURL,
  accessToken,
  reconnectDelay = 5000,
  onConnect,
  onDisconnect,
  onError,
}: UseStompConnectionOptions) {

  const clientRef = useRef<Client | null>(null);

  const handlersRef = useRef({
    onConnect, 
    onDisconnect, 
    onError
  });

  useEffect(() => {
    handlersRef.current = {
      onConnect, 
      onDisconnect, 
      onError
    };
  }, [onConnect, onDisconnect, onError]);

  const stableOnConnect = useStableEvent(onConnect);
  const stableOnDisconnect = useStableEvent(onDisconnect);
  const stableOnError = useStableEvent(onError);


  useEffect(() => {
    if (!brokerURL || !accessToken) return;

    const client = createStompClient({
      brokerURL, 
      accessToken,
      reconnectDelay, 
      onConnect: stableOnConnect, 
      onDisconnect: stableOnDisconnect,
      onError: stableOnError
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.reconnectDelay = 0;
      client.deactivate();
      clientRef.current = null;
    };
  }, [brokerURL, accessToken]);

  return {
    clientRef
  };
}