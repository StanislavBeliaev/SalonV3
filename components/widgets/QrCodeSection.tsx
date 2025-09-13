import QrCodeGenerator from '@/components/shared/ui/QrCodeGenerator';

const QrCodeSection = () => {
  return (
    <div className="w-40 h-40 bg-white mb-4 flex items-center justify-center">
      <div>
        <QrCodeGenerator />
      </div>
    </div>
  );
};

export default QrCodeSection;
