import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import dotenv from 'dotenv';

// Configura dotenv
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, // Sostituisci con l'indirizzo del tuo broker
        },
      },
    ]),
  ],
  providers: [MqttService],
  controllers: [MqttController],
})
export class AppModule {}
