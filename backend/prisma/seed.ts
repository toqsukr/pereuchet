import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultProducts = [
  { code: 'ST', name: 'СТ' },
  { code: 'STA', name: 'СТА' },
  { code: 'STA_45', name: 'СТА 45' },
  { code: 'ST_ECONOMY', name: 'СТ Эконом' },
  { code: 'ST_LITE', name: 'СТ Лайт' },
  { code: 'ST_45', name: 'СТ 45' },
  { code: 'ST_CALICO', name: 'СТ Бязь' },
  { code: 'BT', name: 'БТ' },
  { code: 'BTA', name: 'БТА' },
  { code: 'BTA_45', name: 'БТА 45' },
  { code: 'BT_LITE', name: 'БТ Лайт' },
  { code: 'BT_ECONOMY', name: 'БТ Эконом' },
  { code: 'BT_45', name: 'БТ 45' },
  { code: 'EVA', name: 'ЭВА' },
  { code: 'EVA_LP', name: 'Эва ЛП' },
  { code: 'EVA_ECONOMY', name: 'ЭВА Эконом' },
  { code: 'EVA_ECONOMY_45', name: 'ЭВА Эконом 45' },
  { code: 'MAHRA_150', name: 'Махра 150' },
  { code: 'MAHRA', name: 'Махра' },
  { code: 'MAHRA_LP', name: 'Махра ЛП' },
  { code: 'MAHRA_A', name: 'Махра А' },
  { code: 'MAHRA_ECONOMY', name: 'Махра Эконом' },
  { code: 'MAHRA_45', name: 'Махра 45' },
  { code: 'MAHRA_ECONOMY_45', name: 'Махра Эконом 45' },
  { code: 'MEDIUM', name: 'Медиум' },
  { code: 'MEDIUM_45', name: 'Медиум 45' },
  { code: 'MEDIUM_LP', name: 'Медиум ЛП' },
  { code: 'MEDIUM_LP_45', name: 'Медиум ЛП 45' },
  { code: 'CLASSIC', name: 'Классик' },
  { code: 'CLASSIC_45', name: 'Классик 45' },
  { code: 'CLASSIC_LP', name: 'Классик ЛП' },
  { code: 'CLASSIC_LP_45', name: 'Классик ЛП 45' },
  { code: 'CLASSIC_PLUS', name: 'Классик Плюс' },
  { code: 'CLASSIC_PLUS_45', name: 'Классик Плюс 45' },
  { code: 'CLASSIC_PLUS_LP', name: 'Классик Плюс ЛП' },
  { code: 'CLASSIC_PLUS_LP_45', name: 'Классик Плюс ЛП 45' },
  { code: 'BUISNESS', name: 'Бизнес' },
  { code: 'BUISNESS_45', name: 'Бизнес 45' },
  { code: 'BUISNESS_LP', name: 'Бизнес ЛП' },
  { code: 'BUISNESS_LP_45', name: 'Бизнес ЛП 45' },
  { code: 'VIETNAM_D3', name: 'Вьетнамки D3' },
  { code: 'VIETNAM_D4', name: 'Вьетнамки D4' },
  { code: 'OPTIMA', name: 'Оптима' },
  { code: 'OPTIMA_45', name: 'Оптима 45' },
  { code: 'OPTIMA_A', name: 'Оптима А' },
  { code: 'OPTIMA_A_45', name: 'Оптима А 45' },
  { code: 'ANTICRYSIS', name: 'Антикризис' },
  { code: 'ANTICRYSIS_45', name: 'Антикризис 45' },
  { code: 'BUISNESS_32', name: 'Бизнес 32' },
  { code: 'BT_28', name: 'БТ 28' },
  { code: 'BT_32', name: 'БТ 32' },
  { code: 'BT_LITE_45', name: 'БТ Лайт 45' },
  { code: 'BT_ECONOMY_45', name: 'БТ Эконом 45' },
  { code: 'CLASSIC_PLUS_28', name: 'Классик Плюс 28' },
  { code: 'CLASSIC_PLUS_32', name: 'Классик Плюс 32' },
  { code: 'MAHRA_28', name: 'Махра 28' },
  { code: 'MAHRA_A_45', name: 'Махра А 45' },
  { code: 'MAHRA_ECONOMY_28', name: 'Махра Эконом 28' },
  { code: 'MEDIUM_32', name: 'Медиум 32' },
  { code: 'ST_28', name: 'СТ 28' },
  { code: 'ST_32', name: 'СТ 32' },
  { code: 'ST_LITE_45', name: 'СТ Лайт 45' },
  { code: 'EVA_28', name: 'ЭВА 28' },
  { code: 'EVA_45', name: 'ЭВА 45' },
  { code: 'EVA_ECONOMY_28', name: 'ЭВА Эконом 28' },
  { code: 'EVA_ECONOMY_32', name: 'ЭВА Эконом 32' },
];

