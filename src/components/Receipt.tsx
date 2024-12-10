import { useRef } from 'react';
import domToImage from 'dom-to-image';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Receipt as ReceiptIcon, Printer } from 'lucide-react';
import type { ReceiptData } from '@/lib/types';
import { ReceiptLine } from './ReceiptLine';

interface ReceiptProps {
  data: ReceiptData;
}

export function Receipt({ data }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadReceipt = async () => {
    if (receiptRef.current) {
      try {
        const dataUrl = await domToImage.toPng(receiptRef.current, {
          width: 380,
          height: receiptRef.current.offsetHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
            width: '380px',
          },
        });

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `fitbill-receipt-${format(new Date(), 'yyyy-MM-dd')}.png`;
        link.click();
      } catch (error) {
        console.error('Error generating receipt:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div 
        ref={receiptRef} 
        className="w-[380px] p-8 receipt-paper dot-matrix text-black bg-white"
        style={{ minHeight: data.location?.length || data.name?.length > 20 ? '450px' : '400px' }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <ReceiptIcon className="w-6 h-6 mb-1" />
            <span>FitBill</span>
          </div>
          <div className="text-sm mt-2">
            {format(new Date(), 'EEEE, MMMM do yyyy')}
          </div>
          <div className="text-sm">
            {format(new Date(), 'h:mm a')}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-y border-dashed py-4 space-y-2">
            <ReceiptLine 
              label="Runner"
              value={data.name}
            />
            <ReceiptLine 
              label={`Distance (${data.distanceUnit})`}
              value={data.distance}
            />
            <ReceiptLine 
              label="Calories (kcal)"
              value={data.calories}
            />
            {data.location && (
              <ReceiptLine 
                label="Location"
                value={data.location}
              />
            )}
            {data.pace && (
              <ReceiptLine 
                label={`Pace (${data.paceUnit})`}
                value={data.pace}
              />
            )}
          </div>

          <div className="text-center">
            <div className="text-sm">* * * * * * * * * * * *</div>
            <p className="text-sm font-bold mt-2">Keep moving forward</p>
          </div>
        </div>
      </div>

      <Button 
        onClick={downloadReceipt}
        className="w-full gap-2"
      >
        <Printer className="w-4 h-4" />
        Print Receipt
      </Button>
    </div>
  );
}