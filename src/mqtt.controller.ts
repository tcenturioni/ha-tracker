import { Controller, Get, Param } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { EventPattern } from '@nestjs/microservices';

// @Controller()
// export class MqttController {
//   @EventPattern('nome/utente/dispositivo')
//   handleDeviceMessage(@Payload() data: any) {
//     console.log('Received message:', data);
//     // Aggiungi qui la logica per reagire ai messaggi
//   }
// }

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  // Endpoint per pubblicare un messaggio su un topic
  @Get('publish/:topic/:message')
  publishMessage(
    @Param('topic') topic: string,
    @Param('message') message: string,
  ): string {
    this.mqttService.publish(topic, message);
    return `Messaggio "${message}" pubblicato su topic "${topic}"`;
  }

  // Listener per il topic 'test/topic'
  @EventPattern('test/topic')
  handleMessage(payload: any) {
    console.log('Messaggio ricevuto dal topic "test/topic":', payload);
  }
}
