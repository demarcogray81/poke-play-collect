import { useState } from "react";
import {
  getCollection,
  getDreamList,
  saveCollection,
  saveDreamList,
} from "../store/localStorage";

export default function Backup() {
  const [status, setStatus] = useState("");
  const [importText, setImportText] = useState("");

  const handleExport = () => {
    try {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        collection: getCollection(),
        dreamList: getDreamList(),
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pokelog-backup.json";
      a.click();
      URL.revokeObjectURL(url);

      setStatus("Backup downloaded as pokelog-backup.json");
    } catch (err) {
      console.error(err);
      setStatus("Couldn't create backup file.");
    }
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        tryImport(text);
      }

      event.target.value = "";
    };
    reader.readAsText(file);
  };
  const handleImportText = (e) => {
    e.preventDefault();
    if (!importText.trim()) {
      setStatus("Paste some JSON first.");
      return;
    }
    tryImport(importText);
  };

  const tryImport = (text) => {
    try {
      const data = JSON.parse(text);

      if (!data || typeof data !== "object") {
        throw new Error("Invalid JSON format");
      }

      if (!Array.isArray(data.collection) || !Array.isArray(data.dreamList)) {
        throw new Error("Missing collection/dreamList arrays");
      }

      saveCollection(data.collection);
      saveDreamList(data.dreamList);

      setStatus(
        "Backup imported! Your Collection and Dream List were replaced."
      );
    } catch (err) {
      console.error(err);
      setStatus(
        "Could not import that backup. Make sure it's a valid PokéLog JSON file."
      );
    }
  };

  return (
    <main className="px-4 py-8 md:px-8 text-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-400">
        Backup
      </h1>
      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Export your Collection and Dream List to a JSON file, or import a backup
        to restore them.{" "}
        <span className="font-semibold">
          Import will overwrite your current data.
        </span>
      </p>

      <section className="grid gap-6 md:grid-cols-2 max-w-4xl">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Export data</h2>
          <p className="text-sm text-gray-400 mb-4">
            Download a JSON backup of all your saved cards.
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            Download backup
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Import from file</h2>
            <p className="text-sm text-gray-400 mb-2">
              Choose a <code>.json</code> backup created by PokéLog.
            </p>
            <input
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="block text-sm text-gray-300"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Import from text</h2>
            <p className="text-sm text-gray-400 mb-2">
              Paste the JSON content of a backup and click Import.
            </p>
            <form onSubmit={handleImportText} className="space-y-2">
              <textarea
                rows={6}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full rounded bg-gray-800 border border-gray-700 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste backup JSON here..."
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-sm font-medium"
              >
                Import backup
              </button>
            </form>
          </div>
        </div>
      </section>

      {status && (
        <p className="mt-6 text-sm text-gray-300 max-w-xl">{status}</p>
      )}
    </main>
  );
}
