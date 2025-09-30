import { delay } from '@/constants/mock-api';
import { ChartArea } from '@/features/overview/components/area-graph';

export default async function AreaStats() {
  await await delay(2000);
  return <ChartArea />;
}
