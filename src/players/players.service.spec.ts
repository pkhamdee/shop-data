import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';

const testPlayer = {id: 1, name: 'tao', price: 100};

export const mockPlayersEntity = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: PlayersService,
        useValue: mockPlayersEntity, 
      }],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create player", () => {
    it('should return player when success', async () => {
      mockPlayersEntity.create.mockResolvedValue(testPlayer);
      const resultTestCreatePlayer = await service.create(testPlayer);
      expect(resultTestCreatePlayer).toStrictEqual(testPlayer);
    });
  })

});

