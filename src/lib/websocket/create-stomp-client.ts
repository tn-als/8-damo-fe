import { Client } from "@stomp/stompjs";

interface CreateStompClientOptions {
  brokerURL: string;
  accessToken: string;
  reconnectDelay: number;
  onConnect?: (client: Client) => void;
  onDisconnect?: () => void;
  onError?: (error: unknown) => void;
}

export function createStompClient({
  brokerURL, 
  accessToken, 
  reconnectDelay, 
  onConnect, 
  onDisconnect, 
  onError,
}: CreateStompClientOptions){

  const client = new Client({
    brokerURL, 
    reconnectDelay, 
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`, 
    }
  });

  client.onConnect = () => {
    onConnect?.(client);
  };

  client.onStompError = (frame) => {
    onError?.(frame);
  };

  client.onWebSocketClose = () => {
    onDisconnect?.();
  };

  return client;
}
