import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Products
  await prisma.product.createMany({
    data: [
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
    ],
    skipDuplicates: true,
  });

  // Workers
  await prisma.worker.createMany({
    data: [
      { id: 416, name: 'Зариф' },
      { id: 470, name: 'Бегзод' },
      { id: 145, name: 'Бобур' },
      { id: 469, name: 'Гайрат' },
      { id: 295, name: '' },
      { id: 501, name: '' },
    ],
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
