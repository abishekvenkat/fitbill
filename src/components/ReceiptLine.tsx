import { generateDottedLine } from '@/lib/utils';

interface ReceiptLineProps {
  label: string;
  value: string;
}

export function ReceiptLine({ label, value }: ReceiptLineProps) {
  return (
    <div className="mb-1">
      <div className="flex items-start justify-between gap-2">
        <span className="text-left min-w-[120px] shrink-0 font-semibold">{label}</span>
        <span className="mx-2 overflow-hidden flex-shrink whitespace-pre font-bold dotted-line">{generateDottedLine(20)}</span>
        <span className="text-right break-words max-w-[140px]">{value}</span>
      </div>
    </div>
  );
}