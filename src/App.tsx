import { useState } from 'react';
import { RunningForm } from '@/components/RunningForm';
import { Receipt } from '@/components/Receipt';
import { Receipt as ReceiptIcon } from 'lucide-react';
import type { ReceiptData } from '@/lib/types';

function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-3">
            <ReceiptIcon className="w-8 h-8" />
            <h1 className="text-4xl font-bold text-center">FitBill</h1>
          </div>
          <p className="text-gray-600">Your receipt for running</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <RunningForm onSubmit={setReceiptData} />
          {receiptData && (
            <div className="lg:mt-0">
              <Receipt data={receiptData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;