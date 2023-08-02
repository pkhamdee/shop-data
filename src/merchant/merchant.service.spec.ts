import { Test, TestingModule } from '@nestjs/testing';
import { MerchantService } from './merchant.service';

const testMerchant = {id: 1,product: 'product', image: 'image', price: 100, hint: 'hint', status: false};
export const mockMerchantEntity = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('MerchantService', () => {
  let service: MerchantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: MerchantService,
        useValue: mockMerchantEntity
      }],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create merchant", () => {
    it('should return merchant when success', async () => {
      mockMerchantEntity.create.mockResolvedValue(testMerchant);
      const resultTestCreateMerchant = await service.create(testMerchant);
      expect(resultTestCreateMerchant).toStrictEqual(testMerchant);
    });
  })


});
