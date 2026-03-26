import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { SignalRConstant } from 'src/app/constants/apiUrl.constant';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubConnection: signalR.HubConnection | null = null;
    private isConnected = false;

    async startConnection(): Promise<void> {
        const hubUrl = SignalRConstant.OrderHub;
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, { withCredentials: false })
            .build();

        try {
            await this.hubConnection.start();
            this.isConnected = true;
            console.log('SignalR Connected to', hubUrl);
        } catch (err) {
            this.isConnected = false;
            console.error('SignalR Error:', err);
            console.warn('SignalR connection failed, keeping app functional without live updates.');

            // Optionally retry after delay. Not required for correctness and avoids app freeze.
            setTimeout(() => this.startConnection(), 10000);
        }
    }

    onPwaOrderCreated(callback: (data: any) => void) {
        if (this.hubConnection) {
            this.hubConnection.on('PwaOrderCreated', callback);
        } else {
            console.warn('SignalR onPwaOrderCreated skipped: hub connection is not initialized yet.');
        }
    }
}