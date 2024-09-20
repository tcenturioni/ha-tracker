import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  // Funzione per pubblicare un messaggio su un topic MQTT
  publish(topic: string, message: any): void {
    this.client.emit(topic, message);
    console.log(`Messaggio pubblicato su topic ${topic}:`, message);
  }
}
