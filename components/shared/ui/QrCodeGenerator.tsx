'use client'
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QrCodeGenerator = () => {
  const [dynamicUrl, setDynamicUrl] = useState<string | null>(null);
  useEffect(() => {
    const url = window.location.href;
    setDynamicUrl(url);
  }, []);
  return (
    <div>
      {dynamicUrl && <QRCodeSVG value={dynamicUrl} size={128} />}
    </div>
  );
};

export default QrCodeGenerator;