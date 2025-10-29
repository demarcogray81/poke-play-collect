import { useEffect, useState } from "react";

export default function Footer() {
  const [backupSize, setBackupSize] = useState(0);

  useEffect(() => {
    const size = new Blob(Object.values(localStorage)).size;
    setBackupSize(size);
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-400 text-sm p-3 text-center border-t border-gray-700">
      📦 LocalStorage usage: {backupSize} bytes
    </footer>
  );
}