const defaultWorkers = [
  { id: 416, name: 'Зариф' },
  { id: 470, name: 'Бегзод' },
  { id: 145, name: 'Бобур' },
  { id: 469, name: 'Гайрат' },
  { id: 295, name: '' },
  { id: 501, name: '' },
];

const defaultRecords = [
  {
    id: 61,
    createdAt: '2025-07-11T14:30:44.484Z',
    workerID: 145,
    productCode: 'ST_45',
    amount: 31,
    isDeleted: false,
    createdBy: 'wastard',
  },
  {
    id: 52,
    createdAt: '2025-07-10T17:56:22.871Z',
    workerID: 416,
    productCode: 'EVA_45',
    amount: 2,
    isDeleted: false,
    createdBy: 'wastard',
  },
  {
    id: 59,
    createdAt: '2025-07-10T21:20:56.575Z',
    workerID: 295,
    productCode: 'OPTIMA_45',
    amount: 1,
    isDeleted: false,
    createdBy: 'wastard',
  },
  {
    id: 60,
    createdAt: '2025-07-10T21:22:31.862Z',
    workerID: 295,
    productCode: 'OPTIMA',
    amount: 4,
    isDeleted: false,
    createdBy: 'wastard',
  },
  // {
  //   id: 62,
  //   date: '2025-07-11T14:30:47.016Z',
  //   workerID: 145,
  //   productCode: 'BTA_45',
  //   amount: 21,
  // },
  // {
  //   id: 63,
  //   date: '2025-07-11T14:31:10.022Z',
  //   workerID: 145,
  //   productCode: 'ST_ECONOMY',
  //   amount: 34,
  // },
  // {
  //   id: 64,
  //   date: '2025-07-11T14:31:13.310Z',
  //   workerID: 145,
  //   productCode: 'BT',
  //   amount: 1,
  // },
  // {
  //   id: 65,
  //   date: '2025-07-11T14:31:20.481Z',
  //   workerID: 145,
  //   productCode: 'MAHRA',
  //   amount: 6,
  // },
  // {
  //   id: 66,
  //   date: '2025-07-11T16:06:32.601Z',
  //   workerID: 501,
  //   productCode: 'MAHRA_ECONOMY_45',
  //   amount: 1,
  // },
  // {
  //   id: 67,
  //   date: '2025-07-11T16:07:11.037Z',
  //   workerID: 501,
  //   productCode: 'BUISNESS_LP_45',
  //   amount: 4,
  // },
  // {
  //   id: 68,
  //   date: '2025-07-11T16:07:18.770Z',
  //   workerID: 501,
  //   productCode: 'VIETNAM_D3',
  //   amount: 6,
  // },
  // {
  //   id: 69,
  //   date: '2025-07-11T16:09:39.372Z',
  //   workerID: 501,
  //   productCode: 'ST_CALICO',
  //   amount: 6,
  // },
  // {
  //   id: 70,
  //   date: '2025-07-11T16:10:07.131Z',
  //   workerID: 416,
  //   productCode: 'CLASSIC_PLUS_LP',
  //   amount: 26,
  // },
  // {
  //   id: 71,
  //   date: '2025-07-11T16:11:50.464Z',
  //   workerID: 469,
  //   productCode: 'VIETNAM_D3',
  //   amount: 3,
  // },
  // {
  //   id: 72,
  //   date: '2025-07-11T21:32:36.074Z',
  //   workerID: 416,
  //   productCode: 'OPTIMA',
  //   amount: 11,
  // },
];

async function main() {
  await prisma.product.createMany({
    data: defaultProducts,
    skipDuplicates: true,
  });

  await prisma.worker.createMany({
    data: defaultWorkers,
    skipDuplicates: true,
  });

  await prisma.record.createMany({
    data: defaultRecords,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
