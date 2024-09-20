import { Test, TestingModule } from '@nestjs/testing';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';

describe('MqttController', () => {
  let mqttController: MqttController;
  let mqttService: MqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttController],
      providers: [
        {
          provide: MqttService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    mqttController = module.get<MqttController>(MqttController);
    mqttService = module.get<MqttService>(MqttService);
  });

  it('should be defined', () => {
    expect(mqttController).toBeDefined();
  });

  describe('publishMessage', () => {
    it('should publish a message to a topic', () => {
      const topic = 'test/topic';
      const message = 'HelloWorld';

      mqttController.publishMessage(topic, message);

      expect(mqttService.publish).toHaveBeenCalledWith(topic, message);
    });

    it('should return the correct response', () => {
      const topic = 'test/topic';
      const message = 'HelloWorld';

      const response = mqttController.publishMessage(topic, message);

      expect(response).toBe(`Messaggio "${message}" pubblicato su topic "${topic}"`);
    });
  });

  describe('handleMessage', () => {
    it('should log the received message from the topic', () => {
      const payload = { data: 'test data' };
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      mqttController.handleMessage(payload);

      expect(logSpy).toHaveBeenCalledWith('Messaggio ricevuto dal topic "test/topic":', payload);

      logSpy.mockRestore();
    });
  });
});
